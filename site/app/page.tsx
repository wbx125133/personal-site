"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Copy, Download, Mail, Pause, Play, VolumeX } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import content from "@/content/content.json";

type Section = (typeof content.sections)[number];

const reveal = {
  hidden: { opacity: 0, y: 42 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } }
};

export default function Home() {
  const [active, setActive] = useState(content.sections[0]);
  const [loading, setLoading] = useState(true);
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false, label: "" });
  const { scrollYProgress } = useScroll();
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1650);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observers = content.sections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean)
      .map((node) => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              const next = content.sections.find((section) => section.id === entry.target.id);
              if (next) setActive(next);
            }
          },
          { rootMargin: "-42% 0px -42% 0px", threshold: 0 }
        );
        observer.observe(node);
        return observer;
      });
    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  useEffect(() => {
    const move = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const action = target.closest("[data-cursor]")?.getAttribute("data-cursor") ?? "";
      setCursor({ x: event.clientX, y: event.clientY, visible: true, label: action });
    };
    const hide = () => setCursor((current) => ({ ...current, visible: false }));
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", hide);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", hide);
    };
  }, []);

  return (
    <main className="grain min-h-screen bg-[#090909] text-[#E8E8E8]">
      <AnimatePresence>{loading ? <Loader /> : null}</AnimatePresence>
      <CustomCursor cursor={cursor} />
      <motion.div className="fixed right-0 top-0 z-[60] w-px bg-[#D4A574]" style={{ height: progressHeight }} />
      <FloorIndicator section={active} />
      <SideNav sections={content.sections} active={active.id} />
      <Hero />
      <About />
      <Work />
      <Thinking />
      <Capability />
      <Contact />
    </main>
  );
}

