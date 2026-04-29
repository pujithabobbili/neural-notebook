"use client";

import { useState } from "react";
import { Mail, Sparkles, CheckCircle } from "lucide-react";

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
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 mb-6">
          <Mail className="w-8 h-8 text-accent" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Subscribe to The Neural Notebook
        </h1>
        <p className="mt-4 text-lg text-muted leading-relaxed max-w-md mx-auto">
          Get practical insights on data science, ML &amp; AI delivered to your
          inbox. No spam, unsubscribe anytime.
        </p>
      </div>

      {subscribed ? (
        <div className="mt-10 text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-foreground">
            You&apos;re subscribed!
          </h2>
          <p className="mt-2 text-muted">
            Thanks for joining. You&apos;ll hear from me soon.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-10 space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-white text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all text-base"
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-accent text-white font-semibold text-base hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all cursor-pointer"
          >
            <Sparkles className="w-5 h-5" />
            Subscribe
          </button>
          <p className="text-xs text-center text-muted">
            No spam. Unsubscribe anytime.
          </p>
        </form>
      )}

      <div className="mt-16 rounded-2xl bg-white border border-border p-6">
        <h3 className="font-bold text-foreground mb-3">
          What you&apos;ll get:
        </h3>
        <ul className="space-y-2 text-sm text-muted">
          <li className="flex items-start gap-2">
            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
            Practical tutorials with real code and real data
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
            Honest reviews of tools, frameworks &amp; libraries
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
            Deep dives into ML systems, RAG, LLMs &amp; more
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
            Career insights for growing data scientists
          </li>
        </ul>
      </div>
    </div>
  );
}
