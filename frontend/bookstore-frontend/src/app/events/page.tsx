import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CurvedLines from "@/components/landing/CurvedLines";
import EventCard from "@/components/events/EventCard";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Badge from "@/components/ui/Badge";

const events = [
  {
    title: "Building Systems That Last: A Conversation",
    author: "Martin Kleppmann",
    authorRole: "Author · DDIA",
    date: "Apr 5, 2026",
    time: "18:00",
    location: "UNIT.City Hub",
    city: "Kyiv",
    type: "Author Talk" as const,
    tags: ["distributed-systems", "backend", "databases"],
    spots: 80,
    spotsLeft: 6,
    cover: "📘",
  },
  {
    title: "Engineering Reading Circle — April Edition",
    author: "Community Event",
    authorRole: "Open for all engineers",
    date: "Apr 12, 2026",
    time: "14:00",
    location: "The Library Coffee",
    city: "Lviv",
    type: "Community" as const,
    tags: ["community", "discussion", "systems-thinking"],
    spots: 30,
    spotsLeft: 17,
    cover: "☕",
  },
  {
    title: "Workshop: Annotate Like a Senior Engineer",
    author: "Dmytro Kovalenko",
    authorRole: "Staff Eng · Grammarly",
    date: "Apr 19, 2026",
    time: "11:00",
    location: "Projector Institute",
    city: "Kyiv",
    type: "Workshop" as const,
    tags: ["reading", "learning", "productivity"],
    spots: 25,
    spotsLeft: 9,
    cover: "✏️",
  },
  {
    title: "New Drop: Philosophy for Engineers",
    author: "Olena Sydorenko",
    authorRole: "Author · Philosopher",
    date: "Apr 26, 2026",
    time: "17:30",
    location: "Izone Creative Community",
    city: "Kyiv",
    type: "Launch" as const,
    tags: ["philosophy", "logic", "engineering-mind"],
    spots: 60,
    spotsLeft: 31,
    cover: "🧠",
  },
  {
    title: "Rooftop Reads: Infrastructure & Architecture",
    author: "Community Event",
    authorRole: "For infra & platform engineers",
    date: "May 3, 2026",
    time: "16:00",
    location: "Rooftop Bar DF",
    city: "Dnipro",
    type: "Community" as const,
    tags: ["infra", "cloud", "architecture", "outdoor"],
    spots: 40,
    spotsLeft: 22,
    cover: "🏙️",
  },
  {
    title: "The Art of Technical Writing — Live",
    author: "Julia Marchenko",
    authorRole: "Senior Technical Writer · GitLab",
    date: "May 10, 2026",
    time: "12:00",
    location: "Impact Hub",
    city: "Kharkiv",
    type: "Workshop" as const,
    tags: ["writing", "docs", "communication"],
    spots: 35,
    spotsLeft: 3,
    cover: "📝",
  },
];

const communityStats = [
  { value: "2,400+", label: "Community members", color: "text-green-400" },
  { value: "48", label: "Events this year", color: "text-yellow-400" },
  { value: "12", label: "Cities covered", color: "text-white" },
  { value: "31", label: "Author guests", color: "text-red-400" },
];

const spotlightAuthors = [
  { name: "Martin Kleppmann", role: "Distributed Systems", emoji: "📘", tag: "upcoming", tagColor: "yellow" as const },
  { name: "Sandi Metz", role: "OOP & Design Patterns", emoji: "🟣", tag: "Q3 2026", tagColor: "gray" as const },
  { name: "Liz Fong-Jones", role: "Observability & SRE", emoji: "📡", tag: "TBA", tagColor: "gray" as const },
  { name: "Kelsey Hightower", role: "Cloud Native & Kubernetes", emoji: "☁️", tag: "confirmed", tagColor: "green" as const },
];

export default function EventsPage() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0a] overflow-hidden">
      <div className="fixed inset-0 grid-bg pointer-events-none" />
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <CurvedLines />
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 pt-20 pb-12">
          <AnimatedSection className="text-center mb-14">
            <div className="inline-flex items-center gap-2 border border-green-400/20 bg-green-400/5 rounded-full px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-glow" />
              <span className="text-xs text-zinc-400 font-medium tracking-wide uppercase">Community & Events</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
              Where readers{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
                meet IRL
              </span>
            </h1>
            <p className="text-zinc-400 max-w-xl mx-auto text-lg">
              Author talks, community meetups, workshops — in co-working spaces, rooftops, and coffee shops.
              Built for engineers who read.
            </p>
          </AnimatedSection>

          {/* stats */}
          <AnimatedSection delay={0.1} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {communityStats.map((s) => (
              <div key={s.label} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5 text-center">
                <p className={`text-3xl font-bold tracking-tight mb-1 ${s.color}`}>{s.value}</p>
                <p className="text-xs text-zinc-500">{s.label}</p>
              </div>
            ))}
          </AnimatedSection>

          {/* upcoming events */}
          <AnimatedSection className="mb-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-medium mb-1">Schedule</p>
                <h2 className="text-3xl font-bold text-white">Upcoming Events</h2>
              </div>
              <div className="flex gap-2 text-xs">
                {["All", "Author Talk", "Community", "Workshop"].map((f) => (
                  <button
                    key={f}
                    className={`px-3 py-1.5 rounded-full border transition-colors ${
                      f === "All"
                        ? "border-white/10 bg-white/[0.06] text-white"
                        : "border-white/[0.06] text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {events.map((e) => (
                <EventCard key={e.title} event={e} />
              ))}
            </div>
          </AnimatedSection>

          {/* author spotlight */}
          <AnimatedSection className="mb-16">
            <div className="mb-8">
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-medium mb-1">On the radar</p>
              <h2 className="text-3xl font-bold text-white">Author Spotlight</h2>
              <p className="text-zinc-500 text-sm mt-1">Authors confirmed or in talks for upcoming events.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {spotlightAuthors.map((a) => (
                <div
                  key={a.name}
                  className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5 hover:bg-white/[0.04] transition-all hover:border-white/[0.12] text-center group"
                >
                  <div className="w-14 h-14 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-3xl mx-auto mb-3">
                    {a.emoji}
                  </div>
                  <p className="font-semibold text-white text-sm mb-0.5">{a.name}</p>
                  <p className="text-xs text-zinc-500 mb-3">{a.role}</p>
                  <Badge color={a.tagColor}>{a.tag}</Badge>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* community CTA */}
          <AnimatedSection>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-10 relative overflow-hidden">
              {/* glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-green-400/40 to-transparent" />
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-green-400/5 blur-3xl pointer-events-none" />

              <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest font-medium mb-2">Join us</p>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Become part of the community
                  </h2>
                  <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
                    Engineers, designers, scientists — people who think deeply and read widely.
                    Get notified about events near you.
                  </p>
                </div>
                <div className="flex flex-col gap-3 flex-shrink-0">
                  <button className="px-8 py-3 rounded-full bg-green-400 text-black font-semibold text-sm hover:bg-green-300 transition-all hover:scale-105">
                    Join Community
                  </button>
                  <button className="px-8 py-3 rounded-full border border-white/10 text-zinc-300 text-sm hover:border-white/20 hover:text-white hover:bg-white/[0.04] transition-all">
                    Suggest a Venue
                  </button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>

        <Footer />
      </div>
    </main>
  );
}
