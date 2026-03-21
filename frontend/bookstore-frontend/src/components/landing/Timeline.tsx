"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Organic, hand-crafted paths ───────────────────────────────────────────
// ViewBox: 1200 × 2100
// Both paths start/end near center-x (600).
// Control points are deliberately irregular so crossings look random.

const path1 = `
  M 600,40
  C 720,40  1020,120 1020,290
  C 1020,430 680,490  560,570
  C 380,680  100,760  110,920
  C 120,1060 780,1080 860,1180
  C 960,1300 900,1420 820,1520
  C 720,1640 260,1700 220,1860
  C 200,1960 580,2040 620,2080
`.trim();

const path2 = `
  M 600,40
  C 480,40  160,160  170,350
  C 180,510  740,580  860,680
  C 1040,810 1100,920 1060,1080
  C 1020,1220 400,1260 300,1380
  C 180,1520  120,1660 200,1800
  C 260,1900  820,1940 860,2010
  C 880,2060  640,2090 620,2080
`.trim();

// ─── Frame anchors — picked at visual extremes of each path ────────────────
// These x/y coords match where each path is at its widest swing.
type FrameColor = "green" | "orange" | "yellow" | "red";

const frames: {
  svgX: number; svgY: number;
  side: "left" | "right";
  label: string; sub: string; color: FrameColor;
}[] = [
  { svgX: 1020, svgY: 290,  side: "right", label: "Latest Arrivals",      sub: "New drops every week",            color: "green"  },
  { svgX: 110,  svgY: 920,  side: "left",  label: "Community Events",      sub: "Author talks & meetups",          color: "orange" },
  { svgX: 1060, svgY: 1080, side: "right", label: "Exclusive Collection",  sub: "Limited & digital-only editions", color: "yellow" },
  { svgX: 120,  svgY: 1800, side: "left",  label: "Your Reading Journey",  sub: "Track points & earn rewards",     color: "red"    },
];

// Approximate crossing points (where the two paths visually overlap)
const crossings = [
  { x: 600, y: 40   },
  { x: 490, y: 530  },
  { x: 740, y: 1130 },
  { x: 340, y: 1470 },
  { x: 720, y: 2060 },
];

const VW = 1200;
const VH = 2100;
const FRAME_W = 290;
const FRAME_H = 190;

const colorMap: Record<FrameColor, { border: string; glow: string; text: string; dot: string; bar: string }> = {
  green:  { border: "border-green-400/30",  glow: "rgba(74,222,128,0.18)",  text: "text-green-400",  dot: "#4ade80", bar: "from-green-400/80 to-green-600/10"  },
  orange: { border: "border-orange-400/30", glow: "rgba(251,146,60,0.18)",  text: "text-orange-400", dot: "#fb923c", bar: "from-orange-400/80 to-orange-600/10" },
  yellow: { border: "border-yellow-400/30", glow: "rgba(250,204,21,0.18)",  text: "text-yellow-400", dot: "#facc15", bar: "from-yellow-400/80 to-yellow-600/10" },
  red:    { border: "border-red-400/30",    glow: "rgba(248,113,113,0.18)", text: "text-red-400",     dot: "#f87171", bar: "from-red-400/80 to-red-600/10"     },
};

