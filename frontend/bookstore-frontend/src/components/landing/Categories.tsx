import AnimatedSection from "@/components/ui/AnimatedSection";

const categories = [
  { name: "Systems Design",   count: "3,200", color: "green"  },
  { name: "AI / LLMs",        count: "4,800", color: "red"    },
  { name: "Computer Science", count: "6,100", color: "green"  },
  { name: "Mathematics",      count: "3,700", color: "yellow" },
  { name: "Philosophy",       count: "2,500", color: "gray"   },
  { name: "DevOps / SRE",     count: "2,900", color: "orange" },
  { name: "Security",         count: "1,800", color: "red"    },
  { name: "Data Engineering", count: "3,400", color: "green"  },
  { name: "CS Theory",        count: "2,100", color: "yellow" },
  { name: "Biographies",      count: "1,600", color: "gray"   },
];

const colorMap: Record<string, { pill: string }> = {
  green:  { pill: "bg-green-400/10 text-green-400 border-green-400/20 hover:bg-green-400/20"   },
  yellow: { pill: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20 hover:bg-yellow-400/20" },
  red:    { pill: "bg-red-400/10 text-red-400 border-red-400/20 hover:bg-red-400/20"           },
  orange: { pill: "bg-orange-400/10 text-orange-400 border-orange-400/20 hover:bg-orange-400/20" },
  gray:   { pill: "border hover:opacity-80" },
};

export default function Categories() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <AnimatedSection className="flex items-end justify-between mb-10">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: "var(--text-3)" }}>
            Browse by topic
          </p>
          <h2 className="text-3xl font-bold" style={{ color: "var(--text-1)" }}>Popular Categories</h2>
        </div>
        <button className="text-sm text-green-400 hover:text-green-300 transition-colors underline underline-offset-4">
          View all →
        </button>
      </AnimatedSection>

      <AnimatedSection delay={0.1} className="flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat.name}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-all cursor-pointer ${
              cat.color !== "gray" ? colorMap[cat.color].pill : ""
            }`}
            style={
              cat.color === "gray"
                ? { borderColor: "var(--border)", color: "var(--text-2)", background: "var(--card)" }
                : undefined
            }
          >
            <span>{cat.name}</span>
            <span className="text-xs opacity-50">{cat.count}</span>
          </button>
        ))}
      </AnimatedSection>
    </section>
  );
}
