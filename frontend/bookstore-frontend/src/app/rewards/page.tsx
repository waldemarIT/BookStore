import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CurvedLines from "@/components/landing/CurvedLines";
import TierCard from "@/components/rewards/TierCard";
import PointsChart from "@/components/rewards/PointsChart";
import RewardStore from "@/components/rewards/RewardStore";
import AnimatedSection from "@/components/ui/AnimatedSection";

const tiers = [
  {
    name: "Junior Dev",
    label: "Bronze",
    points: "0",
    icon: "🥉",
    color: "text-orange-400",
    border: "border-orange-400/20",
    glow: "bg-orange-400/10",
    perks: [
      "5% discount on all orders",
      "Early access to new arrivals",
      "Monthly reading newsletter",
    ],
  },
  {
    name: "Senior Dev",
    label: "Silver",
    points: "500",
    icon: "🥈",
    color: "text-zinc-300",
    border: "border-zinc-500/30",
    glow: "bg-zinc-500/10",
    perks: [
      "10% discount on all orders",
      "Access to digital exclusives",
      "Priority customer support",
      "Invite to online author talks",
    ],
  },
  {
    name: "Tech Lead",
    label: "Gold",
    points: "1,500",
    icon: "🥇",
    color: "text-yellow-400",
    border: "border-yellow-400/30",
    glow: "bg-yellow-400/10",
    perks: [
      "15% discount on all orders",
      "Limited edition book access",
      "In-person event invites",
      "Signed copies priority queue",
      "Quarterly curated reading box",
    ],
  },
  {
    name: "Architect",
    label: "Platinum",
    points: "5,000",
    icon: "💎",
    color: "text-cyan-400",
    border: "border-cyan-400/30",
    glow: "bg-cyan-400/10",
    perks: [
      "20% discount on all orders",
      "All Gold perks included",
      "Private author dinners",
      "Custom book recommendations",
      "Exclusive Platinum merch drop",
      "Beta access to new features",
    ],
  },
];

const howItWorks = [
  { step: "01", title: "Buy books", desc: "Earn 1 point for every $1 spent on any purchase.", icon: "🛒", color: "text-green-400" },
  { step: "02", title: "Stack points", desc: "Points accumulate and unlock higher tier benefits automatically.", icon: "📈", color: "text-yellow-400" },
  { step: "03", title: "Redeem rewards", desc: "Spend points on limited editions, digital exclusives, and more.", icon: "🎁", color: "text-red-400" },
];

export default function RewardsPage() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0a] overflow-hidden">
      <div className="fixed inset-0 grid-bg pointer-events-none" />
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <CurvedLines />
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 pt-20 pb-12">
          <AnimatedSection className="text-center mb-16">
            <div className="inline-flex items-center gap-2 border border-yellow-400/20 bg-yellow-400/5 rounded-full px-4 py-1.5 mb-6">
              <span className="text-yellow-400 text-xs">◆</span>
              <span className="text-xs text-zinc-400 font-medium tracking-wide uppercase">Loyalty Program</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
              Read more.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                Earn more.
              </span>
            </h1>
            <p className="text-zinc-400 max-w-xl mx-auto text-lg">
              Every purchase earns points. Spend them on rare limited editions and digital exclusives
              unavailable anywhere else.
            </p>
          </AnimatedSection>

          {/* user stats bar */}
          <AnimatedSection delay={0.1} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 mb-16">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-black font-bold text-lg">
                  A
                </div>
                <div>
                  <p className="font-semibold text-white">aleksander.koval</p>
                  <p className="text-xs text-zinc-500">Member since Jan 2024</p>
                </div>
                <div className="ml-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-bold">
                  🥇 Tech Lead
                </div>
              </div>

              <div className="flex items-center gap-8 text-center">
                <div>
                  <p className="text-2xl font-bold text-white">1,280</p>
                  <p className="text-xs text-zinc-500">Current points</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <p className="text-2xl font-bold text-white">$847</p>
                  <p className="text-xs text-zinc-500">Total spent</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <p className="text-2xl font-bold text-white">38</p>
                  <p className="text-xs text-zinc-500">Books purchased</p>
                </div>
              </div>
            </div>

            {/* progress to next tier */}
            <div className="mt-6 pt-5 border-t border-white/[0.06]">
              <div className="flex justify-between text-xs text-zinc-500 mb-2">
                <span>Progress to <span className="text-cyan-400 font-medium">Architect</span></span>
                <span>1,280 / 5,000 pts</span>
              </div>
              <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-cyan-400 transition-all"
                  style={{ width: `${(1280 / 5000) * 100}%` }}
                />
              </div>
              <p className="text-xs text-zinc-600 mt-1.5">3,720 points to unlock Architect tier</p>
            </div>
          </AnimatedSection>

          {/* chart */}
          <AnimatedSection delay={0.15} className="mb-16">
            <div className="mb-4">
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-medium mb-1">Activity</p>
              <h2 className="text-2xl font-bold text-white">Your points over time</h2>
            </div>
            <PointsChart />
          </AnimatedSection>

          {/* how it works */}
          <AnimatedSection delay={0.1} className="mb-16">
            <div className="text-center mb-10">
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-medium mb-2">How it works</p>
              <h2 className="text-3xl font-bold text-white">Simple as git commit</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {howItWorks.map((step) => (
                <div key={step.step} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-6 text-center">
                  <div className="text-3xl mb-3">{step.icon}</div>
                  <div className={`text-xs font-bold font-mono mb-2 ${step.color}`}>{step.step}</div>
                  <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-zinc-500">{step.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* tiers */}
          <AnimatedSection className="mb-16">
            <div className="text-center mb-10">
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-medium mb-2">Tiers</p>
              <h2 className="text-3xl font-bold text-white">Level up your library</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {tiers.map((tier) => (
                <TierCard key={tier.name} tier={tier} active={tier.name === "Tech Lead"} />
              ))}
            </div>
          </AnimatedSection>

          {/* reward store */}
          <AnimatedSection>
            <div className="mb-10">
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-medium mb-2">Spend your points</p>
              <h2 className="text-3xl font-bold text-white">Reward Store</h2>
              <p className="text-zinc-500 mt-1 text-sm">Limited editions and digital exclusives. Updated weekly.</p>
            </div>
            <RewardStore />
          </AnimatedSection>
        </section>

        <Footer />
      </div>
    </main>
  );
}
