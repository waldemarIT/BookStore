"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { useCartStore } from "@/lib/store/cartStore";
import ThemeToggle from "@/components/ui/ThemeToggle";

const links = [
  { href: "/",         label: "Home" },
  { href: "/exclusive", label: "◆ Exclusive" },
  { href: "/rewards",  label: "Rewards" },
  { href: "/events",   label: "Events" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuthStore();
  const { totalItems } = useCartStore();
  const cartCount = totalItems();

  return (
    <nav
      className="flex items-center justify-between px-8 py-4 border-b sticky top-0 z-50 backdrop-blur-md transition-colors"
      style={{ background: "var(--nav-bg)", borderColor: "var(--border)" }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-md bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0">
          <span className="text-black font-bold text-sm">B</span>
        </div>
        <span className="font-semibold t-text-1 tracking-tight">BookStore Pro</span>
      </Link>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-1 text-sm">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="px-4 py-1.5 rounded-full transition-colors"
            style={{
              color: pathname === l.href ? "var(--text-1)"
                : l.label.startsWith("◆") ? "#facc15"
                : "var(--text-2)",
              background: pathname === l.href ? "var(--card-h)" : "transparent",
            }}
          >
            {l.label}
          </Link>
        ))}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        {/* Theme toggle */}
        <ThemeToggle />

        {/* Cart */}
        <Link href="/profile" className="relative flex items-center gap-1.5 text-sm transition-colors px-2 py-1.5" style={{ color: "var(--text-2)" }}>
          <span>🛒</span>
          {cartCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-green-400 text-black text-[10px] font-bold flex items-center justify-center">
              {cartCount > 9 ? "9+" : cartCount}
            </span>
          )}
        </Link>

        {isAuthenticated && user ? (
          <Link
            href="/profile"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-black text-xs font-bold">
              {user.firstName[0]}
            </div>
            <span className="text-sm hidden sm:block" style={{ color: "var(--text-2)" }}>{user.firstName}</span>
          </Link>
        ) : (
          <>
            <Link href="/auth/login" className="text-sm transition-colors px-3 py-1.5" style={{ color: "var(--text-2)" }}>
              Sign in
            </Link>
            <Link
              href="/auth/register"
              className="text-sm font-medium bg-green-400 text-black px-4 py-1.5 rounded-full hover:bg-green-300 transition-colors"
            >
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
