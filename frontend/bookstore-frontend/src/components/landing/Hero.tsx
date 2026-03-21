"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Link from "next/link";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".hero-badge", { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
    gsap.fromTo(".hero-h1",   { opacity: 0, y: 28  }, { opacity: 1, y: 0, duration: 0.9, delay: 0.15, ease: "power3.out" });
    gsap.fromTo(".hero-sub",  { opacity: 0, y: 18  }, { opacity: 1, y: 0, duration: 0.7, delay: 0.3,  ease: "power3.out" });
    gsap.fromTo(".hero-tags", { opacity: 0, y: 14  }, { opacity: 1, y: 0, duration: 0.6, delay: 0.42, ease: "power3.out" });
    gsap.fromTo(".hero-btns", { opacity: 0, y: 18  }, { opacity: 1, y: 0, duration: 0.7, delay: 0.52, ease: "power3.out" });
    gsap.fromTo(".hero-card", { opacity: 0, y: 36, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 1, delay: 0.65, ease: "power3.out" });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="flex flex-col items-center text-center px-6 pt-24 pb-20 max-w-5xl mx-auto">

      {/* badge */}
      <div
        className="hero-badge flex items-center gap-2 rounded-full px-4 py-1.5 mb-7 border"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-glow" />
        <span className="text-xs font-medium tracking-wide uppercase" style={{ color: "var(--text-3)" }}>
          Curated for engineers · Updated weekly
        </span>
      </div>

      {/* headline */}
      <h1 className="hero-h1 text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-5" style={{ color: "var(--text-1)" }}>
        Books that make you a{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
          better engineer
        </span>
      </h1>

      <p className="hero-sub text-lg leading-relaxed mb-6 max-w-2xl" style={{ color: "var(--text-2)" }}>
        Curated reads on software systems, AI, distributed computing, philosophy of technology —
        and every tool that matters. Built for developers who think deeply.
      </p>

      {/* topic tags */}
      <div className="hero-tags flex flex-wrap justify-center gap-2 mb-9">
        {["Systems Design","AI / LLMs","DevOps","CS Theory","Philosophy","SRE","Security","Math"].map((t) => (
          <span
            key={t}
            className="px-3 py-1 rounded-full text-xs font-mono border transition-colors"
            style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--text-3)" }}
          >
            #{t.toLowerCase().replace(/[/ ]/g,"-")}
          </span>
        ))}
      </div>

      {/* CTA buttons */}
      <div className="hero-btns flex flex-wrap items-center justify-center gap-3">
        <button className="px-7 py-3 rounded-full bg-green-400 text-black font-semibold text-sm hover:bg-green-300 transition-all hover:scale-105 active:scale-100">
          Browse Catalog
        </button>
        <Link href="/rewards" className="px-7 py-3 rounded-full border text-yellow-400 text-sm font-medium hover:bg-yellow-400/5 transition-all" style={{ borderColor: "rgba(250,204,21,0.3)" }}>
          Loyalty Program ✦
        </Link>
        <Link href="/events" className="px-7 py-3 rounded-full border text-sm font-medium transition-all" style={{ borderColor: "var(--border)", color: "var(--text-2)" }}>
          Events →
        </Link>
      </div>

      {/* terminal card */}
      <div
        className="hero-card mt-16 w-full max-w-3xl mx-auto rounded-2xl border p-6 backdrop-blur-sm animate-float"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        {/* window chrome */}
        <div className="flex items-center gap-2 mb-5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          <span className="ml-3 text-xs font-mono" style={{ color: "var(--text-3)" }}>bookstore-pro ~ dashboard</span>
          <span className="ml-auto text-xs font-mono text-green-400 animate-pulse-glow">● live</span>
        </div>

        {/* mini stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: "Books in catalog", value: "50K+",  delta: "+340 this week", c: "text-green-400" },
            { label: "Active readers",   value: "120K",  delta: "+5% MoM",        c: "text-yellow-400" },
            { label: "AI tools tracked", value: "180+",  delta: "3 new today",    c: "text-red-400" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl p-3 text-left border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="text-xs mb-1" style={{ color: "var(--text-3)" }}>{s.label}</p>
              <p className={`text-xl font-bold ${s.c}`}>{s.value}</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-3)" }}>{s.delta}</p>
            </div>
          ))}
        </div>

        {/* chart */}
        <svg viewBox="0 0 600 90" className="w-full">
          <defs>
            <linearGradient id="heroFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(74,222,128,0.2)" />
              <stop offset="100%" stopColor="rgba(74,222,128,0)" />
            </linearGradient>
          </defs>
          {[20, 50, 80].map((y) => (
            <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          ))}
          <path d="M 0 75 C 60 65, 90 70, 150 45 S 240 10, 300 30 S 400 60, 450 20 S 540 2, 600 12"
            fill="none" stroke="rgba(74,222,128,0.85)" strokeWidth="2" strokeLinecap="round" />
          <path d="M 0 75 C 60 65, 90 70, 150 45 S 240 10, 300 30 S 400 60, 450 20 S 540 2, 600 12 L 600 90 L 0 90 Z"
            fill="url(#heroFill)" />
          {([[150,45],[300,30],[450,20],[600,12]] as [number,number][]).map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="3" fill="#4ade80" />
          ))}
        </svg>
        <div className="flex justify-between mt-2 text-xs font-mono" style={{ color: "var(--text-4)" }}>
          <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
        </div>
      </div>
    </section>
  );
}
