"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { useCartStore } from "@/lib/store/cartStore";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CurvedLines from "@/components/landing/CurvedLines";
import Badge from "@/components/ui/Badge";
import AnimatedSection from "@/components/ui/AnimatedSection";

// Mock exclusive books — буде замінено на реальний API коли будуть дані
const exclusiveBooks = [
  {
    bookId: 101,
    title: "Clean Code: Collector's Edition",
    authors: [{ firstName: "Robert", lastName: "Martin" }],
    genre: "Software Engineering",
    price: 0,
    stockQuantity: 14,
    coverImageUrl: null,
    description: "Hardcover signed by the author with exclusive foreword and hand-numbered certificate. Only 200 copies worldwide.",
    cover: "📘",
    badgeType: "limited" as const,
    badgeLabel: "Signed · #147 of 200",
    requiresTier: "GOLD",
  },
  {
    bookId: 102,
    title: "DDIA: Extended Interactive Edition",
    authors: [{ firstName: "Martin", lastName: "Kleppmann" }],
    genre: "Distributed Systems",
    price: 0,
    stockQuantity: 999,
    coverImageUrl: null,
    description: "Digital-only edition with 4 bonus chapters, interactive diagrams, and embedded exercises. Available exclusively for loyalty members.",
    cover: "🟦",
    badgeType: "digital" as const,
    badgeLabel: "Digital Exclusive",
    requiresTier: "SILVER",
  },
  {
    bookId: 103,
    title: "The Pragmatic Programmer: Box Set",
    authors: [{ firstName: "Hunt", lastName: "& Thomas" }],
    genre: "Software Craft",
    price: 0,
    stockQuantity: 7,
    coverImageUrl: null,
    description: "20th Anniversary collector's box set with printed annotations, postcard set and enamel pin. Numbered.",
    cover: "📙",
    badgeType: "limited" as const,
    badgeLabel: "Collector Box · 7 left",
    requiresTier: "GOLD",
  },
  {
    bookId: 104,
    title: "Gödel, Escher, Bach: Annotated Digital",
    authors: [{ firstName: "Douglas", lastName: "Hofstadter" }],
    genre: "Philosophy & CS",
    price: 0,
    stockQuantity: 999,
    coverImageUrl: null,
    description: "Fully interactive e-book with animated Achilles dialogues, clickable musical analysis and 300+ hyperlinked footnotes.",
    cover: "🟩",
    badgeType: "digital" as const,
    badgeLabel: "Digital Exclusive",
    requiresTier: "BRONZE",
  },
  {
    bookId: 105,
    title: "Philosophy of Software Design: Extended",
    authors: [{ firstName: "John", lastName: "Ousterhout" }],
    genre: "Systems Design",
    price: 0,
    stockQuantity: 999,
    coverImageUrl: null,
    description: "Extended digital edition with 5 bonus chapters on complexity in distributed systems and a personal Q&A with the author.",
    cover: "📗",
    badgeType: "digital" as const,
    badgeLabel: "Digital Exclusive",
    requiresTier: "BRONZE",
  },
  {
    bookId: 106,
    title: "Structures: Premium Illustrated Edition",
    authors: [{ firstName: "J.E.", lastName: "Gordon" }],
    genre: "Engineering",
    price: 0,
    stockQuantity: 23,
    coverImageUrl: null,
    description: "Lavish oversized print with 120 new photographs, detailed structural diagrams and updated materials science appendix.",
    cover: "🏗️",
    badgeType: "limited" as const,
    badgeLabel: "Premium Print",
    requiresTier: "SILVER",
  },
];

const TIER_ORDER = ["BRONZE", "SILVER", "GOLD", "PLATINUM"];
const TIER_COLOR: Record<string, string> = {
  BRONZE: "text-orange-400 border-orange-400/20 bg-orange-400/5",
  SILVER: "text-zinc-300 border-zinc-500/30 bg-zinc-500/5",
  GOLD: "text-yellow-400 border-yellow-400/20 bg-yellow-400/5",
  PLATINUM: "text-cyan-400 border-cyan-400/20 bg-cyan-400/5",
};

