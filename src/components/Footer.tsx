import { Stamp, Globe, Video, Send, Share2, ArrowUpRight } from "lucide-react";
import { useLang } from "../context/LangContext";
import { socials } from "../data/content";

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  const navItems = [
    { id: "home",      label: t.nav.home },
    { id: "services",  label: t.nav.services },
    { id: "documents", label: t.nav.documents },
    { id: "process",   label: t.nav.process },
    { id: "about",     label: t.nav.about },
    { id: "contact",   label: t.nav.contact },
  ];

  const channels = [
    { icon: Globe,  href: socials.website,  label: "Website" },
    { icon: Video,  href: socials.youtube,  label: "YouTube" },
    { icon: Send,   href: socials.telegram, label: "Telegram" },
    { icon: Share2, href: socials.facebook, label: "Facebook" },
  ];

  return (
    <footer className="relative bg-ink-950 dark:bg-abyss-950 text-paper-200 overflow-hidden">
      {/* Orbs */}
      <div className="orb orb-teal w-[500px] h-[500px] -left-32 -bottom-24 opacity-15" />
      <div className="orb orb-gold w-[400px] h-[400px] -right-20 -top-10 opacity-10" />

      {/* Top gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-seal-400/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 mb-14">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-seal-400 text-ink-950 shadow-seal">
                <Stamp size={17} strokeWidth={1.75} />
              </span>
              <span className="font-serif-am font-semibold text-paper-50 text-base leading-tight">
                {t.brand}
              </span>
            </div>
            <p className="text-sm text-paper-300/65 max-w-[220px] leading-relaxed mb-6">
              {t.footer.tagline}
            </p>
            {/* Social icons */}
            <div className="flex gap-2">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={c.label}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-paper-50/5 hover:bg-seal-400 hover:text-ink-950 border border-paper-50/8 hover:border-seal-400 text-paper-300 transition-all duration-200 hover:scale-105"
                >
                  <c.icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-paper-400/80 mb-5">
              {t.footer.quickLinks}
            </div>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() =>
                      document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="group flex items-center gap-1.5 text-sm text-paper-300/70 hover:text-seal-300 transition-colors duration-200"
                  >
                    <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200 h-px bg-seal-400" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-paper-400/80 mb-5">
              {t.footer.follow}
            </div>
            <div className="space-y-3">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 text-sm text-paper-300/70 hover:text-seal-300 transition-colors duration-200"
                >
                  <c.icon size={14} className="shrink-0" />
                  {c.label}
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                </a>
              ))}
            </div>
          </div>

          {/* Trust badge */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-paper-400/80 mb-5">
              Certified & Licensed
            </div>
            <div className="p-4 rounded-2xl border border-seal-400/20 bg-seal-400/8 space-y-2">
              <div className="text-xs font-bold text-seal-300 uppercase tracking-wide">
                ✦ Official License
              </div>
              <div className="text-xs text-paper-300/60 leading-relaxed">
                Ministry of Labour &amp; Social Affairs Accredited Training Provider in Ethiopia.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-paper-50/8 flex flex-col sm:flex-row gap-3 justify-between items-center text-xs text-paper-400/60">
          <span>© {year} {t.brand} — {t.footer.rights}</span>
          <span className="text-paper-400/50">{t.footer.preparedBy}: Hope Consultancy and Training Service</span>
        </div>
      </div>
    </footer>
  );
}
