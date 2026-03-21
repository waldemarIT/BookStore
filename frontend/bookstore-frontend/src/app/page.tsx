import CurvedLines from "@/components/landing/CurvedLines";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";
import Features from "@/components/landing/Features";
import AIAnnouncements from "@/components/landing/AIAnnouncements";
import Timeline from "@/components/landing/Timeline";
import Categories from "@/components/landing/Categories";
import DiscussionGroups from "@/components/landing/DiscussionGroups";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen t-bg overflow-hidden">
      {/* grid background */}
      <div className="fixed inset-0 grid-bg pointer-events-none" />
      {/* animated curves */}
      <div className="fixed inset-0 pointer-events-none curved-bg opacity-100">
        <CurvedLines />
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Stats />
        <Features />

        {/* AI Announcements */}
        <AIAnnouncements />

        {/* Timeline with media placeholders */}
        <div className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto py-16">
          <Timeline />
        </div>

        <Categories />
        <DiscussionGroups />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}
