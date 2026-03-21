"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// mock — replace with real API data
const data = [0, 80, 210, 180, 390, 310, 570, 490, 760, 680, 990, 1280];

const W = 580;
const H = 180;
const PL = 36; // padding left (for y-labels)
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

const fillPath = linePath + ` L ${pts[pts.length-1][0]},${PT + chartH} L ${pts[0][0]},${PT + chartH} Z`;

const yLabels = [0, 0.25, 0.5, 0.75, 1].map(t => ({
  y: PT + chartH * (1 - t),
  label: Math.round(max * t),
}));

export default function PointsHistoryChart() {
  const lineRef = useRef<SVGPathElement>(null);
  const fillRef = useRef<SVGPathElement>(null);
  const dotsRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;
    const len = line.getTotalLength();
    gsap.fromTo(line,
      { strokeDasharray: len, strokeDashoffset: len, opacity: 0 },
      { strokeDashoffset: 0, opacity: 1, duration: 2.2, ease: "power2.inOut" }
    );
    gsap.fromTo(fillRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: 1.5 }
    );
    if (dotsRef.current) {
      gsap.fromTo(dotsRef.current.children,
        { scale: 0, opacity: 0, transformOrigin: "center" },
        { scale: 1, opacity: 1, duration: 0.3, stagger: 0.12, delay: 1.8, ease: "back.out(2.5)" }
      );
    }
  }, []);

  return (
    <div className="rounded-2xl border border-green-400/15 bg-green-400/[0.03] p-5">
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-medium">Points history</p>
          <p className="text-3xl font-bold text-green-400 mt-1">1,280</p>
          <p className="text-xs text-zinc-500 mt-0.5">+36% vs last month</p>
        </div>
        <div className="w-8 h-8 rounded-lg bg-green-400/10 border border-green-400/20 flex items-center justify-center">
          <span className="text-green-400 text-sm">↑</span>
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full overflow-visible">
        <defs>
          <linearGradient id="greenFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(74,222,128,0.25)" />
            <stop offset="100%" stopColor="rgba(74,222,128,0)" />
          </linearGradient>
        </defs>

        {/* grid */}
        {yLabels.map(({ y, label }) => (
          <g key={label}>
            <line x1={PL} y1={y} x2={W - PR} y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            <text x={PL - 4} y={y + 4} fill="rgba(255,255,255,0.2)" fontSize="9" textAnchor="end" fontFamily="monospace">{label}</text>
          </g>
        ))}

        {/* fill */}
        <path ref={fillRef} d={fillPath} fill="url(#greenFill)" opacity={0} />

        {/* line */}
        <path ref={lineRef} d={linePath} fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" />

        {/* dots */}
        <g ref={dotsRef}>
          {pts.map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="5" fill="#0a0a0a" stroke="#4ade80" strokeWidth="2" />
              <circle cx={x} cy={y} r="2" fill="#4ade80" />
            </g>
          ))}
        </g>

        {/* x labels */}
        {pts.map(([x], i) => (
          i % 2 === 0 && (
            <text key={i} x={x} y={H - 2} fill="rgba(255,255,255,0.2)" fontSize="9" textAnchor="middle" fontFamily="monospace">
              {months[i]}
            </text>
          )
        ))}
      </svg>
    </div>
  );
}
