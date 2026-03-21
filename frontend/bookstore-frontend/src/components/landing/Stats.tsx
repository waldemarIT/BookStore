import AnimatedSection from "@/components/ui/AnimatedSection";

const stats = [
  { value: "50K+", label: "Books available",  color: "text-green-400"  },
  { value: "120K", label: "Happy readers",    color: "text-yellow-400" },
  { value: "180+", label: "AI tools tracked", color: "text-red-400"    },
  { value: "4.9★", label: "Average rating",   color: "text-orange-400" },
];

export default function Stats() {
  return (
    <section className="border-y" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
      <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <AnimatedSection key={s.label} delay={i * 0.08}>
            <div className="flex flex-col items-center text-center gap-1">
              <span className={`text-3xl font-bold tracking-tight ${s.color}`}>{s.value}</span>
              <span className="text-sm" style={{ color: "var(--text-3)" }}>{s.label}</span>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