export default function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const path1Ref   = useRef<SVGPathElement>(null);
  const path2Ref   = useRef<SVGPathElement>(null);
  const framesRef  = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef    = useRef<SVGGElement>(null);

  useEffect(() => {
    const p1 = path1Ref.current;
    const p2 = path2Ref.current;
    if (!p1 || !p2) return;

    const len1 = p1.getTotalLength();
    const len2 = p2.getTotalLength();

    gsap.set(p1, { strokeDasharray: len1, strokeDashoffset: len1 });
    gsap.set(p2, { strokeDasharray: len2, strokeDashoffset: len2 });

    // Scroll-driven line draw
    gsap.to(p1, {
      strokeDashoffset: 0, ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%", end: "bottom 15%", scrub: 1.8,
      },
    });
    gsap.to(p2, {
      strokeDashoffset: 0, ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%", end: "bottom 20%", scrub: 2.4,
      },
    });

    // Crossing dots pop in on scroll
    if (dotsRef.current) {
      gsap.fromTo(dotsRef.current.children,
        { scale: 0, opacity: 0, transformOrigin: "center" },
        {
          scale: 1, opacity: 1, stagger: 0.15, duration: 0.5, ease: "back.out(2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Frames appear on scroll
    framesRef.current.forEach((el) => {
      if (!el) return;
      gsap.fromTo(el,
        { opacity: 0, y: 30, scale: 0.94 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full" style={{ height: `${VH}px` }}>

      {/* section header */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 text-center z-20 pointer-events-none">
        <p className="text-xs text-zinc-500 uppercase tracking-widest font-medium mb-2">Explore</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Everything in one{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">place</span>
        </h2>
      </div>

      {/* ── SVG layer ─────────────────────────────────────────────────────── */}
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <defs>
          <linearGradient id="tlg1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="rgba(74,222,128,0.9)" />
            <stop offset="60%"  stopColor="rgba(74,222,128,0.5)" />
            <stop offset="100%" stopColor="rgba(74,222,128,0.1)" />
          </linearGradient>
          <linearGradient id="tlg2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="rgba(251,146,60,0.9)" />
            <stop offset="60%"  stopColor="rgba(251,146,60,0.5)" />
            <stop offset="100%" stopColor="rgba(251,146,60,0.1)" />
          </linearGradient>
          <filter id="tglow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* path 1 — green */}
        <path
          ref={path1Ref}
          d={path1}
          fill="none"
          stroke="url(#tlg1)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#tglow)"
        />

        {/* path 2 — orange */}
        <path
          ref={path2Ref}
          d={path2}
          fill="none"
          stroke="url(#tlg2)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#tglow)"
        />

        {/* crossing / node indicators */}
        <g ref={dotsRef}>
          {crossings.map((c, i) => (
            <g key={i}>
              <circle cx={c.x} cy={c.y} r={14} fill="rgba(255,255,255,0.02)" />
              <circle cx={c.x} cy={c.y} r={6}  fill="rgba(255,255,255,0.06)" />
              <circle cx={c.x} cy={c.y} r={2.5} fill="rgba(255,255,255,0.55)" />
            </g>
          ))}
        </g>

        {/* peak indicator dots (where frames attach) */}
        {frames.map((f, i) => {
          const c = colorMap[f.color];
          return (
            <g key={i}>
              <circle cx={f.svgX} cy={f.svgY} r={18} fill={`${c.dot}12`} />
              <circle cx={f.svgX} cy={f.svgY} r={8}  fill={`${c.dot}28`} />
              <circle cx={f.svgX} cy={f.svgY} r={3.5} fill={c.dot} />
              {/* dashed connector toward frame */}
              <line
                x1={f.svgX}
                y1={f.svgY}
                x2={f.side === "right" ? f.svgX + 55 : f.svgX - 55}
                y2={f.svgY}
                stroke={`${c.dot}45`}
                strokeWidth="1.2"
                strokeDasharray="4 3"
              />
            </g>
          );
        })}
      </svg>

      {/* ── Media frames ──────────────────────────────────────────────────── */}
      {frames.map((f, i) => {
        const c = colorMap[f.color];
        const isRight = f.side === "right";

        // Convert SVG coords → CSS % of section
        const topPx  = (f.svgY / VH) * 100; // %
        // For left frames: start near left edge; for right: start ~55% from left
        const leftPct = isRight ? 58 : 3;

        return (
          <div
            key={i}
            ref={(el) => { framesRef.current[i] = el; }}
            className="absolute"
            style={{
              top:   `calc(${topPx}% - ${FRAME_H / 2}px)`,
              left:  `${leftPct}%`,
              width: `${FRAME_W}px`,
              zIndex: 20,
            }}
          >
            {/* 3-D wrapper */}
            <div
              className={`relative rounded-2xl border ${c.border} overflow-hidden`}
              style={{
                transform: isRight
                  ? "perspective(800px) rotateY(-14deg) rotateX(5deg)"
                  : "perspective(800px) rotateY(14deg)  rotateX(5deg)",
                transformOrigin: isRight ? "left center" : "right center",
                boxShadow: isRight
                  ? `22px 22px 55px rgba(0,0,0,0.75), -1px -1px 0 rgba(255,255,255,0.05), 0 0 35px ${c.glow}`
                  : `-22px 22px 55px rgba(0,0,0,0.75),  1px -1px 0 rgba(255,255,255,0.05), 0 0 35px ${c.glow}`,
                background: "rgba(8,8,8,0.92)",
                backdropFilter: "blur(16px)",
              }}
            >
              {/* top colour strip */}
              <div className={`h-[2px] w-full bg-gradient-to-r ${c.bar}`} />

              {/* media placeholder */}
              <div
                className="relative w-full flex flex-col items-center justify-center gap-2 overflow-hidden"
                style={{
                  height: `${FRAME_H - 68}px`,
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)",
                }}
              >
                {/* subtle grid */}
                <div
                  className="absolute inset-0 opacity-25"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                  }}
                />

                {/* icon */}
                <div className={`relative z-10 w-9 h-9 rounded-xl border ${c.border} bg-white/[0.03] flex items-center justify-center`}>
                  <svg className={`w-4 h-4 ${c.text} opacity-50`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M13.5 12a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                  </svg>
                </div>
                <p className="relative z-10 text-[10px] text-zinc-700 tracking-wide">Photo / Video</p>

                {/* corner markers */}
                {(["top-2 left-2 border-t border-l","top-2 right-2 border-t border-r","bottom-2 left-2 border-b border-l","bottom-2 right-2 border-b border-r"] as const).map((cls) => (
                  <div key={cls} className={`absolute ${cls} w-3.5 h-3.5 border-white/[0.18]`} />
                ))}
              </div>

              {/* text */}
              <div className="px-4 py-3 border-t border-white/[0.05]">
                <p className={`text-[10px] font-bold uppercase tracking-widest ${c.text} mb-0.5`}>{f.label}</p>
                <p className="text-[11px] text-zinc-500 leading-relaxed">{f.sub}</p>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
