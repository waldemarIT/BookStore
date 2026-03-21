"use client";
import { useThemeStore } from "@/lib/store/themeStore";

export default function ThemeToggle() {
  const { theme, toggle } = useThemeStore();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative w-11 h-6 rounded-full border transition-all duration-300 flex items-center px-0.5 cursor-pointer"
      style={{
        borderColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)",
        background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
      }}
    >
      {/* track icons */}
      <span className="absolute left-1.5 text-[10px] select-none opacity-60">🌙</span>
      <span className="absolute right-1.5 text-[10px] select-none opacity-60">☀️</span>

      {/* thumb */}
      <span
        className="relative z-10 w-4 h-4 rounded-full transition-all duration-300 flex items-center justify-center text-[9px]"
        style={{
          transform: isDark ? "translateX(0)" : "translateX(20px)",
          background: isDark ? "#4ade80" : "#f59e0b",
          boxShadow: isDark ? "0 0 8px rgba(74,222,128,0.5)" : "0 0 8px rgba(245,158,11,0.5)",
        }}
      />
    </button>
  );
}
