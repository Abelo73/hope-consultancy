/**
 * CINEMATIC HERO — Hope Consultancy
 * ─────────────────────────────────
 * Stack: Framer Motion + GSAP + React Three Fiber + Drei + react-countup
 *
 * Layers:
 *  1. AnimatedBackground   — mesh gradient + noise + particles + spotlight
 *  2. Document3D           — R3F floating document with mouse tilt + bloom
 *  3. HeroText             — Framer Motion stagger headline / subtitle / buttons
 *  4. StatsRow             — CountUp numbers
 *  5. ScrollEffects        — GSAP ScrollTrigger: scale, parallax, fade
 */

import {
  useEffect,
  useRef,
  useState,
  Suspense,
  useCallback,
} from "react";
import { motion, useMotionValue, useSpring, type Variants } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCountUp } from "react-countup";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  RoundedBox,
  Float,
  Environment,
  ContactShadows,
  Sparkles,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { ArrowRight, Shield, Star } from "lucide-react";
import { useLang } from "../context/LangContext";
import { useTheme } from "../context/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════════
   UTILITY — Magnetic button hook
═══════════════════════════════════════════════════════════════════ */
function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  }, [x, y, strength]);

  const onLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return { ref, sx, sy, onMove, onLeave };
}

/* ═══════════════════════════════════════════════════════════════════
   3D — Floating Document / Certificate
═══════════════════════════════════════════════════════════════════ */
function DocumentMesh({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  const glassRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current || !innerRef.current) return;
    const t = state.clock.elapsedTime;

    // Gentle float
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.12;
    groupRef.current.rotation.z = Math.sin(t * 0.4) * 0.015;

    // Mouse tilt (lerped)
    const targetRotX = mouseY * 0.4;
    const targetRotY = mouseX * 0.5;
    innerRef.current.rotation.x +=
      (targetRotX - innerRef.current.rotation.x) * 0.06;
    innerRef.current.rotation.y +=
      (targetRotY - innerRef.current.rotation.y) * 0.06;

    // Glass shimmer
    if (glassRef.current) {
      (glassRef.current.material as THREE.MeshStandardMaterial).opacity =
        0.12 + Math.sin(t * 1.2) * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={innerRef}>
        {/* Main document body */}
        <RoundedBox args={[2.2, 3.0, 0.08]} radius={0.12} smoothness={4}>
          <meshStandardMaterial
            color="#0F2B27"
            roughness={0.15}
            metalness={0.6}
            envMapIntensity={1.6}
          />
        </RoundedBox>

        {/* Paper surface */}
        <RoundedBox
          args={[2.05, 2.82, 0.02]}
          radius={0.08}
          smoothness={4}
          position={[0, 0, 0.052]}
        >
          <meshStandardMaterial
            color="#FAF8F2"
            roughness={0.88}
            metalness={0.0}
          />
        </RoundedBox>

        {/* Header stripe */}
        <mesh position={[0, 1.18, 0.072]}>
          <boxGeometry args={[1.85, 0.22, 0.008]} />
          <meshStandardMaterial
            color="#C98A3D"
            roughness={0.2}
            metalness={0.8}
            emissive="#C98A3D"
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* Content lines */}
        {[0.78, 0.54, 0.30, 0.06, -0.18, -0.42].map((y, i) => (
          <mesh key={i} position={[(i % 2 === 0 ? -0.1 : 0.12), y, 0.072]}>
            <boxGeometry args={[i % 3 === 2 ? 1.1 : 1.6, 0.045, 0.006]} />
            <meshStandardMaterial
              color={i === 0 ? "#3D6B62" : "#BFBFBF"}
              roughness={0.9}
            />
          </mesh>
        ))}

        {/* Gold seal disc */}
        <mesh position={[0.6, -1.0, 0.075]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.28, 0.28, 0.03, 48]} />
          <meshStandardMaterial
            color="#C98A3D"
            roughness={0.08}
            metalness={0.95}
            emissive="#C98A3D"
            emissiveIntensity={0.5}
            envMapIntensity={2.5}
          />
        </mesh>

        {/* Glass overlay */}
        <RoundedBox
          ref={glassRef}
          args={[2.2, 3.0, 0.04]}
          radius={0.12}
          smoothness={4}
          position={[0, 0, 0.09]}
        >
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.12}
            roughness={0}
            metalness={0.1}
          />
        </RoundedBox>

        {/* Edge glow strip */}
        <mesh position={[-1.1, 0, 0]}>
          <boxGeometry args={[0.01, 3.0, 0.1]} />
          <meshStandardMaterial
            color="#F5A623"
            emissive="#F5A623"
            emissiveIntensity={1.2}
            transparent
            opacity={0.7}
          />
        </mesh>
      </group>

      {/* Sparkles around document */}
      <Sparkles
        count={28}
        scale={3.2}
        size={1.5}
        speed={0.4}
        opacity={0.5}
        color="#F5A623"
      />

      {/* Contact shadow */}
      <ContactShadows
        position={[0, -1.75, 0]}
        opacity={0.35}
        scale={4}
        blur={2.2}
        far={3}
        color="#0F2B27"
      />
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   3D — Camera rig that responds to scroll
═══════════════════════════════════════════════════════════════════ */
function CameraRig({ scrollY }: { scrollY: number }) {
  const { camera } = useThree();
  useFrame(() => {
    const targetZ = 4.5 + scrollY * 0.008;
    const targetY = scrollY * -0.002;
    camera.position.z += (targetZ - camera.position.z) * 0.08;
    camera.position.y += (targetY - camera.position.y) * 0.08;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ═══════════════════════════════════════════════════════════════════
   ANIMATED BACKGROUND — mesh gradient + spotlight + particles
═══════════════════════════════════════════════════════════════════ */
function AnimatedBackground({
  mouseX,
  mouseY,
  isDark,
}: {
  mouseX: number;
  mouseY: number;
  isDark: boolean;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: isDark
            ? [
              "radial-gradient(ellipse 80% 60% at 10% 10%, rgba(61,140,128,0.30) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 88% 20%, rgba(245,166,35,0.22) 0%, transparent 55%), radial-gradient(ellipse 70% 70% at 50% 100%, rgba(61,140,128,0.15) 0%, transparent 65%), #080C0B",
              "radial-gradient(ellipse 80% 60% at 20% 20%, rgba(61,140,128,0.28) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 30%, rgba(245,166,35,0.25) 0%, transparent 55%), radial-gradient(ellipse 70% 70% at 40% 100%, rgba(61,140,128,0.12) 0%, transparent 65%), #080C0B",
            ]
            : [
              "radial-gradient(ellipse 80% 60% at 10% 10%, rgba(61,140,128,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 88% 20%, rgba(245,166,35,0.14) 0%, transparent 55%), #FAF8F2",
              "radial-gradient(ellipse 80% 60% at 20% 20%, rgba(61,140,128,0.16) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 30%, rgba(245,166,35,0.18) 0%, transparent 55%), #FAF8F2",
            ],
        }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />

      {/* Mouse spotlight */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(245,166,35,0.06) 0%, transparent 70%)",
          left: `calc(${(mouseX + 1) * 50}% - 300px)`,
          top: `calc(${(mouseY + 1) * 50}% - 300px)`,
          transition: "left 0.6s ease, top 0.6s ease",
        }}
      />

      {/* Floating blobs */}
      {[
        { x: "-10%", y: "-15%", size: 480, color: "rgba(61,140,128,0.18)", delay: 0 },
        { x: "75%", y: "10%", size: 360, color: "rgba(245,166,35,0.14)", delay: 2 },
        { x: "40%", y: "75%", size: 300, color: "rgba(61,140,128,0.12)", delay: 4 },
      ].map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            left: blob.x,
            top: blob.y,
            background: `radial-gradient(circle, ${blob.color}, transparent 70%)`,
            filter: "blur(60px)",
          }}
          animate={{ x: [0, 20, -10, 0], y: [0, -15, 10, 0], scale: [1, 1.08, 0.96, 1] }}
          transition={{ duration: 12 + i * 3, repeat: Infinity, ease: "easeInOut", delay: blob.delay }}
        />
      ))}

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
        }}
      />

      {/* Floating particles */}
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 2 + (i % 3),
            height: 2 + (i % 3),
            left: `${8 + (i * 5.3) % 85}%`,
            top: `${5 + (i * 7.1) % 85}%`,
            background: i % 3 === 0
              ? "rgba(245,166,35,0.6)"
              : "rgba(61,140,128,0.5)",
          }}
          animate={{
            y: [-12, 12, -12],
            x: [-6, 6, -6],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4 + (i % 4),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}

      {/* Grid lines subtle */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(61,140,128,1) 1px, transparent 1px), linear-gradient(90deg, rgba(61,140,128,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   TEXT ANIMATIONS
═══════════════════════════════════════════════════════════════════ */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as any },
  },
};


