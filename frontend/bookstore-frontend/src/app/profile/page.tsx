"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { useCartStore } from "@/lib/store/cartStore";
import { authApi, type LoyaltyDto } from "@/lib/api/auth";
import { ordersApi, type Order } from "@/lib/api/orders";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CurvedLines from "@/components/landing/CurvedLines";
import PointsHistoryChart from "@/components/profile/charts/PointsHistoryChart";
import SpendingChart from "@/components/profile/charts/SpendingChart";
import BooksReadChart from "@/components/profile/charts/BooksReadChart";

type Tab = "overview" | "orders" | "cart" | "points";

const TIER_NEXT: Record<string, number> = {
  BRONZE: 500, SILVER: 1500, GOLD: 5000, PLATINUM: 5000,
};
const TIER_COLOR: Record<string, string> = {
  BRONZE: "text-orange-400", SILVER: "text-zinc-300",
  GOLD: "text-yellow-400", PLATINUM: "text-cyan-400",
};
const TIER_LABEL: Record<string, string> = {
  BRONZE: "Junior Dev 🥉", SILVER: "Senior Dev 🥈",
  GOLD: "Tech Lead 🥇", PLATINUM: "Architect 💎",
};
const STATUS_COLOR: Record<string, string> = {
  PENDING: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  CONFIRMED: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  SHIPPED: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  DELIVERED: "text-green-400 bg-green-400/10 border-green-400/20",
  CANCELLED: "text-red-400 bg-red-400/10 border-red-400/20",
};

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { items, removeItem, updateQuantity, totalPrice, totalItems, clearCart } = useCartStore();

  const [tab, setTab] = useState<Tab>("overview");
  const [loyalty, setLoyalty] = useState<LoyaltyDto | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) { router.push("/auth/login?from=/profile"); return; }
    authApi.me().then((d) => setLoyalty(d.loyalty));
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (tab === "orders" && isAuthenticated) {
      setLoadingOrders(true);
      ordersApi.myOrders().then(setOrders).finally(() => setLoadingOrders(false));
    }
  }, [tab, isAuthenticated]);

  if (!user) return null;

  const tier = loyalty?.tierLevel ?? "BRONZE";
  const pts = loyalty?.currentPoints ?? 0;
  const totalPts = loyalty?.totalPoints ?? 0;
  const nextPts = TIER_NEXT[tier];
  const progress = tier === "PLATINUM" ? 100 : Math.min((totalPts / nextPts) * 100, 100);

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "orders", label: "Orders" },
    { id: "cart", label: `Cart (${totalItems()})` },
    { id: "points", label: "Points" },
  ];

  return (
    <main className="relative min-h-screen bg-[#0a0a0a] overflow-hidden">
      <div className="fixed inset-0 grid-bg pointer-events-none" />
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <CurvedLines />
      </div>
      <div className="relative z-10">
        <Navbar />

        <section className="max-w-4xl mx-auto px-6 pt-12 pb-20">
          {/* user header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-black text-xl font-bold">
                {user.firstName[0]}
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">{user.firstName} {user.lastName}</h1>
                <p className="text-sm text-zinc-500">{user.email}</p>
                {loyalty && (
                  <span className={`text-xs font-semibold ${TIER_COLOR[tier]}`}>
                    {TIER_LABEL[tier]}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => { logout(); router.push("/"); }}
              className="text-sm text-zinc-500 hover:text-red-400 transition-colors border border-white/[0.07] hover:border-red-400/30 px-4 py-2 rounded-xl"
            >
              Sign out
            </button>
          </div>

          {/* tabs */}
          <div className="flex gap-1 border-b border-white/[0.06] mb-8">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-4 py-2.5 text-sm font-medium transition-all border-b-2 -mb-px ${
                  tab === t.id
                    ? "text-white border-green-400"
                    : "text-zinc-500 border-transparent hover:text-zinc-300"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* OVERVIEW */}
          {tab === "overview" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Orders placed", value: orders.length || "—", color: "text-white" },
                { label: "Current points", value: pts, color: "text-green-400" },
                { label: "Items in cart", value: totalItems(), color: "text-yellow-400" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                  <p className="text-xs text-zinc-500 mb-2">{s.label}</p>
                  <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
                </div>
              ))}
              <div className="sm:col-span-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                <p className="text-xs text-zinc-500 mb-1">Progress to next tier</p>
                <p className={`text-sm font-semibold mb-3 ${TIER_COLOR[tier]}`}>{TIER_LABEL[tier]}</p>
                <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-green-400 to-yellow-400" style={{ width: `${progress}%` }} />
                </div>
                <p className="text-xs text-zinc-600 mt-1.5">{totalPts} / {nextPts} total points</p>
              </div>
              {/* overview charts */}
              <div className="sm:col-span-3">
                <PointsHistoryChart />
              </div>

              <div className="sm:col-span-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5 flex flex-wrap gap-3">
                <Link href="/exclusive" className="px-5 py-2.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-sm font-medium hover:bg-yellow-400/20 transition-all">
                  ◆ Exclusive Books
                </Link>
                <Link href="/rewards" className="px-5 py-2.5 rounded-full bg-green-400/10 border border-green-400/20 text-green-400 text-sm font-medium hover:bg-green-400/20 transition-all">
                  Rewards Store
                </Link>
                <Link href="/events" className="px-5 py-2.5 rounded-full border border-white/[0.08] text-zinc-300 text-sm font-medium hover:bg-white/[0.04] transition-all">
                  Community Events
                </Link>
              </div>
            </div>
          )}

          {/* ORDERS */}
          {tab === "orders" && (
            <div className="space-y-6">
              {/* charts row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SpendingChart />
                <BooksReadChart />
              </div>

              {loadingOrders && <p className="text-zinc-500 text-sm">Loading orders...</p>}
              {!loadingOrders && orders.length === 0 && (
                <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-10 text-center">
                  <p className="text-zinc-500 mb-4">No orders yet.</p>
                  <Link href="/" className="px-5 py-2.5 rounded-full bg-green-400 text-black text-sm font-semibold hover:bg-green-300 transition-all">
                    Browse Books
                  </Link>
                </div>
              )}
              {orders.map((o) => (
                <div key={o.orderId} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs text-zinc-600 font-mono">#{o.orderId}</p>
                      <p className="text-sm text-zinc-400">{new Date(o.orderDate).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-white font-semibold">${Number(o.totalAmount).toFixed(2)}</span>
                      <span className={`px-2.5 py-0.5 rounded-full border text-xs font-medium ${STATUS_COLOR[o.status]}`}>
                        {o.status}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {o.items.map((i) => (
                      <div key={i.itemId} className="flex items-center justify-between text-sm">
                        <span className="text-zinc-400">{i.bookTitle}</span>
                        <span className="text-zinc-500">x{i.quantity} · ${Number(i.itemTotal).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CART */}
          {tab === "cart" && (
            <div>
              {items.length === 0 ? (
                <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-10 text-center">
                  <p className="text-zinc-500 mb-4">Your cart is empty.</p>
                  <Link href="/" className="px-5 py-2.5 rounded-full bg-green-400 text-black text-sm font-semibold hover:bg-green-300 transition-all">
                    Browse Books
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map(({ book, quantity }) => (
                    <div key={book.bookId} className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/[0.05] flex items-center justify-center text-lg flex-shrink-0">📘</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{book.title}</p>
                        <p className="text-xs text-zinc-500">${book.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(book.bookId, quantity - 1)} className="w-6 h-6 rounded-md bg-white/[0.06] text-zinc-300 hover:bg-white/10 text-sm">−</button>
                        <span className="text-white text-sm w-4 text-center">{quantity}</span>
                        <button onClick={() => updateQuantity(book.bookId, quantity + 1)} className="w-6 h-6 rounded-md bg-white/[0.06] text-zinc-300 hover:bg-white/10 text-sm">+</button>
                      </div>
                      <span className="text-white font-semibold text-sm w-16 text-right">${(book.price * quantity).toFixed(2)}</span>
                      <button onClick={() => removeItem(book.bookId)} className="text-zinc-600 hover:text-red-400 transition-colors text-sm ml-2">✕</button>
                    </div>
                  ))}

                  <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5 flex items-center justify-between">
                    <div>
                      <p className="text-zinc-500 text-sm">{totalItems()} items</p>
                      <p className="text-2xl font-bold text-white">${totalPrice().toFixed(2)}</p>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={clearCart} className="px-4 py-2.5 rounded-xl border border-white/[0.08] text-zinc-400 text-sm hover:text-red-400 hover:border-red-400/20 transition-all">
                        Clear cart
                      </button>
                      <button className="px-6 py-2.5 rounded-xl bg-green-400 text-black text-sm font-semibold hover:bg-green-300 transition-all">
                        Checkout →
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* POINTS */}
          {tab === "points" && (
            <div className="space-y-4">
              {/* points history chart */}
              <PointsHistoryChart />

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-green-400/20 bg-green-400/5 p-5">
                  <p className="text-xs text-zinc-500 mb-1">Available points</p>
                  <p className="text-3xl font-bold text-green-400">{pts}</p>
                </div>
                <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                  <p className="text-xs text-zinc-500 mb-1">Total earned</p>
                  <p className="text-3xl font-bold text-white">{totalPts}</p>
                </div>
              </div>

              <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                <p className="text-xs text-zinc-500 uppercase tracking-widest mb-4">Tier progress</p>
                {[
                  { name: "Junior Dev 🥉", pts: 0, color: "bg-orange-400" },
                  { name: "Senior Dev 🥈", pts: 500, color: "bg-zinc-400" },
                  { name: "Tech Lead 🥇", pts: 1500, color: "bg-yellow-400" },
                  { name: "Architect 💎", pts: 5000, color: "bg-cyan-400" },
                ].map((t) => (
                  <div key={t.name} className="flex items-center gap-3 mb-3">
                    <div className={`w-2 h-2 rounded-full ${totalPts >= t.pts ? t.color : "bg-white/10"}`} />
                    <span className={`text-sm ${totalPts >= t.pts ? "text-white" : "text-zinc-600"}`}>{t.name}</span>
                    <span className="ml-auto text-xs text-zinc-600">{t.pts} pts</span>
                    {totalPts >= t.pts && <span className="text-xs text-green-400">✓</span>}
                  </div>
                ))}
              </div>

              <Link
                href="/rewards"
                className="flex items-center justify-between rounded-xl border border-yellow-400/20 bg-yellow-400/5 p-5 hover:bg-yellow-400/10 transition-all group"
              >
                <div>
                  <p className="text-yellow-400 font-semibold text-sm">Reward Store</p>
                  <p className="text-xs text-zinc-500 mt-0.5">Spend points on limited editions and exclusives</p>
                </div>
                <span className="text-yellow-400 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          )}
        </section>

        <Footer />
      </div>
    </main>
  );
}
