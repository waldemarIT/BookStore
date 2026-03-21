import Badge from "@/components/ui/Badge";

interface Event {
  title: string;
  author: string;
  authorRole: string;
  date: string;
  time: string;
  location: string;
  city: string;
  type: "Author Talk" | "Community" | "Workshop" | "Launch";
  tags: string[];
  spots: number;
  spotsLeft: number;
  cover: string;
}

const typeColors: Record<Event["type"], "green" | "yellow" | "red" | "blue"> = {
  "Author Talk": "yellow",
  "Community": "green",
  "Workshop": "blue",
  "Launch": "red",
};

export default function EventCard({ event }: { event: Event }) {
  const pct = ((event.spots - event.spotsLeft) / event.spots) * 100;
  const urgent = event.spotsLeft < 10;

  return (
    <div className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden hover:border-white/[0.14] hover:bg-white/[0.04] transition-all duration-300">
      {/* top color bar */}
      <div
        className={`h-1 w-full ${
          event.type === "Author Talk"
            ? "bg-gradient-to-r from-yellow-400/80 to-yellow-600/40"
            : event.type === "Community"
            ? "bg-gradient-to-r from-green-400/80 to-green-600/40"
            : event.type === "Workshop"
            ? "bg-gradient-to-r from-blue-400/80 to-blue-600/40"
            : "bg-gradient-to-r from-red-400/80 to-red-600/40"
        }`}
      />

      <div className="p-5">
        {/* badges */}
        <div className="flex items-center gap-2 mb-4">
          <Badge color={typeColors[event.type]}>{event.type}</Badge>
          {urgent && <Badge color="red">⚡ {event.spotsLeft} spots left</Badge>}
        </div>

        {/* cover + info */}
        <div className="flex gap-4 mb-4">
          <div className="w-14 h-14 rounded-xl bg-white/[0.05] border border-white/[0.06] flex items-center justify-center text-3xl flex-shrink-0">
            {event.cover}
          </div>
          <div>
            <h3 className="font-semibold text-white leading-tight mb-1">{event.title}</h3>
            <p className="text-xs text-zinc-500">{event.author}</p>
            <p className="text-xs text-zinc-600">{event.authorRole}</p>
          </div>
        </div>

        {/* meta */}
        <div className="space-y-1.5 mb-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="text-zinc-600">📅</span>
            <span>{event.date} · {event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-zinc-600">📍</span>
            <span>{event.location}, <span className="text-zinc-400">{event.city}</span></span>
          </div>
        </div>

        {/* tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {event.tags.map((t) => (
            <span key={t} className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-xs text-zinc-500 font-mono">
              #{t}
            </span>
          ))}
        </div>

        {/* capacity */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-zinc-600 mb-1.5">
            <span>Capacity</span>
            <span>{event.spots - event.spotsLeft}/{event.spots}</span>
          </div>
          <div className="w-full h-1 bg-white/[0.05] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${urgent ? "bg-red-400" : "bg-green-400"}`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <button className="w-full py-2.5 rounded-xl border border-white/[0.08] text-sm font-medium text-zinc-300 hover:text-white hover:border-white/20 hover:bg-white/[0.04] transition-all duration-200">
          Register →
        </button>
      </div>
    </div>
  );
}