const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

function SplitHeadline({ text }: { text: string }) {
  const words = text.split(" ");
  const midpoint = Math.ceil(words.length / 2);
  const lines = [words.slice(0, midpoint).join(" "), words.slice(midpoint).join(" ")];

  return (
    <motion.h1
      className="font-serif-am text-[2.6rem] sm:text-5xl lg:text-[3.6rem] text-ink-900 dark:text-paper-50 tracking-[-0.025em] leading-[1.05] mb-7"
      aria-label={text}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {lines.map((line, li) => (
        <div key={li} className="overflow-hidden">
          {line.split(" ").map((word, wi) => (
            <motion.span
              key={wi}
              variants={wordVariants}
              className={`inline-block mr-[0.28em] ${li === 1 && wi === line.split(" ").length - 1
                ? "relative"
                : ""
                }`}
              style={
                li === 1 && wi === line.split(" ").length - 1
                  ? {
                    background:
                      "linear-gradient(100deg, #FFD98A 0%, #F5A623 38%, #E08A0E 58%, #F5A623 78%, #FFD98A 100%)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "shimmerText 3.5s linear 1.2s infinite",
                  }
                  : {}
              }
            >
              {word}
            </motion.span>
          ))}
        </div>
      ))}
    </motion.h1>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAGNETIC BUTTON
═══════════════════════════════════════════════════════════════════ */
function MagneticButton({
  children,
  onClick,
  primary = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  primary?: boolean;
}) {
  const { ref, sx, sy, onMove, onLeave } = useMagnetic(0.3);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const addRipple = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const id = Date.now();
    setRipples((r) => [...r, { x: e.clientX - rect.left, y: e.clientY - rect.top, id }]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 700);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      onClick={(e) => { addRipple(e); onClick?.(); }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={`relative overflow-hidden inline-flex items-center gap-2.5 px-7 py-4 rounded-full font-semibold transition-shadow duration-300 ${primary
        ? "bg-ink-800 dark:bg-seal-400 text-paper-50 dark:text-ink-950 shadow-seal hover:shadow-seal-lg"
        : "border-2 border-ink-900/15 dark:border-paper-50/22 text-ink-800 dark:text-paper-100 hover:border-seal-400/50 dark:hover:border-seal-400/40"
        }`}
    >
      {/* Ripples */}
      {ripples.map((rp) => (
        <span
          key={rp.id}
          className="absolute rounded-full pointer-events-none animate-ping"
          style={{
            left: rp.x - 10,
            top: rp.y - 10,
            width: 20,
            height: 20,
            background: primary ? "rgba(255,255,255,0.3)" : "rgba(245,166,35,0.3)",
          }}
        />
      ))}
      {children}
    </motion.button>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   BADGE — floating, glowing, mouse-responsive
═══════════════════════════════════════════════════════════════════ */
function FloatingBadge({
  children,
  style,
  delay = 0,
  mouseX = 0,
  mouseY = 0,
  parallaxFactor = 0.012,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  delay?: number;
  mouseX?: number;
  mouseY?: number;
  parallaxFactor?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        ...style,
        x: mouseX * parallaxFactor * window.innerWidth * 0.03,
        y: mouseY * parallaxFactor * window.innerHeight * 0.03,
      }}
      className="absolute"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5 + delay, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        {/* Glow */}
        <div className="absolute inset-0 rounded-2xl blur-md bg-seal-400/30 scale-110" />
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   STAT ITEM
═══════════════════════════════════════════════════════════════════ */
function StatItem({
  end,
  suffix,
  label,
  delay,
}: {
  end: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const countRef = useRef<any>(null);

  // We initialize the hook, it will handle scroll spying and delay automatically
  useCountUp({
    ref: countRef,
    end,
    suffix,
    duration: 2.5,
    delay,
    enableScrollSpy: true,
    scrollSpyDelay: 200,
    startOnMount: true,
  });

  return (
    <motion.div
      variants={fadeUp}
      className="group"
    >
      <div className="font-serif-am text-3xl sm:text-4xl font-bold text-ink-900 dark:text-paper-50 leading-none mb-1">
        <span ref={countRef}>0</span>
      </div>
      <div className="text-sm text-ink-400 dark:text-paper-300/55">{label}</div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN HERO
═══════════════════════════════════════════════════════════════════ */
export default function Hero() {
  const { t } = useLang();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const sectionRef = useRef<HTMLElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);

  // Raw mouse position [-1, 1]
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  // Scroll position
  const [scrollY, setScrollY] = useState(0);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  /* ── Mouse tracking ── */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* ── Scroll tracking ── */
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── GSAP ScrollTrigger for hero parallax / scale ── */
  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasWrapRef.current;
    if (!section || !canvas) return;

    const ctx = gsap.context(() => {
      // Hero wrapper slightly scales down as user scrolls
      gsap.to(section, {
        scale: 0.96,
        filter: "brightness(0.85)",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Text fades out
      gsap.to(".hero-text-col", {
        y: -60,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "20% top",
          end: "70% top",
          scrub: true,
        },
      });

      // Canvas parallax
      gsap.to(canvas, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  /* ── Stat data from translations ── */
  const statData = [
    { end: 16, suffix: "+", label: t.hero.stat1l },
    { end: 4, suffix: "+", label: t.hero.stat2l },
    { end: 100, suffix: "%", label: t.hero.stat3l },
  ];

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center pt-28 pb-20 sm:pt-36 sm:pb-32 overflow-hidden"
      style={{ transformOrigin: "top center" }}
    >
      {/* ── BACKGROUND LAYER ── */}
      <AnimatedBackground mouseX={mouse.x} mouseY={mouse.y} isDark={isDark} />

      {/* ── GRID WRAPPER ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 xl:gap-20 items-center w-full">

        {/* ── LEFT: TEXT CONTENT ── */}
        <div className="hero-text-col">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6"
          >
            <span className="section-eyebrow">{t.hero.eyebrow}</span>
          </motion.div>

          {/* Split headline */}
          <SplitHeadline text={t.hero.title} />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.75, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-ink-500 dark:text-paper-200/75 max-w-xl mb-10 leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 mb-14"
          >
            <MagneticButton primary onClick={() => scrollTo("documents")}>
              {t.hero.ctaPrimary}
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight size={16} />
              </motion.span>
            </MagneticButton>

            <MagneticButton onClick={() => scrollTo("services")}>
              {t.hero.ctaSecondary}
            </MagneticButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            transition={{ delayChildren: 1.0, staggerChildren: 0.12 }}
            className="flex flex-wrap gap-x-10 gap-y-5"
          >
            {statData.map((s, i) => (
              <StatItem key={i} {...s} delay={1.0 + i * 0.15} />
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT: 3D CANVAS ── */}
        <div
          ref={canvasWrapRef}
          className="relative hidden lg:flex justify-center items-center h-[520px]"
        >
          {/* Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            <Canvas
              camera={{ position: [0, 0, 4.5], fov: 45 }}
              gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
              dpr={Math.min(window.devicePixelRatio, 2)}
            >
              <Suspense fallback={null}>
                <CameraRig scrollY={scrollY} />
                <ambientLight intensity={0.6} />
                <directionalLight
                  position={[3, 5, 4]}
                  intensity={1.4}
                  castShadow
                />
                <pointLight position={[-3, 2, 2]} intensity={0.8} color="#F5A623" />
                <pointLight position={[3, -2, 1]} intensity={0.5} color="#3D8C80" />

                <Environment preset="city" />

                <Float
                  speed={1.4}
                  rotationIntensity={0.15}
                  floatIntensity={0.3}
                >
                  <DocumentMesh mouseX={mouse.x} mouseY={-mouse.y} />
                </Float>

                <EffectComposer>
                  <Bloom
                    luminanceThreshold={0.6}
                    luminanceSmoothing={0.9}
                    intensity={0.8}
                    mipmapBlur
                  />
                </EffectComposer>
              </Suspense>
            </Canvas>
          </motion.div>

          {/* Floating badge — Verified */}
          <FloatingBadge
            delay={0.9}
            mouseX={mouse.x}
            mouseY={mouse.y}
            parallaxFactor={0.018}
            style={{ top: "8%", right: "-5%" }}
          >
            <div className="relative flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-paper-50/92 dark:bg-ink-800/85 border border-ink-900/8 dark:border-paper-50/12 shadow-card dark:shadow-card-dark backdrop-blur-md">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-seal-400/15 dark:bg-seal-400/20">
                <Shield size={14} className="text-seal-500 dark:text-seal-300" strokeWidth={2} />
              </span>
              <div>
                <div className="text-[11px] font-bold text-ink-900 dark:text-paper-50">Verified</div>
                <div className="text-[9px] text-ink-400 dark:text-paper-400">Ministry Accredited</div>
              </div>
            </div>
          </FloatingBadge>

          {/* Floating badge — License */}
          <FloatingBadge
            delay={1.1}
            mouseX={mouse.x}
            mouseY={mouse.y}
            parallaxFactor={0.022}
            style={{ bottom: "12%", left: "-10%" }}
          >
            <div className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-ink-800/92 dark:bg-ink-900/90 border border-seal-400/30 shadow-seal backdrop-blur-md">
              <Star size={13} className="text-seal-300" strokeWidth={2} />
              <span className="text-[11px] font-bold text-seal-300">License #ETH-2024</span>
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse ml-1" />
            </div>
          </FloatingBadge>

          {/* Active status chip */}
          <FloatingBadge
            delay={1.3}
            mouseX={mouse.x}
            mouseY={mouse.y}
            parallaxFactor={0.014}
            style={{ top: "42%", right: "-12%" }}
          >
            <div className="text-[10px] font-semibold text-green-600 dark:text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Active
            </div>
          </FloatingBadge>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-ink-400/60 dark:text-paper-400/40">
          Scroll
        </span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-ink-400/50 to-transparent dark:from-paper-400/30"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Shimmer keyframe */}
      <style>{`
        @keyframes shimmerText {
          0%   { background-position: 0%   center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </section>
  );
}
