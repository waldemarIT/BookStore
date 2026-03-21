import AnimatedSection from "@/components/ui/AnimatedSection";

const groups = [
  {
    name: "Systems Design Circle",
    desc: "DDIA, Designing Data-Intensive Applications, and everything about distributed systems.",
    members: 847,
    book: "📘",
    tags: ["#systems", "#distributed", "#databases"],
    color: "border-green-400/20 bg-green-400/[0.03]",
    dot: "bg-green-400",
  },
  {
    name: "AI Builder's Library",
    desc: "Papers, books and tools from the frontier of machine learning and LLM engineering.",
    members: 1240,
    book: "🤖",
    tags: ["#llm", "#ml", "#transformers"],
    color: "border-red-400/20 bg-red-400/[0.03]",
    dot: "bg-red-400",
  },
  {
    name: "Philosophy of Technology",
    desc: "From Heidegger to Turing — reading the thinkers who shaped how we build things.",
    members: 412,
    book: "🧠",
    tags: ["#philosophy", "#ethics", "#hci"],
    color: "border-yellow-400/20 bg-yellow-400/[0.03]",
    dot: "bg-yellow-400",
  },
  {
    name: "CS Classics",
    desc: "SICP, TAOCP, K&R — the foundational texts every serious engineer should have read.",
    members: 631,
    book: "📚",
    tags: ["#cs-theory", "#algorithms", "#compilers"],
    color: "border-orange-400/20 bg-orange-400/[0.03]",
    dot: "bg-orange-400",
  },
];

export default function DiscussionGroups() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <AnimatedSection>
        <div
          className="rounded-2xl border p-10 relative overflow-hidden"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          {/* top glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-green-400/40 to-transparent" />

          {/* coming soon badge */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold border border-yellow-400/30 bg-yellow-400/10 text-yellow-400 uppercase tracking-wide">
                  Coming Soon
                </span>
              </div>
              <h2 className="text-3xl font-bold" style={{ color: "var(--text-1)" }}>
                Discussion Groups
              </h2>
              <p className="text-sm mt-1.5" style={{ color: "var(--text-3)" }}>
                Read together. Think together. Build together. — Groups launching Q3 2026.
              </p>
            </div>

            {/* email signup */}
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="px-4 py-2.5 rounded-xl text-sm border outline-none transition-all focus:border-green-400/50 w-52"
                style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--text-1)" }}
              />
              <button className="px-5 py-2.5 rounded-xl bg-green-400 text-black text-sm font-semibold hover:bg-green-300 transition-all whitespace-nowrap">
                Notify me
              </button>
            </div>
          </div>

          {/* group cards preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {groups.map((g) => (
              <div
                key={g.name}
                className={`relative rounded-xl border p-4 ${g.color} opacity-80`}
              >
                {/* locked overlay */}
                <div className="absolute inset-0 rounded-xl flex items-center justify-center bg-black/5 backdrop-blur-[1px]">
                  <span className="text-xl opacity-30">🔒</span>
                </div>

                <div className="text-2xl mb-3">{g.book}</div>
                <div className="flex items-center gap-1.5 mb-1">
                  <div className={`w-1.5 h-1.5 rounded-full ${g.dot}`} />
                  <span className="font-semibold text-xs" style={{ color: "var(--text-1)" }}>{g.name}</span>
                </div>
                <p className="text-[11px] leading-relaxed mb-3" style={{ color: "var(--text-3)" }}>{g.desc}</p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {g.tags.map((t) => (
                    <span key={t} className="text-[10px] font-mono" style={{ color: "var(--text-4)" }}>{t}</span>
                  ))}
                </div>
                <p className="text-[10px]" style={{ color: "var(--text-4)" }}>{g.members.toLocaleString()} members waiting</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
