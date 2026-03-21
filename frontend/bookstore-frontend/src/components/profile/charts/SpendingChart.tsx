"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const months = ["May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const data   = [34, 0, 89, 120, 47, 210, 67, 180];

const W = 580;
const H = 160;
const PL = 40;
const PR = 12;
const PT = 16;
const PB = 28;
const chartW = W - PL - PR;
const chartH = H - PT - PB;
const max = Math.max(...data);
const barW = (chartW / data.length) * 0.55;
const gap  = (chartW / data.length);

function barX(i: number) { return PL + i * gap + (gap - barW) / 2; }
function barH(v: number) { return (v / max) * chartH; }
function barY(v: number) { return PT + chartH - barH(v); }

const yLabels = [0, 0.5, 1].map(t => ({
  y: PT + chartH * (1 - t),
  label: `$${Math.round(max * t)}`,
}));

const total = data.reduce((a, b) => a + b, 0);
const avg   = (total / data.filter(v => v > 0).length).toFixed(0);

export default function SpendingChart() {
  const barsRef = useRef<SVGGElement>(null);
  const avgRef  = useRef<SVGLineElement>(null);

  useEffect(() => {
    if (!barsRef.current) return;
    const rects = barsRef.current.querySelectorAll("rect");
    gsap.fromTo(rects,
      { scaleY: 0, transformOrigin: "bottom" },
      { scaleY: 1, duration: 0.9, stagger: 0.08, ease: "back.out(1.2)", delay: 0.2 }
    );
    gsap.fromTo(avgRef.current,
      { opacity: 0, strokeDashoffset: 600 },
      { opacity: 1, strokeDashoffset: 0, duration: 1.2, delay: 1.2, ease: "power2.out" }
    );
  }, []);

  const avgY = barY(Number(avg));

  return (
    <div className="rounded-2xl border border-orange-400/15 bg-orange-400/[0.03] p-5">
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-medium">Monthly spending</p>
          <p className="text-3xl font-bold text-orange-400 mt-1">${total}</p>
          <p className="text-xs text-zinc-500 mt-0.5">avg ${avg}/month</p>
        </div>
        <div className="w-8 h-8 rounded-lg bg-orange-400/10 border border-orange-400/20 flex items-center justify-center">
          <span className="text-orange-400 text-sm">$</span>
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full overflow-visible">
        <defs>
          <linearGradient id="orangeBar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(251,146,60,0.95)" />
            <stop offset="100%" stopColor="rgba(251,146,60,0.3)" />
          </linearGradient>
        </defs>

        {/* grid */}
        {yLabels.map(({ y, label }) => (
          <g key={label}>
            <line x1={PL} y1={y} x2={W - PR} y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            <text x={PL - 4} y={y + 4} fill="rgba(255,255,255,0.2)" fontSize="9" textAnchor="end" fontFamily="monospace">{label}</text>
          </g>
        ))}

        {/* bars */}
        <g ref={barsRef}>
          {data.map((v, i) => (
            <g key={i}>
              <rect
                x={barX(i)}
                y={barY(v)}
                width={barW}
                height={Math.max(barH(v), 2)}
                rx="4"
                fill={v === 0 ? "rgba(255,255,255,0.05)" : "url(#orangeBar)"}
              />
            </g>
          ))}
        </g>

        {/* average line */}
        <line
          ref={avgRef}
          x1={PL}
          y1={avgY}
          x2={W - PR}
          y2={avgY}
          stroke="rgba(251,146,60,0.4)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <text x={W - PR + 2} y={avgY + 4} fill="rgba(251,146,60,0.5)" fontSize="8" fontFamily="monospace">avg</text>

        {/* x labels */}
        {data.map((_, i) => (
          <text key={i} x={barX(i) + barW / 2} y={H - 2} fill="rgba(255,255,255,0.2)" fontSize="9" textAnchor="middle" fontFamily="monospace">
            {months[i]}
          </text>
        ))}
      </svg>
    </div>
  );
}
