import { useState } from "react";
import { Globe, Video, Send, Share2, Phone, Mail, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { useLang } from "../context/LangContext";
import { socials, contactInfo } from "../data/content";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function Contact() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", org: "", message: "" });
  const sectionRef = useScrollReveal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", org: "", message: "" });
  };

  const channels = [
    { icon: Globe, label: t.contact.website, href: socials.website },
    { icon: Video, label: t.contact.youtube, href: socials.youtube },
    { icon: Send, label: t.contact.telegram, href: socials.telegram },
    { icon: Share2, label: t.contact.facebook, href: socials.facebook },
  ];

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="contact"
      className="relative py-24 sm:py-32 bg-paper-100 dark:bg-ink-950 overflow-hidden"
    >
      {/* Orbs */}
      <div className="orb orb-teal w-[400px] h-[400px] -left-20 bottom-0 opacity-15 dark:opacity-25" />
      <div className="orb orb-gold w-[350px] h-[350px] -right-16 top-10 opacity-12 dark:opacity-20" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl mb-16 reveal">
          <span className="section-eyebrow mb-4">{t.contact.eyebrow}</span>
          <h2 className="font-serif-am text-3xl sm:text-4xl text-ink-900 dark:text-paper-50 tracking-[-0.02em] mb-5">
            {t.contact.title}
          </h2>
          <p className="text-lg text-ink-500 dark:text-paper-200/75 leading-relaxed">{t.contact.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6">
          {/* Contact info card */}
          <div className="reveal-left relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-ink-800/95 dark:bg-ink-900" />
            <div className="absolute inset-0 pointer-events-none">
              <div className="orb orb-teal w-64 h-64 -left-8 -bottom-8 opacity-25" />
              <div className="orb orb-gold w-48 h-48 right-0 top-0 opacity-20" />
            </div>

            <div className="relative p-8 sm:p-10 text-paper-50 h-full flex flex-col">
              {/* License badge */}
              <div className="inline-flex items-center gap-2 text-seal-300 mb-8 self-start">
                <ShieldCheck size={18} strokeWidth={1.75} />
                <span className="text-xs font-bold uppercase tracking-widest">{t.contact.licenseValue}</span>
              </div>

              {/* Contact rows */}
              <div className="space-y-6 mb-8 flex-1">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-seal-400/15 shrink-0">
                    <Phone size={16} className="text-seal-300" strokeWidth={1.75} />
                  </div>
                  <div>
                    <div className="text-xs text-paper-300/60 mb-1.5 uppercase tracking-wide font-semibold">{t.contact.mobile}</div>
                    <a href={`tel:${contactInfo.mobile1}`} className="block text-paper-100 hover:text-seal-300 transition-colors font-medium">
                      {contactInfo.mobile1}
                    </a>
                    <a href={`tel:${contactInfo.mobile2}`} className="block text-paper-100 hover:text-seal-300 transition-colors font-medium">
                      {contactInfo.mobile2}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-seal-400/15 shrink-0">
                    <Mail size={16} className="text-seal-300" strokeWidth={1.75} />
                  </div>
                  <div>
                    <div className="text-xs text-paper-300/60 mb-1.5 uppercase tracking-wide font-semibold">{t.contact.email}</div>
                    <a href={`mailto:${contactInfo.email}`} className="text-paper-100 hover:text-seal-300 transition-colors font-medium break-all">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-paper-50/8 mb-6" />

              {/* Social links */}
              <div className="grid grid-cols-2 gap-2">
                {channels.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2.5 px-3.5 py-3 rounded-xl bg-paper-50/5 hover:bg-seal-400/20 dark:hover:bg-seal-400/25 border border-paper-50/8 hover:border-seal-400/40 transition-all duration-200 text-sm"
                  >
                    <c.icon size={15} className="text-seal-300 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="truncate text-paper-200 group-hover:text-paper-50 transition-colors">{c.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Message form */}
          <div className="reveal-right delay-100 p-8 sm:p-10 rounded-3xl bg-paper-50/90 dark:bg-ink-800/60 border border-ink-900/8 dark:border-paper-50/8 backdrop-blur-sm">
            <h3 className="font-serif-am text-2xl text-ink-900 dark:text-paper-50 mb-7">{t.contact.formTitle}</h3>

            {sent && (
              <div className="flex items-center gap-3 text-sm font-semibold text-green-700 dark:text-green-400 bg-green-500/10 dark:bg-green-500/15 rounded-2xl px-4 py-3.5 mb-6 border border-green-500/20">
                <CheckCircle2 size={18} strokeWidth={2} />
                {t.contact.sentMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-ink-700 dark:text-paper-200 mb-2">{t.contact.name}</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder={t.contact.namePh}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink-700 dark:text-paper-200 mb-2">{t.contact.org}</label>
                <input
                  value={form.org}
                  onChange={(e) => setForm((f) => ({ ...f, org: e.target.value }))}
                  placeholder={t.contact.orgPh}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-ink-700 dark:text-paper-200 mb-2">{t.contact.message}</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder={t.contact.msgPh}
                  className="input-field resize-none"
                />
              </div>
              <button
                type="submit"
                className="btn-shimmer w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-ink-800 dark:bg-seal-400 text-paper-50 dark:text-ink-950 font-semibold shadow-seal hover:shadow-seal-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                {t.contact.send}
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
