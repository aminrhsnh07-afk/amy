"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface NavLink {
  label: string;
  href: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS: NavLink[] = [
  { label: "LinkedIn", href: "#" },
  { label: "Dribbble", href: "#" },
  { label: "Instagram", href: "#" },
];

const BRANDS: string[] = [
  "National Bank",
  "mattered",
  "Coca‑Cola",
  "Adobe",
  "SUBWAY",
  "Codecademy",
];

const SERVICES: ServiceItem[] = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="22" height="16" rx="2" />
        <path d="M9 23h10M14 19v4" />
      </svg>
    ),
    title: "UX & UI",
    description: "Designing interfaces that are intuitive, efficient, and enjoyable to use.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="5" width="14" height="20" rx="2" />
        <rect x="14" y="3" width="11" height="14" rx="2" />
      </svg>
    ),
    title: "Web & Mobile App",
    description: "Transforming ideas into exceptional web and mobile app experiences.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="14" cy="14" r="4" />
        <path d="M14 3v4M14 21v4M3 14h4M21 14h4M6.22 6.22l2.83 2.83M18.95 18.95l2.83 2.83M6.22 21.78l2.83-2.83M18.95 9.05l2.83-2.83" />
      </svg>
    ),
    title: "Design & Creative",
    description: "Crafting visually stunning designs that connect with your audience.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="7,8 3,14 7,20" />
        <polyline points="21,8 25,14 21,20" />
        <line x1="11" y1="5" x2="17" y2="23" />
      </svg>
    ),
    title: "Development",
    description: "Bringing your vision to life with the latest technology and design trends.",
  },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const, delay: i * 0.09 },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7 } },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function Navbar() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("kawsarvu.design@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex items-center justify-between px-6 py-4"
    >
      <div className="flex items-center gap-3">
        <span className="text-[11px] text-neutral-400 tracking-wide font-mono">
          kawsarvu.design@gmail.com
        </span>
        <button
          onClick={handleCopy}
          className="relative px-3 py-1 rounded-full border border-neutral-200 text-[11px] font-medium text-neutral-600 hover:border-neutral-400 hover:text-neutral-900 transition-all duration-200"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={copied ? "copied" : "copy"}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
            >
              {copied ? "Copied!" : "Copy"}
            </motion.span>
          </AnimatePresence>
        </button>
        <a
          href="#"
          className="px-3 py-1 rounded-full border border-neutral-200 text-[11px] font-medium text-neutral-600 hover:border-neutral-400 hover:text-neutral-900 transition-all duration-200"
        >
          CV
        </a>
      </div>

      <div className="flex items-center gap-1 text-[11px] text-neutral-400">
        {NAV_LINKS.map((link, i) => (
          <span key={link.label} className="flex items-center gap-1">
            {i > 0 && <span className="text-neutral-200">/</span>}
            <a
              href={link.href}
              className="hover:text-neutral-900 transition-colors duration-200"
            >
              {link.label}
            </a>
          </span>
        ))}
      </div>
    </motion.nav>
  );
}

