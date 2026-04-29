import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { posts } from "@/lib/posts";

export const metadata = {
  title: "Archive — The Neural Notebook",
};

export default function ArchivePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 animate-fade-up">
      <p className="text-xs uppercase tracking-[0.2em] text-muted mb-6">
        Archive
      </p>
      <h1 className="text-4xl sm:text-5xl font-light tracking-tight leading-[1.1] max-w-3xl mb-16">
        Every post, newest first.
      </h1>

      <div className="divide-y divide-border">
        {posts.map((post, i) => (
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
                <h2 className="text-xl sm:text-2xl font-light tracking-tight group-hover:text-muted transition-colors duration-300">
                  {post.title}
                </h2>
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
    </div>
  );
}
