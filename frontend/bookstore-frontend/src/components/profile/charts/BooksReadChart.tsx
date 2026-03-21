"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const months = ["May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const data   = [2, 0, 5, 3, 7, 4, 9, 8];

const W = 580;
const H = 160;
const PL = 36;
const PR = 12;
const PT = 16;
const PB = 28;
const chartW = W - PL - PR;
const chartH = H - PT - PB;
const max = Math.max(...data);

function toX(i: number) { return PL + (i / (data.length - 1)) * chartW; }
function toY(v: number) { return PT + chartH - (v / max) * chartH; }

const pts = data.map((v, i) => [toX(i), toY(v)] as [number, number]);

const linePath = "M " + pts.map(([x, y], i) => {
  if (i === 0) return `${x},${y}`;
  const [px, py] = pts[i - 1];
  const cx = (px + x) / 2;
  return `C ${cx},${py} ${cx},${y} ${x},${y}`;
}).join(" ");

const fillPath = linePath + ` L ${pts[pts.length-1][0]},${PT+chartH} L ${pts[0][0]},${PT+chartH} Z`;

// donut data: order statuses
const statusData = [
  { label: "Delivered", value: 24, color: "#f87171" },
  { label: "Shipped",   value: 8,  color: "#fb923c" },
  { label: "Pending",   value: 4,  color: "#fbbf24" },
  { label: "Cancelled", value: 2,  color: "rgba(255,255,255,0.15)" },
];
const totalOrders = statusData.reduce((a, b) => a + b.value, 0);

function donutSlice(value: number, total: number, offset: number, r: number, cx: number, cy: number) {
  const pct = value / total;
  const circ = 2 * Math.PI * r;
  return { dasharray: `${pct * circ} ${circ}`, dashoffset: -offset * circ };
}

export default function BooksReadChart() {
  const lineRef = useRef<SVGPathElement>(null);
  const fillRef = useRef<SVGPathElement>(null);
  const dotsRef = useRef<SVGGElement>(null);
  const circlesRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;
    const len = line.getTotalLength();
    gsap.fromTo(line,
      { strokeDasharray: len, strokeDashoffset: len, opacity: 0 },
      { strokeDashoffset: 0, opacity: 1, duration: 2, ease: "power2.inOut" }
    );
    gsap.fromTo(fillRef.current, { opacity: 0 }, { opacity: 1, duration: 1, delay: 1.4 });
    if (dotsRef.current) {
      gsap.fromTo(dotsRef.current.children,
        { scale: 0, transformOrigin: "center" },
        { scale: 1, duration: 0.3, stagger: 0.1, delay: 1.6, ease: "back.out(2)" }
      );
    }
    if (circlesRef.current) {
      const circles = Array.from(circlesRef.current.children) as SVGCircleElement[];
      circles.forEach((el, i) => {
        const circ = Number(el.getAttribute("data-circ") ?? 0);
        const offset = Number(el.getAttribute("data-dashoffset") ?? 0);
        gsap.fromTo(el,
          { strokeDashoffset: circ },
          { strokeDashoffset: offset, duration: 1.4, delay: 0.3 + i * 0.2, ease: "power2.out" }
        );
      });
    }
  }, []);

  // donut geometry
  const R = 52;
  const CX = 64;
  const CY = 64;
  const circ = 2 * Math.PI * R;
  let cumOffset = 0;
  const slices = statusData.map((s) => {
    const pct = s.value / totalOrders;
    const da = `${pct * circ} ${circ}`;
    const offset = -(cumOffset * circ);
    cumOffset += pct;
    return { ...s, da, offset };
  });

  return (
    <div className="rounded-2xl border border-red-400/15 bg-red-400/[0.03] p-5">
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-medium">Books purchased</p>
          <p className="text-3xl font-bold text-red-400 mt-1">38</p>
          <p className="text-xs text-zinc-500 mt-0.5">+8 this month</p>
        </div>
        <div className="w-8 h-8 rounded-lg bg-red-400/10 border border-red-400/20 flex items-center justify-center">
          <span className="text-red-400 text-sm">📚</span>
        </div>
      </div>

      {/* line chart */}
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full overflow-visible mb-5">
        <defs>
          <linearGradient id="redFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(248,113,113,0.3)" />
            <stop offset="100%" stopColor="rgba(248,113,113,0)" />
          </linearGradient>
        </defs>
        {[0, 0.5, 1].map(t => {
          const y = PT + chartH * (1 - t);
          return (
            <g key={t}>
              <line x1={PL} y1={y} x2={W-PR} y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              <text x={PL-4} y={y+4} fill="rgba(255,255,255,0.2)" fontSize="9" textAnchor="end" fontFamily="monospace">{Math.round(max * t)}</text>
            </g>
          );
        })}
        <path ref={fillRef} d={fillPath} fill="url(#redFill)" opacity={0} />
        <path ref={lineRef} d={linePath} fill="none" stroke="#f87171" strokeWidth="2.5" strokeLinecap="round" />
        <g ref={dotsRef}>
          {pts.map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="5" fill="#0a0a0a" stroke="#f87171" strokeWidth="2" />
              <circle cx={x} cy={y} r="2" fill="#f87171" />
            </g>
          ))}
        </g>
        {data.map((_, i) => (
          <text key={i} x={toX(i)} y={H-2} fill="rgba(255,255,255,0.2)" fontSize="9" textAnchor="middle" fontFamily="monospace">{months[i]}</text>
        ))}
      </svg>

      {/* donut + legend */}
      <div className="flex items-center gap-6">
        <svg viewBox="0 0 128 128" className="w-28 h-28 flex-shrink-0">
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="18" />
          <g ref={circlesRef}>
            {slices.map((s) => (
              <circle
                key={s.label}
                cx={CX}
                cy={CY}
                r={R}
                fill="none"
                stroke={s.color}
                strokeWidth="18"
                strokeDasharray={s.da}
                strokeDashoffset={s.offset}
                strokeLinecap="butt"
                transform="rotate(-90, 64, 64)"
                data-circ={circ}
                data-dashoffset={s.offset}
              />
            ))}
          </g>
          <text x={CX} y={CY - 6} fill="white" fontSize="18" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">{totalOrders}</text>
          <text x={CX} y={CY + 10} fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle" fontFamily="monospace">orders</text>
        </svg>

        <div className="flex flex-col gap-2">
          {statusData.map((s) => (
            <div key={s.label} className="flex items-center gap-2.5 text-xs">
              <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: s.color }} />
              <span className="text-zinc-400">{s.label}</span>
              <span className="text-zinc-600 ml-auto pl-4">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