function Loader() {
  const [step, setStep] = useState(6);

  useEffect(() => {
    const interval = window.setInterval(() => setStep((value) => Math.max(1, value - 1)), 250);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#060606]"
      exit={{ y: "-100%", transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="text-center">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-[96px] font-light text-[#D4A574] md:text-[132px]"
        >
          0{step}
        </motion.div>
        <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.34em] text-[#8B95A7]">Silas Wang</div>
      </div>
    </motion.div>
  );
}

function CustomCursor({ cursor }: { cursor: { x: number; y: number; visible: boolean; label: string } }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      <motion.div
        className="absolute h-3.5 w-3.5 rounded-full bg-[#D4A574]"
        animate={{ x: cursor.x - 7, y: cursor.y - 7, opacity: cursor.visible ? 1 : 0, scale: cursor.label ? 0.45 : 1 }}
        transition={{ type: "spring", stiffness: 520, damping: 34 }}
      />
      <motion.div
        className="absolute grid h-6 w-6 place-items-center rounded-full border border-[#D4A574]/80 font-mono text-[8px] uppercase text-[#D4A574]"
        animate={{
          x: cursor.x - (cursor.label ? 28 : 12),
          y: cursor.y - (cursor.label ? 28 : 12),
          width: cursor.label ? 56 : 24,
          height: cursor.label ? 56 : 24,
          opacity: cursor.visible ? 1 : 0
        }}
        transition={{ type: "spring", stiffness: 180, damping: 24 }}
      >
        {cursor.label}
      </motion.div>
    </div>
  );
}

function FloorIndicator({ section }: { section: Section }) {
  return (
    <div className="fixed right-7 top-6 z-50 hidden text-right md:block">
      <AnimatePresence mode="wait">
        <motion.div
          key={section.floor}
          initial={{ rotateX: -80, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="origin-center font-mono text-[92px] font-light leading-none text-[#E8ECF4]/75"
        >
          {section.floor}
        </motion.div>
      </AnimatePresence>
      <div className="mt-2 font-mono text-[8px] uppercase tracking-[0.35em] text-[#D4A574]">{section.label}</div>
    </div>
  );
}

function SideNav({ sections, active }: { sections: Section[]; active: string }) {
  return (
    <nav className="fixed left-7 top-1/2 z-50 hidden -translate-y-1/2 md:block" aria-label="Section navigation">
      <div className="flex flex-col gap-5">
        {sections.map((section) => {
          const isActive = section.id === active;
          return (
            <a key={section.id} href={`#${section.id}`} data-cursor="GO" className="group flex items-center gap-3">
              <span className={`h-px transition-all duration-500 ${isActive ? "w-10 bg-[#D4A574]" : "w-5 bg-white/20"}`} />
              <span className={`h-2 w-2 rounded-full transition-colors ${isActive ? "bg-[#D4A574]" : "bg-white/20"}`} />
              <span className={`font-mono text-[9px] uppercase tracking-[0.22em] transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`}>
                {section.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}

function Hero() {
  const [paused, setPaused] = useState(false);

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      <div className={`absolute inset-0 hero-film ${paused ? "is-paused" : ""}`}>
        <div className="absolute inset-0 bg-[url('/images/hero-ink.svg')] bg-cover bg-center opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_54%,rgba(212,165,116,0.2),transparent_24%),linear-gradient(90deg,rgba(0,0,0,0.72),rgba(0,0,0,0.1)_45%,rgba(0,0,0,0.8))]" />
      </div>
      <motion.div
        className="absolute inset-0 bg-[#090909]"
        initial={{ clipPath: "circle(0% at 50% 50%)" }}
        animate={{ clipPath: "circle(84% at 50% 50%)" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.5 }}
      />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1540px] flex-col justify-between px-6 py-7 md:px-16 md:py-10">
        <div className="mx-auto flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.32em] text-[#D4A574]/85">
          <span className="h-px w-14 bg-[#D4A574]/50" />
          {content.hero.journey}
          <span className="h-px w-14 bg-[#D4A574]/50" />
        </div>
        <div className="flex items-end justify-between gap-10 pb-10">
          <motion.h1
            className="text-vertical shrink-0 text-[86px] font-extralight leading-none text-white/90 md:text-[120px]"
            variants={reveal}
            initial="hidden"
            animate="show"
          >
            {content.hero.name_zh}
          </motion.h1>
          <motion.div className="max-w-[560px] text-right" variants={reveal} initial="hidden" animate="show">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#D4A574]">{content.hero.title}</p>
            <h2 className="mt-5 text-[54px] font-light leading-none md:text-[88px]">{content.hero.name_en}</h2>
            <p className="mt-6 text-[18px] text-[#E8ECF4]/80 md:text-[22px]">{content.hero.tagline}</p>
            <div className="mt-9 flex flex-wrap justify-end gap-4">
              {content.hero.cta.map((item) => (
                <a key={item.label} href={item.href} data-cursor="OPEN" className="cinema-link inline-flex items-center gap-2 text-[13px] text-[#D4A574]">
                  {item.label}
                  {item.href.endsWith(".pdf") ? <Download size={15} /> : <ArrowUpRight size={15} />}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-8 left-6 z-20 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#8B95A7] md:left-16">
          <button data-cursor="PAUSE" onClick={() => setPaused((value) => !value)} className="inline-flex items-center gap-2">
            {paused ? <Play size={13} /> : <Pause size={13} />}
            {paused ? "PLAY" : "PAUSE"}
          </button>
          <span className="inline-flex items-center gap-2">
            <VolumeX size={13} />
            MUTE
          </span>
        </div>
        <div className="absolute bottom-8 right-6 z-20 font-mono text-[10px] uppercase tracking-[0.24em] text-[#D4A574] md:right-16">
          SCROLL <span className="scroll-mark">↓</span>
        </div>
      </div>
    </section>
  );
}

function SectionShell({
  id,
  label,
  title,
  children
}: {
  id: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative px-6 py-28 md:px-16 md:py-40">
      <motion.div className="mx-auto max-w-[1280px]" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-15%" }}>
        <div className="mb-14 flex items-end justify-between gap-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.36em] text-[#D4A574]">{label}</p>
            <h2 className="mt-4 text-[40px] font-light leading-tight md:text-[56px]">{title}</h2>
          </div>
          <div className="hidden h-px flex-1 bg-[#D4A574]/20 md:block" />
        </div>
        {children}
      </motion.div>
    </section>
  );
}

function About() {
  const [tab, setTab] = useState(0);
  const current = content.about[tab];

  return (
    <SectionShell id="about" label="ABOUT / 个人切面" title="PM thinking, designer eyes.">
      <div className="grid gap-12 md:grid-cols-[0.88fr_1.12fr] md:items-end">
        <div className="relative aspect-[3/4] overflow-hidden border border-[#D4A574]/15">
          <img src="/images/avatar.jpg" alt="王柏晰个人照" className="h-full w-full object-cover grayscale sepia-[0.28]" />
          <div className="absolute inset-0 bg-[#D4A574]/10 mix-blend-color" />
        </div>
        <div>
          <div className="mb-12 flex flex-wrap gap-3">
            {content.about.map((item, index) => (
              <button
                key={item.tab}
                data-cursor="VIEW"
                onClick={() => setTab(index)}
                className={`border px-5 py-3 font-mono text-[11px] transition-colors ${
                  tab === index ? "border-[#D4A574] text-[#D4A574]" : "border-white/15 text-[#8B95A7] hover:border-[#D4A574]/45"
                }`}
              >
                {item.tab}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.ul
              key={current.tab}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-7 text-[24px] font-light leading-relaxed text-[#E8ECF4]/88 md:text-[34px]"
            >
              {current.highlights.map((item) => (
                <li key={item} className="border-b border-white/10 pb-5">
                  {item}
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </SectionShell>
  );
}

function Work() {
  return (
    <SectionShell id="work" label="WORK / 业务介绍" title="Four proofs of shipping.">
      <div className="space-y-24">
        {content.work.map((item, index) => (
          <motion.article
            key={item.title}
            className={`grid min-h-[72vh] gap-10 md:grid-cols-2 md:items-center ${index % 2 === 1 ? "md:[&_.work-media]:order-2" : ""}`}
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.28 }}
          >
            <a href={item.href} data-cursor="VIEW" className="work-media group relative block overflow-hidden border border-[#D4A574]/15">
              <img src={item.cover} alt={item.title} className="h-[360px] w-full object-cover grayscale transition duration-700 ease-cinema group-hover:scale-[1.04] group-hover:grayscale-0 md:h-[520px]" />
              <div className="absolute inset-0 bg-[#D4A574]/12 mix-blend-color group-hover:opacity-0" />
            </a>
            <div>
              <div className="mb-2 font-mono text-[112px] font-light leading-none text-white/[0.08]">0{index + 1}</div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#8B95A7]">
                {item.role} / {item.period}
              </p>
              <h3 className="mt-5 text-[38px] font-light leading-tight md:text-[64px]">{item.title}</h3>
              <p className="mt-6 font-serif text-[26px] italic leading-snug text-[#D4A574] md:text-[34px]">"{item.hook}"</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {item.metrics.map((metric) => (
                  <span key={metric} className="border border-[#D4A574]/35 px-4 py-2 font-mono text-[11px] text-[#E8ECF4]/80">
                    {metric}
                  </span>
                ))}
              </div>
              <a href={item.href} data-cursor="OPEN" className="cinema-link mt-10 inline-flex items-center gap-3 text-[13px] uppercase tracking-[0.18em] text-[#D4A574]">
                View Project <ArrowUpRight size={16} />
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </SectionShell>
  );
}

function Thinking() {
  return (
    <SectionShell id="thinking" label="THINKING / 内容输出" title="Ideas that earned attention.">
      <div className="grid gap-12 md:grid-cols-[1.15fr_0.85fr]">
        <div>
          <h3 className="mb-6 font-mono text-[12px] uppercase tracking-[0.24em] text-[#8B95A7]">{content.thinking.articles.title}</h3>
          <div className="columns-1 gap-5 sm:columns-2">
            {content.thinking.articles.items.map((item, index) => (
              <a key={item.thumb} href={item.href} data-cursor="VIEW" className="group mb-5 block break-inside-avoid overflow-hidden border border-white/10">
                <img src={item.thumb} alt={`文章截图 ${index + 1}`} className="w-full grayscale transition duration-700 group-hover:grayscale-0" />
                <span className="block border-t border-white/10 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#D4A574]">View on woshipm</span>
              </a>
            ))}
          </div>
        </div>
        <div className="border-l border-[#D4A574]/18 pl-8">
          <h3 className="mb-7 font-mono text-[12px] uppercase tracking-[0.24em] text-[#8B95A7]">{content.thinking.talks.title}</h3>
          <div className="divide-y divide-white/10">
            {content.thinking.talks.items.map((item) => (
              <a key={item.name} href={item.href} data-cursor="OPEN" className="group flex items-center justify-between gap-8 py-7 text-[22px] font-light leading-snug text-[#E8ECF4]/85">
                {item.name}
                <ArrowUpRight className="shrink-0 text-[#D4A574] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function Capability() {
  const points = useMemo(() => {
    const center = 160;
    const max = 118;
    return content.capability.axes
      .map((axis, index) => {
        const angle = (Math.PI * 2 * index) / content.capability.axes.length - Math.PI / 2;
        const radius = (axis.value / 100) * max;
        return `${center + Math.cos(angle) * radius},${center + Math.sin(angle) * radius}`;
      })
      .join(" ");
  }, []);

  return (
    <SectionShell id="capability" label="CAPABILITY / 能力雷达" title="A PM stack with production scars.">
      <div className="grid gap-12 md:grid-cols-[420px_1fr] md:items-center">
        <motion.svg viewBox="0 0 320 320" className="mx-auto h-[320px] w-[320px] md:h-[420px] md:w-[420px]" initial={{ opacity: 0, scale: 0.78 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}>
          {[40, 78, 118].map((radius) => (
            <polygon key={radius} points={polygonPoints(radius)} fill="none" stroke="rgba(212,165,116,0.18)" strokeWidth="1" />
          ))}
          <line x1="160" y1="42" x2="160" y2="278" stroke="rgba(212,165,116,0.14)" />
          <line x1="48" y1="124" x2="272" y2="196" stroke="rgba(212,165,116,0.14)" />
          <line x1="90" y1="256" x2="230" y2="64" stroke="rgba(212,165,116,0.14)" />
          <motion.polygon points={points} fill="rgba(212,165,116,0.22)" stroke="#D4A574" strokeWidth="2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} />
          <circle cx="160" cy="160" r="3" fill="#D4A574" />
        </motion.svg>
        <div className="divide-y divide-white/10">
          {content.capability.axes.map((axis) => (
            <div key={axis.label} className="grid gap-3 py-5 md:grid-cols-[180px_1fr_54px] md:items-center">
              <div className="text-[18px] text-[#E8ECF4]">{axis.label}</div>
              <div>
                <div className="h-px bg-white/10">
                  <motion.div className="h-px bg-[#D4A574]" initial={{ width: 0 }} whileInView={{ width: `${axis.value}%` }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
                </div>
                <p className="mt-3 text-[14px] leading-relaxed text-[#8B95A7]">{axis.note}</p>
              </div>
              <div className="font-mono text-[18px] text-[#D4A574]">{axis.value}</div>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(content.contact.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section id="contact" className="relative flex min-h-screen items-center px-6 py-28 md:px-16">
      <motion.div className="mx-auto w-full max-w-[1180px] text-center" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <div className="mx-auto mb-10 inline-flex border border-[#D4A574]/45 px-5 py-2 font-mono text-[11px] uppercase tracking-[0.24em] text-[#D4A574] shadow-[0_0_32px_rgba(212,165,116,0.16)] animate-breath">
          {content.contact.status}
        </div>
        <h2 className="mx-auto max-w-[920px] text-[56px] font-light leading-none text-[#D4A574] md:text-[96px]">{content.contact.slogan}</h2>
        <button data-cursor="COPY" onClick={copyEmail} className="mt-12 inline-flex items-center gap-3 text-[25px] font-light text-[#E8ECF4] md:text-[38px]">
          <Mail className="text-[#D4A574]" />
          <AnimatePresence mode="wait">
            <motion.span key={copied ? "copied" : "email"} initial={{ rotateX: -90, opacity: 0 }} animate={{ rotateX: 0, opacity: 1 }} exit={{ rotateX: 90, opacity: 0 }} transition={{ duration: 0.32 }}>
              {copied ? "COPIED ✓" : content.contact.email}
            </motion.span>
          </AnimatePresence>
          <Copy size={18} className="text-[#D4A574]" />
        </button>
        <p className="mt-5 font-mono text-[12px] tracking-[0.18em] text-[#8B95A7]">{content.contact.phone}</p>
      </motion.div>
      <footer className="absolute bottom-6 left-6 right-6 flex flex-col gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#8B95A7] md:flex-row md:items-center md:justify-between md:left-16 md:right-16">
        <span>© 2026 SILAS WANG</span>
        <span>TOKYO · INSPIRED / v1.0 · BUILT WITH CODEX</span>
      </footer>
    </section>
  );
}

function polygonPoints(radius: number) {
  const center = 160;
  return Array.from({ length: 5 })
    .map((_, index) => {
      const angle = (Math.PI * 2 * index) / 5 - Math.PI / 2;
      return `${center + Math.cos(angle) * radius},${center + Math.sin(angle) * radius}`;
    })
    .join(" ");
}
