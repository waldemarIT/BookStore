export default function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
            <span className="text-black font-bold text-xs">B</span>
          </div>
          <span className="text-sm font-semibold" style={{ color: "var(--text-2)" }}>BookStore Pro</span>
          <span className="text-xs font-mono px-2 py-0.5 rounded border ml-2" style={{ color: "var(--text-4)", borderColor: "var(--border)" }}>
            for engineers
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs" style={{ color: "var(--text-4)" }}>
          {["Privacy","Terms","Support","AI Feed","Groups"].map((l) => (
            <a key={l} href="#" className="hover:text-green-400 transition-colors">{l}</a>
          ))}
        </div>

        <span className="text-xs" style={{ color: "var(--text-4)" }}>© 2026 BookStore Pro</span>
      </div>
    </footer>
  );
}
