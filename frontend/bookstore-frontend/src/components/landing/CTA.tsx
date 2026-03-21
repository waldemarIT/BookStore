import AnimatedSection from "@/components/ui/AnimatedSection";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <AnimatedSection>
        <div
          className="relative rounded-2xl border overflow-hidden p-12 text-center"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent" />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-green-400/5 blur-3xl pointer-events-none" />

          <p className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: "var(--text-3)" }}>
            Start today
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--text-1)" }}>
            Ready to level up your reading?
          </h2>
          <p className="max-w-md mx-auto mb-8 leading-relaxed" style={{ color: "var(--text-2)" }}>
            Join 120,000+ engineers and builders. Free account, 3 books on us, instant access to the AI feed.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button className="px-8 py-3 rounded-full bg-green-400 text-black font-semibold text-sm hover:bg-green-300 transition-all hover:scale-105">
              Create Free Account
            </button>
            <Link href="/rewards" className="px-8 py-3 rounded-full border text-yellow-400 text-sm font-medium hover:bg-yellow-400/5 transition-all" style={{ borderColor: "rgba(250,204,21,0.3)" }}>
              View Loyalty Program
            </Link>
          </div>
          <p className="mt-5 text-xs" style={{ color: "var(--text-4)" }}>No credit card · Cancel anytime</p>
        </div>
      </AnimatedSection>
    </section>
  );
}
