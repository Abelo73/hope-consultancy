import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { processSteps } from "../data/documents";
import { useLang } from "../context/LangContext";

/* ═══════════════════════════════════════════════════════════════════
   STEP CARD
═══════════════════════════════════════════════════════════════════ */
function ProcessStep({ step, index, isLeft, lang, t }: { step: any, index: number, isLeft: boolean, lang: string, t: any }) {
  return (
    <div className={`relative flex flex-col sm:flex-row items-center gap-8 ${isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'} w-full`}>
      {/* Content Side */}
      <motion.div 
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full sm:w-1/2 ${isLeft ? 'sm:text-right sm:pr-12' : 'sm:text-left sm:pl-12'}`}
      >
        <div className="relative group">
          <div className="inline-flex items-center gap-2 mb-4">
             {!isLeft && <div className="h-px w-6 bg-seal-400" />}
             <span className="text-[10px] font-black uppercase tracking-[0.25em] text-seal-500 dark:text-seal-400">
               {t.process.milestone} {index + 1}
             </span>
             {isLeft && <div className="h-px w-6 bg-seal-400" />}
          </div>
          
          <h3 className="text-2xl sm:text-3xl font-serif-am text-ink-900 dark:text-paper-50 mb-4 group-hover:text-gradient-gold transition-colors duration-300">
            {lang === "am" ? step.taskAm : step.taskEn}
          </h3>
          
          <div className={`flex flex-wrap items-center gap-3 ${isLeft ? 'sm:justify-end' : 'sm:justify-start'}`}>
            <span className="px-3 py-1.5 rounded-lg bg-ink-900/5 dark:bg-paper-50/5 border border-ink-900/10 dark:border-paper-50/10 text-[11px] font-bold text-ink-500 dark:text-paper-400">
              {lang === "am" ? step.ownerAm : step.ownerEn}
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-seal-400/10 border border-seal-400/20 text-[11px] font-bold text-seal-600 dark:text-seal-300">
              {step.dayAm}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Center Marker */}
      <div className="relative z-20 shrink-0">
        <motion.div 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
          className="w-14 h-14 rounded-2xl bg-ink-800 dark:bg-ink-900 border-2 border-seal-400/50 shadow-seal flex items-center justify-center relative overflow-hidden group"
        >
          {/* Inner pulse */}
          <div className="absolute inset-0 bg-seal-400/20 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <span className="text-gradient-gold font-serif-am text-xl font-bold relative z-10">
            {lang === "am" ? step.numAm : step.numEn}
          </span>
        </motion.div>
        
        {/* Connection line horizontal (desktop) */}
        <div className={`hidden sm:block absolute top-1/2 w-4 h-0.5 bg-seal-400/30 ${isLeft ? 'left-full' : 'right-full'}`} />
      </div>

      {/* Spacer Side (for desktop balance) */}
      <div className="hidden sm:block sm:w-1/2" />
    </div>
  );
}

export default function Process() {
  const { lang, t } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Connect length of timeline to scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="process" className="relative py-24 sm:py-40 bg-paper-100 dark:bg-abyss-900 overflow-hidden">
      {/* Cinematic backgrounds */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-ink-900/10 dark:via-paper-50/10 to-transparent" />
      
      <div className="orb orb-teal w-[600px] h-[600px] left-1/2 -translate-x-1/2 -top-40 opacity-[0.05] dark:opacity-[0.1] blur-[140px]" />
      
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-32 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-eyebrow mb-6 mx-auto inline-block">{t.process.eyebrow}</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif-am text-4xl sm:text-5xl lg:text-7xl text-ink-900 dark:text-paper-50 tracking-[-0.04em] mb-8 leading-[1.05]"
          >
            {t.process.title}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-ink-500 dark:text-paper-200/60 leading-relaxed max-w-2xl mx-auto"
          >
            {t.process.subtitle}
          </motion.p>
        </div>

        {/* Cinematic Timeline */}
        <div ref={containerRef} className="relative flex flex-col gap-24 sm:gap-40">
          
          {/* Central Vertical Line */}
          <div className="absolute left-[27px] sm:left-1/2 top-4 bottom-4 w-px bg-ink-900/10 dark:bg-paper-50/10 -translate-x-1/2 z-0">
            {/* The Animated "Drawing" Line */}
            <motion.div 
              style={{ scaleY, originY: 0 }}
              className="absolute inset-0 w-full bg-gradient-to-b from-seal-400 via-teal-500 to-seal-300 shadow-[0_0_15px_rgba(245,166,35,0.4)]" 
            />
          </div>

          {processSteps.map((step, i) => (
            <ProcessStep 
              key={i} 
              step={step} 
              index={i} 
              isLeft={i % 2 === 0} 
              lang={lang} 
              t={t}
            />
          ))}
          
          {/* Final Pulse Orb at the bottom of the line */}
          <div className="absolute left-[27px] sm:left-1/2 bottom-0 -translate-x-1/2 z-10">
             <motion.div 
               style={{ opacity: scrollYProgress }}
               className="w-4 h-4 rounded-full bg-teal-500 shadow-[0_0_20px_rgba(20,184,166,0.6)] animate-ping" 
             />
             <motion.div 
               style={{ opacity: scrollYProgress }}
               className="absolute top-0 left-0 w-4 h-4 rounded-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.8)]" 
             />
          </div>
        </div>

        {/* Narrative Footer */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="mt-40 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-5 rounded-3xl bg-paper-50/80 dark:bg-ink-800/80 border border-ink-900/10 dark:border-paper-50/10 backdrop-blur-xl shadow-xl">
             <div className="w-12 h-12 rounded-full overflow-hidden bg-seal-400/20 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-seal-400 animate-pulse" />
             </div>
             <p className="text-left text-ink-700 dark:text-paper-100 font-medium">
               <span className="block text-xs uppercase tracking-widest text-ink-400 dark:text-paper-400/60 mb-1">{t.process.statusLabel}</span>
               {t.process.statusDesc}
             </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
