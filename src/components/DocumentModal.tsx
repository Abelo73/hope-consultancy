import { useState } from "react";
import { X, Download, FileText, Table2, Eye, PencilLine, CheckCircle2 } from "lucide-react";
import { jsPDF } from "jspdf";
import type { DocumentDef } from "../data/documents";
import { useLang } from "../context/LangContext";
import { notoSansEthiopicRegular } from "../assets/fonts/notoSansEthiopic";

function ensureEthiopicFont(pdf: jsPDF) {
  pdf.addFileToVFS("NotoSansEthiopic-Regular.ttf", notoSansEthiopicRegular);
  pdf.addFont("NotoSansEthiopic-Regular.ttf", "NotoEthiopic", "normal");
}

interface Props {
  doc: DocumentDef;
  onClose: () => void;
}

type Mode = "preview" | "fill";

export default function DocumentModal({ doc, onClose }: Props) {
  const { lang, t } = useLang();
  const [mode, setMode] = useState<Mode>("preview");
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const title = lang === "am" ? doc.titleAm : doc.titleEn;
  const desc = lang === "am" ? doc.descAm : doc.descEn;

  const handleChange = (id: string, val: string) => {
    setValues((v) => ({ ...v, [id]: val }));
  };

  const generatePdf = () => {
    const pdf = new jsPDF({ unit: "pt", format: "a4" });
    const marginX = 56;
    let y = 64;

    if (lang === "am") {
      ensureEthiopicFont(pdf);
      pdf.setFont("NotoEthiopic", "normal");
    } else {
      pdf.setFont("helvetica", "bold");
    }
    pdf.setFontSize(15);
    pdf.text(lang === "en" ? doc.titleEn : doc.titleAm, marginX, y, { maxWidth: 480 });
    y += 28;

    pdf.setDrawColor(201, 138, 61);
    pdf.setLineWidth(1.2);
    pdf.line(marginX, y, 540, y);
    y += 30;

    pdf.setFontSize(11);
    doc.fields?.forEach((field) => {
      const label = lang === "en" ? field.labelEn : field.labelAm;
      const value = values[field.id] || "—";

      if (lang === "am") {
        pdf.setFont("NotoEthiopic", "normal");
      } else {
        pdf.setFont("helvetica", "bold");
      }
      const labelLines = pdf.splitTextToSize(`${label}:`, 480);
      pdf.text(labelLines, marginX, y);
      y += labelLines.length * 14 + 2;

      if (lang !== "am") pdf.setFont("helvetica", "normal");
      const valueLines = pdf.splitTextToSize(value, 480);
      pdf.text(valueLines, marginX, y);
      y += valueLines.length * 14 + 14;

      if (y > 740) {
        pdf.addPage();
        y = 64;
      }
    });

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(150);
    pdf.text("Hope Consultancy and Training Service", marginX, 800);

    pdf.save(`${doc.id}.pdf`);
    setSubmitted(true);
  };

  const downloadOriginal = () => {
    const link = document.createElement("a");
    link.href = `/documents/${doc.fileName}`;
    link.download = doc.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-abyss-900/70 dark:bg-abyss-900/80 backdrop-blur-md p-0 sm:p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[85vh] bg-paper-50 dark:bg-ink-900 border border-ink-900/10 dark:border-paper-50/10 rounded-t-3xl sm:rounded-3xl shadow-card-dark flex flex-col overflow-hidden animate-fadeUp"
      >
        {/* header */}
        <div className="flex items-start justify-between gap-4 px-6 sm:px-8 pt-7 pb-5 border-b border-ink-900/8 dark:border-paper-50/8">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-seal-400/15 text-seal-500 dark:text-seal-300 shrink-0">
                {doc.fileType === "XLSX" ? <Table2 size={15} /> : <FileText size={15} />}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wide text-ink-400 dark:text-paper-400">
                {doc.fileType}
              </span>
            </div>
            <h3 className="font-serif-am text-xl text-ink-900 dark:text-paper-50 leading-snug">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full hover:bg-ink-900/5 dark:hover:bg-paper-50/8 text-ink-500 dark:text-paper-300 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* mode tabs */}
        {doc.fillable && (
          <div className="flex gap-1 px-6 sm:px-8 pt-4">
            <button
              onClick={() => setMode("preview")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                mode === "preview"
                  ? "bg-ink-800 dark:bg-seal-400 text-paper-50 dark:text-ink-950"
                  : "text-ink-600 dark:text-paper-300 hover:bg-ink-900/5 dark:hover:bg-paper-50/8"
              }`}
            >
              <Eye size={14} /> {t.documents.previewBtn}
            </button>
            <button
              onClick={() => setMode("fill")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                mode === "fill"
                  ? "bg-ink-800 dark:bg-seal-400 text-paper-50 dark:text-ink-950"
                  : "text-ink-600 dark:text-paper-300 hover:bg-ink-900/5 dark:hover:bg-paper-50/8"
              }`}
            >
              <PencilLine size={14} /> {t.documents.fillBtn}
            </button>
          </div>
        )}

        {/* body */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6">
          {mode === "preview" && (
            <div>
              <p className="text-sm text-ink-600 dark:text-paper-300/75 mb-6 leading-relaxed">{desc}</p>

              {doc.fields && (
                <div className="rounded-2xl border border-ink-900/8 dark:border-paper-50/10 divide-y divide-ink-900/8 dark:divide-paper-50/8 overflow-hidden">
                  {doc.fields.map((f) => (
                    <div key={f.id} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 px-4 py-3 bg-ink-50/40 dark:bg-paper-50/[0.02]">
                      <span className="text-sm font-medium text-ink-700 dark:text-paper-200 sm:w-1/2">
                        {lang === "en" ? f.labelEn : f.labelAm}
                      </span>
                      <span className="text-sm text-ink-400 dark:text-paper-400 sm:w-1/2 italic">
                        {lang === "en" ? "blank field" : "ክፍት ቦታ"}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {doc.previewRowsAm && (
                <div className="overflow-x-auto rounded-2xl border border-ink-900/8 dark:border-paper-50/10">
                  <table className="w-full text-sm">
                    <tbody>
                      {doc.previewRowsAm.map((row, ri) => (
                        <tr key={ri} className={ri === 0 ? "bg-ink-800 dark:bg-seal-400/90 text-paper-50 dark:text-ink-950" : "border-t border-ink-900/8 dark:border-paper-50/8"}>
                          {row.map((cell, ci) => (
                            <td key={ci} className={`px-3 py-2.5 whitespace-nowrap ${ri === 0 ? "font-semibold" : "text-ink-700 dark:text-paper-200"}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {!doc.fillable && (
                <p className="mt-5 text-sm text-seal-600 dark:text-seal-300 bg-seal-400/10 rounded-xl px-4 py-3">
                  {t.documents.noFillMsg}
                </p>
              )}
            </div>
          )}

          {mode === "fill" && doc.fields && (
            <div className="space-y-4">
              {submitted && (
                <div className="flex items-center gap-2 text-sm font-medium text-ink-700 dark:text-paper-100 bg-seal-400/15 rounded-xl px-4 py-3 mb-2">
                  <CheckCircle2 size={16} className="text-seal-500 dark:text-seal-300" />
                  {lang === "en" ? "Your PDF has been generated." : "PDF ፋይልዎ ተዘጋጅቷል።"}
                </div>
              )}
              {doc.fields.map((f) => (
                <div key={f.id}>
                  <label className="block text-sm font-medium text-ink-700 dark:text-paper-200 mb-1.5">
                    {lang === "en" ? f.labelEn : f.labelAm}
                  </label>
                  {f.type === "textarea" ? (
                    <textarea
                      rows={f.rows || 3}
                      value={values[f.id] || ""}
                      onChange={(e) => handleChange(f.id, e.target.value)}
                      className="input-field resize-none"
                    />
                  ) : f.type === "select" ? (
                    <select
                      value={values[f.id] || ""}
                      onChange={(e) => handleChange(f.id, e.target.value)}
                      className="input-field"
                    >
                      <option value="">{lang === "en" ? "Select..." : "ይምረጡ..."}</option>
                      {f.options?.map((opt) => (
                        <option key={opt.am} value={lang === "en" ? opt.en : opt.am}>
                          {lang === "en" ? opt.en : opt.am}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={f.type === "date" ? "date" : "text"}
                      value={values[f.id] || ""}
                      onChange={(e) => handleChange(f.id, e.target.value)}
                      className="input-field"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* footer */}
        <div className="flex flex-wrap gap-3 px-6 sm:px-8 py-5 border-t border-ink-900/8 dark:border-paper-50/8 bg-ink-50/30 dark:bg-paper-50/[0.02]">
          {mode === "fill" && doc.fields ? (
            <button
              onClick={generatePdf}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-seal-400 text-ink-950 font-semibold hover:bg-seal-300 transition-colors"
            >
              <Download size={16} /> {t.documents.downloadPdf}
            </button>
          ) : null}
          <button
            onClick={downloadOriginal}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-ink-900/15 dark:border-paper-50/20 text-ink-800 dark:text-paper-100 font-semibold hover:bg-ink-900/5 dark:hover:bg-paper-50/8 transition-colors"
          >
            <Download size={16} /> {t.documents.downloadBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
