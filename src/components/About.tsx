import { useRef } from "react";
import { CheckCircle2, Award, Globe2, Users2, Sparkle } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLang } from "../context/LangContext";
import { useCountUp } from "react-countup";

/* ═══════════════════════════════════════════════════════════════════
   ANIMATED STAT ITEM
═══════════════════════════════════════════════════════════════════ */
function AboutStat({ n, suffix, l, delay, Icon }: { n: number, suffix: string, l: string, delay: number, Icon: any }) {
  const countRef = useRef<HTMLSpanElement>(null);
  
  useCountUp({
    ref: countRef,
    end: n,
    suffix,
    duration: 3,
    delay,
    enableScrollSpy: true,
    scrollSpyDelay: 200,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="group flex flex-col items-center text-center p-8 rounded-3xl bg-paper-50/60 dark:bg-paper-50/[0.03] border border-ink-900/10 dark:border-paper-50/8 backdrop-blur-xl hover:border-seal-400/40 transition-all duration-500"
    >
      <div className="w-12 h-12 rounded-2xl bg-seal-400/10 dark:bg-seal-400/15 flex items-center justify-center text-seal-600 dark:text-seal-300 mb-5 group-hover:scale-110 transition-transform">
        <Icon size={24} strokeWidth={1.5} />
      </div>
      <div className="font-serif-am text-3xl sm:text-4xl font-bold text-ink-900 dark:text-paper-50 mb-2">
        <span ref={countRef}>0</span>
      </div>
      <div className="text-xs font-black uppercase tracking-[0.2em] text-ink-400 dark:text-paper-400/60">
        {l}
      </div>
    </motion.div>
  );
}

export default function About() {
  const { lang, t } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const quoteX = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const secondaryX = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const quote =
    lang === "am"
      ? "ግልጽነት ለሚያምን ድርጅት ተአማኒነት ይከተላል።"
      : "Trust follows the organization that values transparency.";

  return (
    <section ref={containerRef} id="about" className="relative py-24 sm:py-40 bg-paper-100 dark:bg-abyss-900 overflow-hidden">
      {/* Background visual depth */}
      <div className="orb orb-teal w-[600px] h-[600px] -right-24 top-20 opacity-[0.06] dark:opacity-[0.1] blur-[120px]" />
      <div className="orb orb-gold w-[400px] h-[400px] -left-16 bottom-10 opacity-[0.04] dark:opacity-[0.08] blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* TOP: Cinematic Split Layout */}
        <div className="grid lg:grid-cols-[1fr_0.8fr] gap-20 items-center mb-32">
          
          {/* Text Content */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-10 bg-seal-400" />
                <span className="section-eyebrow">{t.about.eyebrow}</span>
              </div>
              
              <h2 className="font-serif-am text-4xl sm:text-5xl lg:text-[3.8rem] text-ink-900 dark:text-paper-50 tracking-[-0.03em] mb-10 leading-[1.05]">
                {t.about.title}
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-ink-500 dark:text-paper-200/60 leading-relaxed mb-12 max-w-xl"
            >
              {t.about.body}
            </motion.p>

            <div className="grid sm:grid-cols-2 gap-4">
              {t.about.points.map((p: string, i: number) => (
                <motion.div
                  key={p}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3.5 p-4 rounded-2xl bg-paper-50/50 dark:bg-paper-50/5 border border-ink-900/5 dark:border-paper-50/5 backdrop-blur-sm"
                >
                  <div className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-seal-400 text-ink-900">
                    <CheckCircle2 size={14} strokeWidth={3} />
                  </div>
                  <span className="text-sm font-semibold text-ink-800 dark:text-paper-100">{p}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Cinematic Quote Visual */}
          <div className="relative">
             <motion.div 
               style={{ x: secondaryX }}
               className="relative z-10 rounded-[40px] bg-ink-900 dark:bg-ink-800 p-10 sm:p-14 text-paper-50 shadow-2xl overflow-hidden group"
             >
                {/* Large animated quote mark */}
                <div className="absolute top-0 left-8 text-[12rem] font-serif-am text-seal-400/10 leading-none pointer-events-none select-none italic transform -translate-y-1/4">
                  "
                </div>

                <div className="relative z-20">
                  <motion.p 
                    style={{ x: quoteX }}
                    className="font-serif-am text-2xl sm:text-3xl lg:text-4xl text-paper-50 leading-[1.3] mb-12 italic"
                  >
                    {quote}
                  </motion.p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-4">
                       <div className="h-px w-12 bg-seal-400/40" />
                       <span className="text-xs font-black uppercase tracking-[0.3em] text-seal-400">
                         Hope Consultancy
                       </span>
                    </div>
                    
                    <Sparkle size={24} className="text-seal-400 animate-pulse" />
                  </div>
                </div>

                {/* Pulsing seal inside card */}
                <div className="absolute -bottom-8 -right-8 w-40 h-40 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                    <div className="w-full h-full bg-seal-400 rounded-full blur-[60px]" />
                </div>
             </motion.div>

             {/* Background decorative element */}
             <div className="absolute -inset-4 rounded-[44px] border border-seal-400/20 -z-10 transform rotate-2" />
          </div>
        </div>

        {/* BOTTOM: High-Performance Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <AboutStat 
            n={16} 
            suffix="+" 
            l="Expert Years" 
            delay={0.1} 
            Icon={Award} 
          />
          <AboutStat 
            n={4} 
            suffix="+" 
            l="Specializations" 
            delay={0.2} 
            Icon={Globe2} 
          />
          <AboutStat 
            n={100} 
            suffix="%" 
            l="Client Satisfaction" 
            delay={0.3} 
            Icon={Users2} 
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col justify-center items-center text-center p-8 rounded-3xl bg-ink-900 dark:bg-seal-400 text-paper-50 dark:text-ink-950 shadow-xl"
          >
             <h4 className="text-sm font-black uppercase tracking-widest mb-3 opacity-80">Our Vision</h4>
             <p className="font-serif-am text-lg leading-snug">
               Leading excellence in regional consultancy.
             </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
