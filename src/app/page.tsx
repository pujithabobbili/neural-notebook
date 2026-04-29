import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Sparkles,
  TrendingUp,
  Mail,
  ChevronRight,
} from "lucide-react";
import { getFeaturedPost, getLatestPosts, getTrendingPosts } from "@/lib/posts";

export default function Home() {
  const featured = getFeaturedPost();
  const latest = getLatestPosts();
  const trending = getTrendingPosts();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* HERO */}
      <section className="text-center mb-14">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
          The Neural Notebook
        </h1>
        <p className="mt-3 text-lg text-muted max-w-xl mx-auto">
          Notes, insights &amp; experiments in data science and AI.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT COLUMN — Featured + Latest */}
        <div className="lg:col-span-2 space-y-10">
          {/* FEATURED */}
          {featured && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-accent" />
                <h2 className="text-xs font-bold uppercase tracking-widest text-accent">
                  Featured
                </h2>
              </div>
              <Link href={`/blog/${featured.slug}`} className="group block">
                <article className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/5 via-white to-accent-light/10 border border-border p-6 sm:p-8 hover:shadow-lg hover:shadow-accent/5 transition-all">
                  <div className="flex items-center gap-3 text-xs text-muted mb-3">
                    <span>{featured.date}</span>
                    <span className="w-1 h-1 rounded-full bg-muted" />
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featured.readTime}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground group-hover:text-accent transition-colors leading-snug">
                    {featured.title}
                  </h3>
                  <p className="mt-3 text-muted leading-relaxed">
                    {featured.excerpt}
                  </p>
                  <div className="mt-5 flex items-center gap-1 text-accent text-sm font-semibold">
                    Read more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <span className="inline-block mt-4 px-3 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent">
                    {featured.category}
                  </span>
                </article>
              </Link>
            </section>
          )}

          {/* LATEST */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted mb-5">
              The Latest
            </h2>
            <div className="space-y-4">
              {latest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <article className="rounded-xl bg-white border border-border p-5 sm:p-6 hover:shadow-md hover:border-accent/30 transition-all">
                    <div className="flex items-center gap-3 text-xs text-muted mb-2">
                      <span>{post.date}</span>
                      <span className="w-1 h-1 rounded-full bg-muted" />
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted line-clamp-2">
                      {post.excerpt}
                    </p>
                    <span className="inline-block mt-3 px-2.5 py-0.5 text-xs font-medium rounded-full bg-accent/10 text-accent">
                      {post.category}
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="space-y-8">
          {/* TRENDING */}
          <div className="rounded-2xl bg-white border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-accent" />
              <h2 className="text-xs font-bold uppercase tracking-widest text-accent">
                Trending
              </h2>
            </div>
            <ul className="space-y-4">
              {trending.map((post, i) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex gap-3"
                  >
                    <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-accent/10 text-accent text-xs font-bold">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <span className="text-xs text-muted">{post.readTime}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SUBSCRIBE CTA */}
          <div className="rounded-2xl bg-gradient-to-br from-accent to-accent-light p-6 text-white">
            <Mail className="w-8 h-8 mb-3 opacity-80" />
            <h2 className="text-lg font-bold">Stay in the loop</h2>
            <p className="mt-1 text-sm text-white/80 leading-relaxed">
              Get new posts on data science, ML &amp; AI delivered straight to
              your inbox.
            </p>
            <Link
              href="/subscribe"
              className="mt-4 inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-white text-accent font-semibold text-sm hover:bg-white/90 transition-colors"
            >
              Subscribe <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* ABOUT */}
          <div className="rounded-2xl bg-white border border-border p-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted mb-3">
              About
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              Hi, I&apos;m <strong className="text-foreground">Pujitha</strong>
              &nbsp;&mdash; a data scientist exploring the intersection of ML,
              AI, and real-world impact. This blog is where I share what I learn.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
