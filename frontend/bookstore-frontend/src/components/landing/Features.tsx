import AnimatedSection from "@/components/ui/AnimatedSection";

const features = [
  { icon: "⚡", title: "Instant Delivery",    desc: "Digital books in seconds. No shipping, no waiting.",                               dot: "bg-yellow-400", delay: 0    },
  { icon: "📚", title: "50K+ IT Books",       desc: "Systems, AI, CS theory, philosophy of tech — the reads engineers actually need.",  dot: "bg-green-400",  delay: 0.05 },
  { icon: "🤖", title: "AI Tool Feed",        desc: "Stay up to date with model releases, SDKs and tools from the AI frontier.",        dot: "bg-red-400",    delay: 0.1  },
  { icon: "🏆", title: "Loyalty Rewards",     desc: "Earn points per purchase. Spend on limited editions and digital exclusives.",       dot: "bg-yellow-400", delay: 0.15 },
  { icon: "🧑‍💻", title: "Discussion Groups", desc: "Book clubs for engineers — systems, AI, CS classics and philosophy. Q3 2026.",     dot: "bg-green-400",  delay: 0.2  },
  { icon: "🔒", title: "Secure & Private",    desc: "Encrypted transactions. Your data stays yours. No selling, no tracking.",          dot: "bg-red-400",    delay: 0.25 },
];

export default function Features() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      <AnimatedSection className="text-center mb-12">
        <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: "var(--text-3)" }}>
          Why BookStore Pro
        </p>
        <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "var(--text-1)" }}>
          More than a bookstore.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
            A knowledge hub.
          </span>
        </h2>
      </AnimatedSection>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f) => (
          <AnimatedSection key={f.title} delay={f.delay}>
            <div className="group t-card-hover rounded-xl border p-6 h-full cursor-default">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xl">{f.icon}</span>
                <div className={`w-1.5 h-1.5 rounded-full ${f.dot}`} />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: "var(--text-1)" }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>{f.desc}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
