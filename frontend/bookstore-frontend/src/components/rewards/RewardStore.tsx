import Badge from "@/components/ui/Badge";

const rewards = [
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    type: "Limited Edition",
    typeBadge: "yellow" as const,
    pts: 500,
    cover: "🟨",
    desc: "Hardcover signed edition with exclusive foreword. Only 200 copies.",
    available: 14,
  },
  {
    title: "The Pragmatic Programmer",
    author: "Hunt & Thomas",
    type: "Limited Edition",
    typeBadge: "yellow" as const,
    pts: 750,
    cover: "📙",
    desc: "20th Anniversary collector's box set with printed annotations.",
    available: 7,
  },
  {
    title: "Gödel, Escher, Bach",
    author: "Douglas Hofstadter",
    type: "Digital Exclusive",
    typeBadge: "green" as const,
    pts: 300,
    cover: "🟩",
    desc: "Fully interactive e-book with animated diagrams and footnotes.",
    available: 999,
  },
  {
    title: "A Philosophy of Software Design",
    author: "John Ousterhout",
    type: "Digital Exclusive",
    typeBadge: "green" as const,
    pts: 200,
    cover: "📗",
    desc: "Extended digital edition with 5 bonus chapters on complexity.",
    available: 999,
  },
  {
    title: "Designing Data-Intensive Apps",
    author: "Martin Kleppmann",
    type: "Limited Edition",
    typeBadge: "yellow" as const,
    pts: 900,
    cover: "📘",
    desc: "Leather-bound special print with errata corrections. Numbered.",
    available: 3,
  },
  {
    title: "Structures: Or Why Things Don't Fall Down",
    author: "J.E. Gordon",
    type: "Digital Exclusive",
    typeBadge: "green" as const,
    pts: 250,
    cover: "🟦",
    desc: "Annotated digital edition with interactive structural diagrams.",
    available: 999,
  },
];

export default function RewardStore() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex gap-2">
          <button className="px-4 py-1.5 rounded-full bg-white/[0.07] text-white text-sm font-medium">All</button>
          <button className="px-4 py-1.5 rounded-full text-zinc-500 hover:text-zinc-300 text-sm transition-colors border border-white/[0.06]">
            <span className="text-yellow-400">◆</span> Limited
          </button>
          <button className="px-4 py-1.5 rounded-full text-zinc-500 hover:text-zinc-300 text-sm transition-colors border border-white/[0.06]">
            <span className="text-green-400">◆</span> Digital
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rewards.map((r) => (
          <div
            key={r.title}
            className="group rounded-xl border border-white/[0.07] bg-white/[0.02] p-5 hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-200"
          >
            {/* cover placeholder */}
            <div className="w-full h-28 rounded-lg bg-white/[0.04] flex items-center justify-center text-4xl mb-4 border border-white/[0.05]">
              {r.cover}
            </div>

            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <p className="font-semibold text-white text-sm leading-tight">{r.title}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{r.author}</p>
              </div>
              <Badge color={r.typeBadge}>{r.type === "Limited Edition" ? "Limited" : "Digital"}</Badge>
            </div>

            <p className="text-xs text-zinc-600 mb-4 leading-relaxed">{r.desc}</p>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg font-bold text-white">{r.pts}</span>
                <span className="text-xs text-zinc-500 ml-1">pts</span>
                {r.available < 20 && (
                  <p className="text-xs text-red-400 mt-0.5">{r.available} left</p>
                )}
              </div>
              <button className="px-4 py-1.5 rounded-full bg-green-400/10 text-green-400 text-xs font-semibold border border-green-400/20 hover:bg-green-400 hover:text-black transition-all duration-200">
                Redeem
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
