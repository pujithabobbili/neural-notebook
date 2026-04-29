"use client";

import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";

export default function SubscribePage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 animate-fade-up">
      <p className="text-xs uppercase tracking-[0.2em] text-muted mb-6">
        Subscribe
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* LEFT */}
        <div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] mb-6">
            Stay in the loop.
          </h1>
          <p className="text-muted leading-relaxed text-lg max-w-md">
            Get practical insights on data science, ML &amp; AI delivered to
            your inbox. No noise, just signal.
          </p>

          <div className="mt-12 space-y-5">
            {[
              "Practical tutorials with real code",
              "Honest tool & framework reviews",
              "Deep dives into ML systems, RAG & LLMs",
              "Career insights for data scientists",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <div className="mt-0.5 w-5 h-5 rounded-full border border-border-light flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-muted" />
                </div>
                <span className="text-sm text-muted/80">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center">
          {subscribed ? (
            <div>
              <div className="w-12 h-12 rounded-full border border-border-light flex items-center justify-center mb-6">
                <Check className="w-6 h-6 text-foreground" />
              </div>
              <h2 className="text-2xl font-light tracking-tight mb-3">
                You&apos;re in.
              </h2>
              <p className="text-muted leading-relaxed">
                Thanks for subscribing. You&apos;ll hear from me soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs uppercase tracking-widest text-muted mb-3"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-0 py-3 bg-transparent border-0 border-b border-border-light text-foreground placeholder:text-muted/40 focus:outline-none focus:border-foreground transition-colors duration-300 text-lg"
                />
              </div>
              <button
                type="submit"
                className="group inline-flex items-center gap-2 border border-border-light rounded-full px-6 py-3 text-sm text-muted hover:text-foreground hover:border-foreground transition-all duration-300 cursor-pointer"
              >
                Subscribe
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </button>
              <p className="text-xs text-muted/50">
                No spam. Unsubscribe anytime.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
