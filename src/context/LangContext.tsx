import { createContext, useContext, useState, type ReactNode } from "react";
import { content, type Lang } from "../data/content";

interface LangContextValue {
  lang: Lang;
  toggleLang: () => void;
  t: typeof content.am;
}

const LangContext = createContext<LangContextValue | undefined>(undefined);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const stored = typeof window !== "undefined" ? window.localStorage?.getItem("hope-lang") : null;
    if (stored === "am" || stored === "en") return stored;
    return "am";
  });

  const toggleLang = () => {
    setLang((prev) => {
      const next = prev === "am" ? "en" : "am";
      try {
        window.localStorage?.setItem("hope-lang", next);
      } catch {
        // ignore
      }
      return next;
    });
  };

  return (
    <LangContext.Provider value={{ lang, toggleLang, t: content[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
