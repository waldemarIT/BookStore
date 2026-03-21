export default function CurvedLines() {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* large sweeping arcs */}
      <path
        d="M -100 600 Q 200 100 600 400 T 1200 200 T 1600 500"
        fill="none"
        stroke="rgba(255,255,255,0.04)"
        strokeWidth="1.5"
        className="animate-draw"
      />
      <path
        d="M -200 800 Q 300 200 700 500 T 1300 300 T 1700 600"
        fill="none"
        stroke="rgba(255,255,255,0.03)"
        strokeWidth="1"
        className="animate-draw"
        style={{ animationDelay: "0.5s" }}
      />
      <path
        d="M 0 900 Q 400 400 800 650 T 1440 400"
        fill="none"
        stroke="rgba(255,255,255,0.025)"
        strokeWidth="1"
        className="animate-draw"
        style={{ animationDelay: "1s" }}
      />

      {/* green accent curve */}
      <path
        d="M -50 300 Q 200 0 500 200 T 900 150 T 1300 350"
        fill="none"
        stroke="rgba(74,222,128,0.12)"
        strokeWidth="1.5"
        className="animate-draw"
        style={{ animationDelay: "0.3s" }}
      />

      {/* yellow accent */}
      <path
        d="M 700 -50 Q 900 200 800 500 T 900 900"
        fill="none"
        stroke="rgba(250,204,21,0.08)"
        strokeWidth="1"
        className="animate-draw"
        style={{ animationDelay: "0.8s" }}
      />

      {/* small graph-like lines bottom right */}
      <polyline
        points="900,700 960,620 1020,660 1080,580 1140,610 1200,530 1260,560 1320,480 1380,510 1440,440"
        fill="none"
        stroke="rgba(74,222,128,0.2)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <polyline
        points="900,750 960,690 1020,720 1080,650 1140,680 1200,610 1260,640 1320,570 1380,600 1440,530"
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="1"
        strokeLinejoin="round"
      />

      {/* glowing dots */}
      <circle cx="500" cy="200" r="2" fill="rgba(74,222,128,0.5)" className="animate-pulse-glow" />
      <circle cx="800" cy="350" r="1.5" fill="rgba(250,204,21,0.5)" className="animate-pulse-glow" style={{ animationDelay: "1s" }} />
      <circle cx="1100" cy="180" r="2" fill="rgba(255,255,255,0.3)" className="animate-pulse-glow" style={{ animationDelay: "0.5s" }} />
      <circle cx="300" cy="500" r="1.5" fill="rgba(74,222,128,0.4)" className="animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      <circle cx="1250" cy="480" r="2" fill="rgba(74,222,128,0.6)" className="animate-pulse-glow" style={{ animationDelay: "0.7s" }} />

      {/* radial glow top-left */}
      <defs>
        <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(74,222,128,0.08)" />
          <stop offset="100%" stopColor="rgba(74,222,128,0)" />
        </radialGradient>
        <radialGradient id="glow2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(250,204,21,0.06)" />
          <stop offset="100%" stopColor="rgba(250,204,21,0)" />
        </radialGradient>
      </defs>
      <ellipse cx="200" cy="200" rx="300" ry="200" fill="url(#glow1)" />
      <ellipse cx="1200" cy="700" rx="250" ry="180" fill="url(#glow2)" />
    </svg>
  );
}
