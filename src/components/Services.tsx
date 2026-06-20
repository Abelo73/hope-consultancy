import { useRef } from "react";
import {
  ShoppingCart, Building2, Megaphone, Users, TrendingUp, UserCog,
  Landmark, Lightbulb, Cpu, MessageCircle, FileBarChart, Wallet,
  FlaskConical, Brain, Heart, PiggyBank, ClipboardCheck,
} from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useLang } from "../context/LangContext";

const icons = [
  ShoppingCart, Building2, Megaphone, Users, TrendingUp, UserCog,
  Landmark, Lightbulb, Cpu, MessageCircle, FileBarChart, Wallet,
  FlaskConical, Brain, Heart, PiggyBank, ClipboardCheck,
];

/* ═══════════════════════════════════════════════════════════════════
   INTERACTIVE 3D CARD
═══════════════════════════════════════════════════════════════════ */
function InteractiveServiceCard({ item, index, Icon, t }: { item: any, index: number, Icon: any, t: any }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });

  // Shine effect position
  const shineX = useSpring(useTransform(x, [-0.5, 0.5], ["0%", "100%"]));
  const shineY = useSpring(useTransform(y, [-0.5, 0.5], ["0%", "100%"]));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Normalize values to range [-0.5, 0.5]
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isPlacement = index === 16; // The "License Placement" item

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      style={{
        perspective: "1000px",
        rotateX,
        rotateY,
      }}
      className={`group relative p-7 rounded-[28px] border transition-all duration-500 overflow-hidden ${isPlacement
          ? "bg-gradient-to-br from-seal-400/20 to-seal-600/10 border-seal-400/30 dark:border-seal-400/20 shadow-seal"
          : "bg-paper-50/60 dark:bg-paper-50/[0.03] border-ink-900/10 dark:border-paper-50/8 backdrop-blur-md hover:border-seal-400/40 dark:hover:border-seal-400/30"
        }`}
    >
      {/* Shine overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${shineX} ${shineY}, rgba(245,166,35,0.1) 0%, transparent 70%)`
        }}
      />

      {/* Background patterns */}
      <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-seal-400/5 blur-2xl group-hover:bg-seal-400/10 transition-colors" />

      <div className="relative z-10">
        {/* Icon container */}
        <div
          className={`flex items-center justify-center w-14 h-14 rounded-2xl mb-7 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-6 ${isPlacement
              ? "bg-paper-50 text-ink-900 shadow-xl"
              : "bg-ink-800 dark:bg-paper-50/10 text-paper-50 dark:text-paper-100 shadow-lg group-hover:bg-seal-400 group-hover:shadow-seal-lg"
            }`}
        >
          <Icon size={24} strokeWidth={1.5} />
        </div>

        <h3 className="font-serif-am text-xl text-ink-900 dark:text-paper-50 mb-3 leading-snug group-hover:text-gradient-gold transition-all duration-300">
          {item.title}
        </h3>
        <p className="text-sm text-ink-500 dark:text-paper-300/60 leading-relaxed">
          {item.desc}
        </p>

        {isPlacement && (
          <div className="mt-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-ink-900 bg-paper-50 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            {t.services.premiumBadge}
          </div>
        )}
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-seal-400/40 to-transparent w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
    </motion.div>
  );
}

export default function Services() {
  const { t } = useLang();

  return (
    <section id="services" className="relative py-24 sm:py-36 bg-paper-100 dark:bg-abyss-900 overflow-hidden">
      {/* Cinematic background elements */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-ink-900/10 dark:via-paper-50/10 to-transparent" />

      <div className="orb orb-teal w-[600px] h-[600px] -left-64 top-40 opacity-[0.08] dark:opacity-[0.12] blur-[120px]" />
      <div className="orb orb-gold w-[500px] h-[500px] -right-48 bottom-20 opacity-[0.06] dark:opacity-[0.1] blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section header */}
        <div className="max-w-3xl mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-eyebrow mb-6 inline-block">{t.services.eyebrow}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif-am text-4xl sm:text-5xl lg:text-6xl text-ink-900 dark:text-paper-50 tracking-[-0.03em] mb-8 leading-[1.1]"
          >
            {t.services.title.split(' ').map((word: string, i: number) => (
              <span key={i} className="inline-block mr-[0.25em] last:mr-0">
                {word}
              </span>
            ))}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl text-ink-500 dark:text-paper-200/60 leading-relaxed max-w-2xl"
          >
            {t.services.subtitle}
          </motion.p>
        </div>

        {/* Dynamic Bento-ish Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {t.services.items.map((item, i) => (
            <InteractiveServiceCard
              key={item.title}
              item={item}
              index={i}
              Icon={icons[i % icons.length]}
              t={t}
            />
          ))}

          {/* Creative filler card / CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative p-7 rounded-[28px] bg-ink-900 dark:bg-seal-400 flex flex-col justify-between overflow-hidden min-h-[280px]"
          >
            <div className="relative z-10">
              <h4 className="text-2xl font-serif-am text-paper-50 dark:text-ink-950 mb-4">
                {t.services.ctaTitle}
              </h4>
              <p className="text-paper-50/60 dark:text-ink-950/60 text-sm">
                {t.services.ctaDesc}
              </p>
            </div>

            <button className="relative z-10 mt-6 self-start px-6 py-3 rounded-full bg-paper-50 dark:bg-ink-900 text-ink-900 dark:text-paper-50 font-bold text-sm hover:scale-105 transition-transform">
              {t.services.ctaBtn}
            </button>

            {/* Background dynamic orb for this specific card */}
            <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-seal-400/20 dark:bg-ink-900/10 blur-xl animate-pulse" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
