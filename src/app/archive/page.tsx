import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { posts } from "@/lib/posts";

export const metadata = {
  title: "Archive — The Neural Notebook",
};

export default function ArchivePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-2">
        Archive
      </h1>
      <p className="text-muted mb-10">Every post, newest first.</p>

      <div className="space-y-4">
        {posts.map((post) => (
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
                <span className="w-1 h-1 rounded-full bg-muted" />
                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-accent/10 text-accent">
                  {post.category}
                </span>
              </div>
              <h2 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                {post.title}
              </h2>
              <p className="mt-1.5 text-sm text-muted line-clamp-2">
                {post.excerpt}
              </p>
              <div className="mt-3 flex items-center gap-1 text-accent text-sm font-semibold">
                Read <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
