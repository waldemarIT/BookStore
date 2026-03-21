interface TierCardProps {
  tier: {
    name: string;
    label: string;
    points: string;
    color: string;
    border: string;
    glow: string;
    perks: string[];
    icon: string;
  };
  active?: boolean;
}

export default function TierCard({ tier, active }: TierCardProps) {
  return (
    <div
      className={`relative rounded-2xl border p-6 transition-all duration-300 ${tier.border} ${
        active ? "bg-white/[0.05] scale-[1.02]" : "bg-white/[0.02] hover:bg-white/[0.04]"
      }`}
    >
      {active && (
        <div className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-semibold ${tier.color} bg-white/10`}>
          CURRENT
        </div>
      )}

      {/* icon + glow */}
      <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${tier.glow}`}>
        <span className="text-2xl">{tier.icon}</span>
      </div>

      <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${tier.color}`}>
        {tier.name}
      </div>
      <div className="text-lg font-bold text-white mb-1">{tier.label}</div>
      <div className="text-xs text-zinc-500 mb-5">{tier.points} points to unlock</div>

      <ul className="space-y-2">
        {tier.perks.map((perk) => (
          <li key={perk} className="flex items-start gap-2 text-sm text-zinc-400">
            <span className={`mt-0.5 text-xs ${tier.color}`}>✓</span>
            {perk}
          </li>
        ))}
      </ul>
    </div>
  );
}