function HeroSection() {
  return (
    <section className="relative flex flex-col items-center text-center px-8 pt-10 pb-16 bg-white rounded-3xl mx-4 shadow-sm overflow-hidden">
      {/* Subtle grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Avatar + name badge */}
      <motion.div
        variants={fadeUp}
        custom={0}
        initial="hidden"
        animate="show"
        className="flex items-center gap-3 mb-8"
      >
        <div className="w-11 h-11 rounded-full bg-neutral-200 overflow-hidden ring-2 ring-white shadow-md">
          <div className="w-full h-full bg-gradient-to-br from-neutral-300 to-neutral-500 flex items-center justify-center text-white text-xs font-bold">
            KA
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-neutral-50 border border-neutral-100 rounded-full px-3 py-1.5 shadow-sm">
          <span className="text-[12px] font-medium text-neutral-800">Kawsar Ahmed</span>
          <span className="text-[10px]">👋</span>
        </div>
      </motion.div>

      {/* Headline */}
      <motion.h1
        variants={fadeUp}
        custom={1}
        initial="hidden"
        animate="show"
        className="text-[clamp(2rem,6vw,3.2rem)] font-bold leading-[1.1] tracking-tight text-neutral-900 max-w-[520px]"
        style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
      >
        Building digital products, brands, and experience.
      </motion.h1>

      {/* CTA */}
      <motion.div
        variants={fadeUp}
        custom={2}
        initial="hidden"
        animate="show"
        className="mt-9"
      >
        <motion.a
          href="#"
          whileHover={{ scale: 1.04, backgroundColor: "#1a1a1a" }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 bg-neutral-900 text-white text-[12px] font-medium px-5 py-3 rounded-full shadow-lg transition-colors duration-200"
        >
          Latest Shots
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 10L10 2M10 2H4M10 2v6" />
          </svg>
        </motion.a>
      </motion.div>
    </section>
  );
}

function BrandsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-white rounded-3xl mx-4 px-8 py-8 shadow-sm">
      <motion.div
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
        className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5"
      >
        {BRANDS.map((brand) => (
          <motion.span
            key={brand}
            variants={fadeUp}
            className="text-[13px] font-semibold text-neutral-400 hover:text-neutral-700 transition-colors duration-200 tracking-wide cursor-default select-none"
          >
            {brand}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}

function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-4 py-4">
      <motion.div
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={fadeIn}
        className="text-center mb-10"
      >
        <h2
          className="text-[clamp(1.5rem,4vw,2.2rem)] font-bold text-neutral-900 leading-snug tracking-tight"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          <span className="font-bold">Collaborate</span> with{" "}
          <span className="italic font-normal">brands</span> and{" "}
          <span className="text-neutral-400 font-normal">agencies</span>
          <br />
          to create <span className="italic font-normal">impactful</span> results.
        </h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-4 inline-flex items-center gap-1.5 bg-neutral-100 border border-neutral-200 rounded-full px-4 py-1.5"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
          <span className="text-[11px] font-medium text-neutral-600 tracking-widest uppercase">
            Services
          </span>
        </motion.div>
      </motion.div>

      {/* Service cards */}
      <motion.div
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {SERVICES.map((svc, i) => (
          <motion.div
            key={svc.title}
            variants={fadeUp}
            custom={i}
            whileHover={{ y: -4, boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-neutral-100 transition-shadow duration-200 cursor-default"
          >
            <div className="text-neutral-400 mb-4">{svc.icon}</div>
            <h3 className="text-[13px] font-bold text-neutral-900 mb-1.5">{svc.title}</h3>
            <p className="text-[11.5px] text-neutral-400 leading-relaxed">{svc.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="bg-neutral-50 rounded-3xl mx-4 px-8 py-14 shadow-sm text-center border border-neutral-100"
    >
      {/* Handshake icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mb-6 w-14 h-14 rounded-2xl bg-white shadow-md border border-neutral-100 flex items-center justify-center"
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#1a1a1a" strokeWidth="1.5">
          <path d="M3 16l5-5 3 3 5-5 5 5" />
          <path d="M6 19l3-3M22 9l-3 3" />
          <circle cx="9" cy="19" r="1.5" fill="#1a1a1a" stroke="none" />
        </svg>
      </motion.div>

      <motion.h2
        variants={fadeUp}
        custom={0}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="text-[clamp(1.6rem,4vw,2.4rem)] font-bold leading-tight tracking-tight text-neutral-900"
        style={{ fontFamily: "'Georgia', serif" }}
      >
        Tell me about{" "}
        <span className="italic font-normal">your next</span>
        <br />
        project
      </motion.h2>

      <motion.div
        variants={fadeUp}
        custom={1}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="mt-8 flex items-center justify-center gap-3"
      >
        <motion.a
          href="mailto:kawsarvu.design@gmail.com"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 bg-neutral-900 text-white text-[12px] font-medium px-5 py-3 rounded-full shadow transition-colors duration-200"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="1" y="3" width="11" height="8" rx="1.5" />
            <path d="M1 4l5.5 4L12 4" />
          </svg>
          Email Me
        </motion.a>
        <motion.a
          href="#"
          whileHover={{ scale: 1.04, borderColor: "#1a1a1a", color: "#1a1a1a" }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 bg-white border border-neutral-200 text-neutral-600 text-[12px] font-medium px-5 py-3 rounded-full shadow-sm transition-all duration-200"
        >
          WhatsApp
        </motion.a>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="flex items-center justify-between px-8 py-5 text-[11px] text-neutral-400"
    >
      <span>© 2024 All rights reserved.</span>
      <div className="flex items-center gap-1">
        {NAV_LINKS.map((link, i) => (
          <span key={link.label} className="flex items-center gap-1">
            {i > 0 && <span className="text-neutral-200">/</span>}
            <a href={link.href} className="hover:text-neutral-700 transition-colors duration-200">
              {link.label}
            </a>
          </span>
        ))}
      </div>
    </motion.footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PortfolioPage() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 200], [1, 0.96]);

  return (
    <motion.main
      style={{ opacity: bgOpacity }}
      className="min-h-screen bg-neutral-100 font-sans"
    >
      {/* Top card wrapper */}
      <div className="max-w-3xl mx-auto py-6 space-y-4">
        {/* Navbar */}
        <div className="bg-white rounded-3xl mx-4 shadow-sm overflow-hidden">
          <Navbar />
        </div>

        {/* Hero */}
        <HeroSection />

        {/* Brands */}
        <BrandsSection />

        {/* Services */}
        <ServicesSection />

        {/* Contact */}
        <ContactSection />

        {/* Footer */}
        <Footer />
      </div>
    </motion.main>
  );
}