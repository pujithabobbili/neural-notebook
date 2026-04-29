import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getFeaturedPost, getLatestPosts } from "@/lib/posts";

export default function Home() {
  const featured = getFeaturedPost();
  const latest = getLatestPosts();
  const allPosts = featured ? [featured, ...latest] : latest;

  return (
    <>
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-20 pb-24 animate-fade-up">
        <p className="text-xs uppercase tracking-[0.2em] text-muted mb-6">
          01 &mdash; Data Science &amp; AI
        </p>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] max-w-4xl">
          Notes, insights &amp;{" "}
          <span className="text-muted">experiments</span> in data science
          and AI.
        </h1>
        <div className="mt-10 flex items-center gap-6">
          <Link
            href="/archive"
            className="group inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors duration-300"
          >
            View all posts
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </Link>
          <Link
            href="/subscribe"
            className="inline-flex items-center gap-2 text-sm border border-border-light rounded-full px-5 py-2 text-muted hover:text-foreground hover:border-foreground transition-all duration-300"
          >
            Subscribe
          </Link>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="border-t border-border" />

      {/* FEATURED POST */}
      {featured && (
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 animate-fade-up-delay-1">
          <div className="flex items-center justify-between mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">
              02 &mdash; Featured
            </p>
            <p className="text-xs text-muted">{featured.date}</p>
          </div>
          <Link href={`/blog/${featured.slug}`} className="group block">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-[1.15] group-hover:text-muted transition-colors duration-500">
                {featured.title}
              </h2>
              <div>
                <p className="text-muted leading-relaxed text-lg">
                  {featured.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-muted/60">
                    {featured.category}
                  </span>
                  <span className="text-xs text-muted/60">
                    {featured.readTime}
                  </span>
                </div>
                <div className="mt-6 inline-flex items-center gap-2 text-sm text-foreground group-hover:gap-3 transition-all duration-300">
                  Read article
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* DIVIDER */}
      <div className="border-t border-border" />

      {/* ALL POSTS */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 animate-fade-up-delay-2">
        <div className="flex items-center justify-between mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            03 &mdash; All Posts
          </p>
          <Link
            href="/archive"
            className="group inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors duration-300"
          >
            See all
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </Link>
        </div>

        <div className="divide-y divide-border">
          {allPosts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <article className="py-8 grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 items-start">
                <div className="sm:col-span-1">
                  <span className="text-xs text-muted/40 font-mono">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="sm:col-span-7">
                  <h3 className="text-xl sm:text-2xl font-light tracking-tight group-hover:text-muted transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted/70 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
                <div className="sm:col-span-2 flex sm:justify-end">
                  <span className="text-xs uppercase tracking-widest text-muted/50">
                    {post.category}
                  </span>
                </div>
                <div className="sm:col-span-2 flex sm:justify-end items-center gap-2">
                  <span className="text-xs text-muted/50">{post.date}</span>
                  <ArrowUpRight className="w-4 h-4 text-muted/30 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* SUBSCRIBE SECTION */}
      <div className="border-t border-border" />
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24 animate-fade-up-delay-3">
        <div className="flex items-center justify-between mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            04 &mdash; Stay Updated
          </p>
        </div>
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight leading-snug">
            Get new posts delivered to your inbox.
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            No spam. Practical insights on data science, ML &amp; AI.
            Unsubscribe anytime.
          </p>
          <Link
            href="/subscribe"
            className="mt-8 inline-flex items-center gap-2 border border-border-light rounded-full px-6 py-3 text-sm text-muted hover:text-foreground hover:border-foreground transition-all duration-300"
          >
            Subscribe
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
