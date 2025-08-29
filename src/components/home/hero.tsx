"use client";


import { FeatureCard } from "@/components/ui/FeatureCard";

interface HeroProps {
  onLogin: () => void;
  onSignup: () => void;
}

export default function Hero({ onLogin, onSignup }: HeroProps) {
  return (
    <main className="flex flex-col items-center justify-center px-4 py-20">
      <section className="max-w-2xl text-center">
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-6 leading-tight font-sans">
          Notion + Blog Hybrid
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed font-light">
          Organize your thoughts, write beautiful posts, and share your ideas with the world.
          A seamless blend of productivity and publishing, designed for creators and thinkers.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={onLogin}
            className="px-6 py-3 rounded-lg bg-white/20 hover:bg-white/30 text-white font-medium shadow-lg transition border border-white/30"
          >
            Login
          </button>
          <button
            onClick={onSignup}
            className="px-6 py-3 rounded-lg border border-white/30 text-white hover:bg-white/30 font-medium transition"
          >
            Signup
          </button>
        </div>
      </section>

      <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        <FeatureCard
          title="Notion-like Notes"
          description="Capture ideas, tasks, and plans with a flexible, intuitive editor."
          icon="📝"
        />
        <FeatureCard
          title="Blog Publishing"
          description="Write, edit, and publish posts with beautiful typography and layouts."
          icon="📚"
        />
        <FeatureCard
          title="Dark Mode"
          description="Enjoy a modern, distraction-free experience with a sleek dark theme."
          icon="🌙"
        />
      </section>
    </main>
  );
}
