import AnimatedSection from "@/components/ui/AnimatedSection";
import Badge from "@/components/ui/Badge";

const announcements = [
  {
    company: "Anthropic",
    logo: "🟠",
    title: "Claude 4 Opus — Reasoning at Scale",
    desc: "Anthropic releases Claude 4 Opus with extended thinking, 1M token context and tool-use improvements. Now in public beta.",
    tags: ["Model", "API"],
    tagColors: ["green", "gray"] as const,
    date: "Mar 18, 2026",
    hot: true,
  },
  {
    company: "OpenAI",
    logo: "⚫",
    title: "GPT-5 Multi-modal with native code exec",
    desc: "GPT-5 brings native code execution, image generation and a new voice API in a single unified endpoint.",
    tags: ["Model", "Voice"],
    tagColors: ["green", "yellow"] as const,
    date: "Mar 15, 2026",
    hot: true,
  },
  {
    company: "Cursor",
    logo: "🔵",
    title: "Cursor 1.0 — Background Agents GA",
    desc: "Background agents that run long-horizon tasks autonomously. Works with any repo, any language.",
    tags: ["IDE", "Agents"],
    tagColors: ["blue", "green"] as const,
    date: "Mar 12, 2026",
    hot: false,
  },
  {
    company: "Google DeepMind",
    logo: "🔴",
    title: "Gemini 2.5 Ultra — 2M context window",
    desc: "New flagship with 2M token context, native video understanding and real-time web grounding.",
    tags: ["Model", "Multimodal"],
    tagColors: ["red", "gray"] as const,
    date: "Mar 10, 2026",
    hot: false,
  },
  {
    company: "Mistral",
    logo: "🟡",
    title: "Mistral Large 3 — Open weights, 70B",
    desc: "Open-source release of Mistral Large 3. Apache 2.0 license. Beats GPT-4 on MMLU, available on HuggingFace.",
    tags: ["Open Source", "Model"],
    tagColors: ["yellow", "green"] as const,
    date: "Mar 8, 2026",
    hot: false,
  },
  {
    company: "Vercel",
    logo: "⚪",
    title: "AI SDK 5 — Unified streaming primitives",
    desc: "Vercel AI SDK 5 ships with new streaming hooks, multi-model routing and built-in eval framework for production AI apps.",
    tags: ["SDK", "Framework"],
    tagColors: ["gray", "blue"] as const,
    date: "Mar 6, 2026",
    hot: false,
  },
];

export default function AIAnnouncements() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      <AnimatedSection className="flex items-end justify-between mb-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse-glow" />
            <p className="text-xs font-medium uppercase tracking-widest" style={{ color: "var(--text-3)" }}>
              AI Tools & Announcements
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "var(--text-1)" }}>
            What&apos;s shipping in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">AI</span>
          </h2>
          <p className="text-sm mt-2" style={{ color: "var(--text-3)" }}>
            Tools, models and frameworks worth knowing about.
          </p>
        </div>
        <button className="text-sm text-green-400 hover:text-green-300 transition-colors underline underline-offset-4 flex-shrink-0">
          All announcements →
        </button>
      </AnimatedSection>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {announcements.map((a, i) => (
          <AnimatedSection key={a.title} delay={i * 0.05}>
            <div className="group t-card-hover rounded-xl border p-5 cursor-pointer h-full flex flex-col">
              {/* header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{a.logo}</span>
                  <span className="text-xs font-semibold" style={{ color: "var(--text-3)" }}>{a.company}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {a.hot && (
                    <span className="px-1.5 py-0.5 rounded-md bg-red-400/10 border border-red-400/20 text-red-400 text-[10px] font-bold">
                      HOT
                    </span>
                  )}
                  <span className="text-[10px] font-mono" style={{ color: "var(--text-4)" }}>{a.date}</span>
                </div>
              </div>

              {/* title */}
              <h3 className="font-semibold text-sm leading-snug mb-2" style={{ color: "var(--text-1)" }}>{a.title}</h3>

              {/* desc */}
              <p className="text-xs leading-relaxed flex-1 mb-4" style={{ color: "var(--text-3)" }}>{a.desc}</p>

              {/* tags + link */}
              <div className="flex items-center justify-between">
                <div className="flex gap-1.5">
                  {a.tags.map((t, ti) => (
                    <Badge key={t} color={a.tagColors[ti]}>{t}</Badge>
                  ))}
                </div>
                <span className="text-xs text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Read →
                </span>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