export default function ExclusivePage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const { addItem } = useCartStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login?from=/exclusive");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  // Simulate user tier from loyalty (in real app — fetch from /api/users/me)
  const userTier = "GOLD"; // placeholder until real API

  const canAccess = (requiresTier: string) =>
    TIER_ORDER.indexOf(userTier) >= TIER_ORDER.indexOf(requiresTier);

  const limited = exclusiveBooks.filter((b) => b.badgeType === "limited");
  const digital = exclusiveBooks.filter((b) => b.badgeType === "digital");

  return (
    <main className="relative min-h-screen bg-[#0a0a0a] overflow-hidden">
      <div className="fixed inset-0 grid-bg pointer-events-none" />
      <div className="fixed inset-0 pointer-events-none opacity-25">
        <CurvedLines />
      </div>

      <div className="relative z-10">
        <Navbar />

        <section className="max-w-5xl mx-auto px-6 pt-16 pb-20">
          {/* hero */}
          <AnimatedSection className="text-center mb-14">
            <div className="inline-flex items-center gap-2 border border-yellow-400/20 bg-yellow-400/5 rounded-full px-4 py-1.5 mb-6">
              <span className="text-yellow-400">◆</span>
              <span className="text-xs text-zinc-400 font-medium tracking-wide uppercase">Members Only</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
              Exclusive{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                Collection
              </span>
            </h1>
            <p className="text-zinc-400 max-w-xl mx-auto text-lg">
              Limited prints and digital-only editions unavailable anywhere else.
              Access depends on your loyalty tier.
            </p>
          </AnimatedSection>

          {/* tier access info */}
          <AnimatedSection delay={0.1} className="mb-12">
            <div className="flex flex-wrap gap-3 justify-center">
              {TIER_ORDER.map((t) => (
                <div
                  key={t}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold transition-all ${
                    t === userTier ? TIER_COLOR[t] + " scale-105" : "border-white/[0.06] text-zinc-600"
                  }`}
                >
                  {t === userTier && <span>●</span>}
                  {t}
                  {t === userTier && <span>(you)</span>}
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* limited editions */}
          <AnimatedSection className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-yellow-400 text-lg">◆</span>
              <div>
                <h2 className="text-2xl font-bold text-white">Limited Editions</h2>
                <p className="text-sm text-zinc-500">Physical copies — numbered, signed, or boxed. Once gone, gone.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {limited.map((book) => (
                <BookCard
                  key={book.bookId}
                  book={book}
                  accessible={canAccess(book.requiresTier)}
                  onAdd={() =>
                    addItem({
                      bookId: book.bookId,
                      title: book.title,
                      price: book.price,
                      authors: book.authors,
                      genre: book.genre,
                      stockQuantity: book.stockQuantity,
                      isbn: "",
                    } as never)
                  }
                />
              ))}
            </div>
          </AnimatedSection>

          {/* digital exclusives */}
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-green-400 text-lg">◆</span>
              <div>
                <h2 className="text-2xl font-bold text-white">Digital Exclusives</h2>
                <p className="text-sm text-zinc-500">Extended e-books with bonus content, interactive elements and more.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {digital.map((book) => (
                <BookCard
                  key={book.bookId}
                  book={book}
                  accessible={canAccess(book.requiresTier)}
                  onAdd={() =>
                    addItem({
                      bookId: book.bookId,
                      title: book.title,
                      price: book.price,
                      authors: book.authors,
                      genre: book.genre,
                      stockQuantity: book.stockQuantity,
                      isbn: "",
                    } as never)
                  }
                />
              ))}
            </div>
          </AnimatedSection>

          {/* upgrade CTA */}
          <AnimatedSection className="mt-14">
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent" />
              <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">Want more access?</p>
              <h3 className="text-2xl font-bold text-white mb-2">Unlock higher tiers</h3>
              <p className="text-zinc-500 text-sm mb-6 max-w-sm mx-auto">
                Keep reading and buying books to earn points and unlock Platinum-level exclusives.
              </p>
              <Link
                href="/rewards"
                className="inline-block px-7 py-3 rounded-full bg-yellow-400 text-black font-semibold text-sm hover:bg-yellow-300 transition-all hover:scale-105"
              >
                View Rewards Program
              </Link>
            </div>
          </AnimatedSection>
        </section>

        <Footer />
      </div>
    </main>
  );
}

function BookCard({
  book,
  accessible,
  onAdd,
}: {
  book: (typeof exclusiveBooks)[0];
  accessible: boolean;
  onAdd: () => void;
}) {
  return (
    <div
      className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
        accessible
          ? "border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.14]"
          : "border-white/[0.04] bg-white/[0.01] opacity-60"
      }`}
    >
      {/* top bar */}
      <div className={`h-1 w-full ${book.badgeType === "limited" ? "bg-gradient-to-r from-yellow-400/80 to-orange-500/40" : "bg-gradient-to-r from-green-400/80 to-emerald-600/40"}`} />

      <div className="p-5">
        {/* badge */}
        <div className="flex items-center gap-2 mb-4">
          <Badge color={book.badgeType === "limited" ? "yellow" : "green"}>
            {book.badgeType === "limited" ? "◆ Limited" : "◆ Digital"}
          </Badge>
          {!accessible && (
            <Badge color="red">🔒 {book.requiresTier}+</Badge>
          )}
        </div>

        {/* cover */}
        <div className="w-full h-24 rounded-xl bg-white/[0.04] border border-white/[0.05] flex items-center justify-center text-4xl mb-4">
          {book.cover}
        </div>

        <h3 className="font-semibold text-white text-sm leading-snug mb-1">{book.title}</h3>
        <p className="text-xs text-zinc-500 mb-2">
          {book.authors.map((a) => `${a.firstName} ${a.lastName}`).join(", ")}
        </p>
        <p className="text-xs text-zinc-600 leading-relaxed mb-4">{book.description}</p>

        <div className="text-xs text-zinc-500 mb-4 italic">{book.badgeLabel}</div>

        {accessible ? (
          <button
            onClick={onAdd}
            className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${
              book.badgeType === "limited"
                ? "bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 hover:bg-yellow-400 hover:text-black"
                : "bg-green-400/10 text-green-400 border border-green-400/20 hover:bg-green-400 hover:text-black"
            }`}
          >
            {book.badgeType === "limited" ? "Reserve Copy →" : "Get Digital Copy →"}
          </button>
        ) : (
          <Link
            href="/rewards"
            className="w-full py-2.5 rounded-xl text-sm font-medium border border-white/[0.08] text-zinc-600 flex items-center justify-center gap-2 hover:border-white/20 hover:text-zinc-400 transition-all"
          >
            🔒 Unlock with {book.requiresTier} tier
          </Link>
        )}
      </div>
    </div>
  );
}
