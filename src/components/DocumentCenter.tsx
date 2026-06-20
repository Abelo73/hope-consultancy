import { useState } from "react";
import { ClipboardList, Scale, Flag, Grid3x3, ArrowRight, FileText, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { documents, type DocumentDef } from "../data/documents";
import { useLang } from "../context/LangContext";
import DocumentModal from "./DocumentModal";

const iconMap = {
  clipboard: ClipboardList,
  scale: Scale,
  flag: Flag,
  grid: Grid3x3,
};

/* ═══════════════════════════════════════════════════════════════════
   DOCUMENT CARD
═══════════════════════════════════════════════════════════════════ */
function DocumentFeatureCard({ doc, index, onClick }: { doc: DocumentDef, index: number, onClick: () => void }) {
  const { lang, t } = useLang();
  const Icon = iconMap[doc.icon];
  const title = lang === "am" ? doc.titleAm : doc.titleEn;
  const desc = lang === "am" ? doc.descAm : doc.descEn;

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <div
        onClick={onClick}
        className="relative z-10 cursor-pointer overflow-hidden p-8 sm:p-10 rounded-[32px] bg-paper-50/80 dark:bg-paper-50/[0.02] border border-ink-900/10 dark:border-paper-50/8 backdrop-blur-xl transition-all duration-500 hover:border-seal-400/50 dark:hover:border-seal-400/40 shadow-sm hover:shadow-xl group-hover:-translate-y-1"
      >
        {/* Layered background visual */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-64 h-64 bg-seal-400/5 dark:bg-seal-400/10 rounded-full blur-[80px] group-hover:scale-125 transition-transform duration-700" />

        <div className="relative z-20 flex flex-col sm:flex-row sm:items-start gap-8">
          {/* Left: Icon & Badge */}
          <div className="shrink-0">
            <div className="relative">
              <div className="flex items-center justify-center w-16 h-16 rounded-[22px] bg-ink-800 dark:bg-seal-400/15 text-paper-50 dark:text-seal-300 group-hover:bg-seal-400 group-hover:text-paper-50 transition-all duration-500 shadow-lg group-hover:shadow-seal-lg">
                <Icon size={28} strokeWidth={1.5} />
              </div>
              {/* Type Badge */}
              <div className="absolute -bottom-2 -right-2 px-2.5 py-1 rounded-lg bg-paper-50 dark:bg-ink-900 border border-ink-900/5 dark:border-paper-50/10 text-[9px] font-black uppercase tracking-tighter text-seal-600 dark:text-seal-300 shadow-md">
                {doc.fileType}
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-seal-400/40" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-400 dark:text-paper-400/50">
                Document {index + 1}
              </span>
            </div>

            <h3 className="font-serif-am text-2xl sm:text-3xl text-ink-900 dark:text-paper-50 mb-4 leading-tight group-hover:text-gradient-gold transition-all duration-300">
              {title}
            </h3>

            <p className="text-base text-ink-500 dark:text-paper-200/50 leading-relaxed max-w-lg mb-8">
              {desc}
            </p>

            <div className="flex items-center gap-6">
              <span className="inline-flex items-center gap-2 text-sm font-bold text-seal-600 dark:text-seal-300 group-hover:text-seal-500 dark:group-hover:text-seal-200 transition-colors">
                {t.documents.previewBtn}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>

              <div className="flex items-center gap-1.5 text-xs text-ink-400 dark:text-paper-400/40 font-medium">
                <FileText size={14} />
                Fillable Document
              </div>
            </div>
          </div>
        </div>

        {/* Interactive hover line */}
        <div className="absolute left-0 bottom-0 h-1.5 w-full bg-gradient-to-r from-seal-400 to-teal-500 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 delay-100" />
      </div>

      {/* Decorative shadow layer */}
      <div className="absolute inset-4 rounded-[32px] bg-ink-900/5 dark:bg-black/20 blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}

export default function DocumentCenter() {
  const { t } = useLang();
  const [active, setActive] = useState<DocumentDef | null>(null);

  return (
    <section id="documents" className="relative py-24 sm:py-36 bg-paper-50 dark:bg-abyss-900 overflow-hidden">
      {/* Background Cinematic Elements */}
      <div className="orb orb-gold w-[700px] h-[700px] -right-40 top-40 opacity-[0.05] dark:opacity-[0.08] blur-[140px]" />
      <div className="orb orb-teal w-[600px] h-[600px] -left-20 bottom-10 opacity-[0.04] dark:opacity-[0.06] blur-[120px]" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] dark:opacity-[0.05] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header section with specialized reveal */}
        <div className="max-w-3xl mb-24 relative">
          <div className="absolute -left-12 top-0 h-full w-1 bg-gradient-to-b from-seal-400 to-transparent opacity-30" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-eyebrow mb-6 inline-block">{t.documents.eyebrow}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif-am text-4xl sm:text-5xl lg:text-6xl text-ink-900 dark:text-paper-50 tracking-[-0.03em] mb-8 leading-[1.1]"
          >
            {t.documents.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-ink-500 dark:text-paper-200/60 leading-relaxed"
          >
            {t.documents.subtitle}
          </motion.p>
        </div>

        {/* One-by-one list for maximum focus and premium feel */}
        <div className="flex flex-col gap-8 sm:gap-10">
          {documents.map((doc, i) => (
            <DocumentFeatureCard
              key={doc.id}
              doc={doc}
              index={i}
              onClick={() => setActive(doc)}
            />
          ))}
        </div>

        {/* Final CTA Strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-8 rounded-[32px] bg-gradient-to-r from-ink-900 to-ink-800 dark:from-paper-50/10 dark:to-paper-50/[0.05] border border-paper-50/10 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-8 sm:p-12 overflow-hidden group"
        >
          <div className="relative z-10 text-center md:text-left">
            <h4 className="text-2xl sm:text-3xl font-serif-am text-paper-50 mb-3">
              Don't see the form you need?
            </h4>
            <p className="text-paper-50/60 max-w-md">
              We update our document center weekly. Contact us for custom format requests or specific regional compliance forms.
            </p>
          </div>
          <button className="relative z-10 px-8 py-4 rounded-full bg-seal-400 text-ink-950 font-bold hover:bg-seal-300 transition-colors shadow-seal hover:shadow-seal-lg flex items-center gap-2 group-hover:scale-105 duration-300">
            Request Document <Download size={18} />
          </button>

          {/* Animated decorative orb for CTA */}
          <div className="absolute right-0 bottom-0 translate-y-1/2 translate-x-1/4 w-64 h-64 bg-seal-400/20 rounded-full blur-[80px]" />
        </motion.div>
      </div>

      <AnimatePresence>
        {active && <DocumentModal doc={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
