import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { getPostBySlug, posts } from "@/lib/posts";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </Link>

      <article>
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted mb-4">
            <span>{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-muted" />
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
            <span className="w-1 h-1 rounded-full bg-muted" />
            <span className="flex items-center gap-1">
              <Tag className="w-4 h-4" />
              {post.category}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-muted leading-relaxed">
            {post.excerpt}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm">
              {post.author.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {post.author.name}
              </p>
              <p className="text-xs text-muted">Author</p>
            </div>
          </div>
        </header>

        <hr className="border-border mb-8" />

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
        />
      </article>

      <div className="mt-12 pt-8 border-t border-border">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all posts
        </Link>
      </div>
    </div>
  );
}

function markdownToHtml(md: string): string {
  let html = md.trim();

  // Code blocks
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_match, _lang, code) => {
    return `<pre><code>${escapeHtml(code.trim())}</code></pre>`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Tables
  html = html.replace(
    /\|(.+)\|\n\|[-| ]+\|\n((?:\|.+\|\n?)+)/g,
    (_match, headerRow: string, bodyRows: string) => {
      const headers = headerRow
        .split("|")
        .map((h: string) => h.trim())
        .filter(Boolean);
      const rows = bodyRows
        .trim()
        .split("\n")
        .map((row: string) =>
          row
            .split("|")
            .map((c: string) => c.trim())
            .filter(Boolean)
        );
      let table = "<table><thead><tr>";
      headers.forEach((h: string) => (table += `<th>${h}</th>`));
      table += "</tr></thead><tbody>";
      rows.forEach((row: string[]) => {
        table += "<tr>";
        row.forEach((c: string) => (table += `<td>${c}</td>`));
        table += "</tr>";
      });
      table += "</tbody></table>";
      return table;
    }
  );

  // Headers
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");

  // Bold & italic
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, "<li>$1</li>");
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, "<ul>$1</ul>");

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, "<li>$1</li>");

  // Paragraphs
  html = html
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (
        trimmed.startsWith("<h") ||
        trimmed.startsWith("<ul") ||
        trimmed.startsWith("<ol") ||
        trimmed.startsWith("<pre") ||
        trimmed.startsWith("<table") ||
        trimmed.startsWith("<li")
      ) {
        return trimmed;
      }
      return `<p>${trimmed}</p>`;
    })
    .join("\n");

  // Horizontal rules
  html = html.replace(/^---$/gm, "<hr />");

  return html;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
