"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const data = [120, 340, 280, 520, 410, 680, 590, 820, 760, 1050, 940, 1280];

const max = Math.max(...data);
const W = 600;
const H = 160;
const pad = 20;

function toX(i: number) {
  return pad + (i / (data.length - 1)) * (W - pad * 2);
}
function toY(v: number) {
  return H - pad - ((v / max) * (H - pad * 2));
}

const points = data.map((v, i) => [toX(i), toY(v)] as [number, number]);
const pathD =
  "M " +
  points
    .map(([x, y], i) => {
      if (i === 0) return `${x},${y}`;
      const [px, py] = points[i - 1];
      const cx = (px + x) / 2;
      return `C ${cx},${py} ${cx},${y} ${x},${y}`;
    })
    .join(" ");

const fillD =
  pathD + ` L ${points[points.length - 1][0]},${H - pad} L ${points[0][0]},${H - pad} Z`;

export default function PointsChart() {
  const pathRef = useRef<SVGPathElement>(null);
  const dotsRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!pathRef.current) return;
    const len = pathRef.current.getTotalLength();
    gsap.fromTo(
      pathRef.current,
      { strokeDasharray: len, strokeDashoffset: len, opacity: 0 },
      { strokeDashoffset: 0, opacity: 1, duration: 2, ease: "power2.inOut" }
    );
    if (dotsRef.current) {
      gsap.fromTo(
        dotsRef.current.children,
        { scale: 0, opacity: 0, transformOrigin: "center" },
        { scale: 1, opacity: 1, duration: 0.4, stagger: 0.1, delay: 1.5, ease: "back.out(2)" }
      );
    }
  }, []);

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-medium">Points earned</p>
          <p className="text-2xl font-bold text-white mt-1">1,280 pts</p>
          <p className="text-xs text-green-400 mt-0.5">↑ 36% vs last month</p>
        </div>
        <div className="flex gap-2 text-xs">
          <button className="px-3 py-1 rounded-full bg-white/[0.06] text-zinc-300">1Y</button>
          <button className="px-3 py-1 rounded-full text-zinc-500 hover:text-zinc-300 transition-colors">6M</button>
          <button className="px-3 py-1 rounded-full text-zinc-500 hover:text-zinc-300 transition-colors">3M</button>
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ptsFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(74,222,128,0.2)" />
            <stop offset="100%" stopColor="rgba(74,222,128,0)" />
          </linearGradient>
        </defs>

        {/* horizontal grid */}
        {[0, 0.25, 0.5, 0.75, 1].map((t) => {
          const y = pad + t * (H - pad * 2);
          return (
            <g key={t}>
              <line x1={pad} y1={y} x2={W - pad} y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              <text x={0} y={y + 4} fill="rgba(255,255,255,0.2)" fontSize="9" fontFamily="monospace">
                {Math.round(max * (1 - t))}
              </text>
            </g>
          );
        })}

        {/* fill */}
        <path d={fillD} fill="url(#ptsFill)" />

        {/* line */}
        <path
          ref={pathRef}
          d={pathD}
          fill="none"
          stroke="#4ade80"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* dots */}
        <g ref={dotsRef}>
          {points.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3" fill="#4ade80" />
          ))}
        </g>

        {/* x axis labels */}
        {points.map(([x], i) => (
          i % 2 === 0 && (
            <text key={i} x={x} y={H} fill="rgba(255,255,255,0.25)" fontSize="9" textAnchor="middle" fontFamily="monospace">
              {months[i]}
            </text>
          )
        ))}
      </svg>
    </div>
  );
}
