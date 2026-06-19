import { useEffect, useState, useRef } from "react";
import { Menu, X, Sun, Moon, Languages, Stamp } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useLang } from "../context/LangContext";

const sectionIds = ["home", "services", "documents", "process", "about", "contact"] as const;

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const navItems: { id: typeof sectionIds[number]; label: string }[] = [
    { id: "home", label: t.nav.home },
    { id: "services", label: t.nav.services },
    { id: "documents", label: t.nav.documents },
    { id: "process", label: t.nav.process },
    { id: "about", label: t.nav.about },
    { id: "contact", label: t.nav.contact },
  ];

  const handleNav = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      ref={navRef as React.RefObject<HTMLElement>}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-light dark:glass-dark shadow-card dark:shadow-card-dark"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[68px] flex items-center justify-between gap-4">
        {/* Logo */}
        <button
          onClick={() => handleNav("home")}
          className="flex items-center gap-3 group shrink-0"
          aria-label="Hope Consultancy and Training Service"
        >
          <span className="relative flex items-center justify-center w-10 h-10 rounded-full bg-ink-800 dark:bg-seal-400 text-paper-50 dark:text-ink-950 shadow-seal transition-all duration-300 group-hover:shadow-seal-lg group-hover:scale-105">
            <Stamp size={18} strokeWidth={1.75} />
          </span>
          <span className="font-serif-am font-semibold text-ink-900 dark:text-paper-100 leading-tight text-left hidden sm:block">
            <span className="block text-base">{t.brand}</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                active === item.id
                  ? "text-seal-500 dark:text-seal-300 bg-seal-400/10 dark:bg-seal-400/15"
                  : "text-ink-600 dark:text-paper-300 hover:text-ink-900 dark:hover:text-paper-50 hover:bg-ink-900/5 dark:hover:bg-paper-50/8"
              }`}
            >
              {item.label}
              {active === item.id && (
                <span
                  ref={indicatorRef}
                  className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-seal-400 animate-scaleIn"
                />
              )}
            </button>
          ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium border border-ink-900/12 dark:border-paper-50/14 text-ink-700 dark:text-paper-200 hover:bg-seal-400/10 hover:border-seal-400/40 hover:text-seal-600 dark:hover:text-seal-300 transition-all duration-200"
            aria-label="Toggle language"
          >
            <Languages size={15} strokeWidth={2} />
            <span className="hidden sm:inline text-xs font-semibold tracking-wide">{lang === "am" ? "EN" : "አማ"}</span>
          </button>

          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-ink-900/12 dark:border-paper-50/14 text-ink-700 dark:text-paper-200 hover:bg-seal-400/10 hover:border-seal-400/40 hover:text-seal-600 dark:hover:text-seal-300 transition-all duration-200"
            aria-label="Toggle theme"
          >
            {theme === "dark"
              ? <Sun size={16} strokeWidth={2} />
              : <Moon size={16} strokeWidth={2} />
            }
          </button>

          <button
            onClick={() => setOpen((o) => !o)}
            className="flex lg:hidden items-center justify-center w-9 h-9 rounded-full border border-ink-900/12 dark:border-paper-50/14 text-ink-700 dark:text-paper-200 hover:bg-seal-400/10 transition-all duration-200"
            aria-label="Toggle menu"
          >
            <span className={`transition-all duration-300 ${open ? "rotate-90 opacity-100" : "rotate-0 opacity-100"}`}>
              {open ? <X size={18} /> : <Menu size={18} />}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-400 ease-spring ${
          open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="glass-light dark:glass-dark border-t border-ink-900/6 dark:border-paper-50/6 px-5 py-4 flex flex-col gap-1">
          {navItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
              className={`text-left px-4 py-3.5 rounded-2xl text-base font-medium transition-all duration-200 ${
                active === item.id
                  ? "bg-seal-400/12 text-seal-600 dark:text-seal-300 font-semibold"
                  : "text-ink-700 dark:text-paper-100 hover:bg-ink-900/5 dark:hover:bg-paper-50/6"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
