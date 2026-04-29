import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
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
    <div className="animate-fade-up">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-20">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted hover:text-foreground transition-colors duration-300 mb-16"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-300" />
          Back
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1]">
            {post.title}
          </h1>
          <div className="lg:text-right">
            <div className="flex flex-wrap lg:justify-end gap-6 text-xs text-muted uppercase tracking-widest">
              <span>{post.date}</span>
              <span>{post.readTime}</span>
              <span>{post.category}</span>
            </div>
            <p className="mt-4 text-muted leading-relaxed lg:max-w-md lg:ml-auto">
              {post.excerpt}
            </p>
            <div className="mt-6 flex items-center gap-3 lg:justify-end">
              <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-muted text-xs font-medium">
                {post.author.name.charAt(0)}
              </div>
              <span className="text-sm text-muted">{post.author.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-border" />

      {/* CONTENT */}
      <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 py-20">
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
        />
      </div>

      {/* BOTTOM NAV */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-300" />
            All posts
          </Link>
          <Link
            href="/subscribe"
            className="group inline-flex items-center gap-2 text-sm border border-border-light rounded-full px-5 py-2 text-muted hover:text-foreground hover:border-foreground transition-all duration-300"
          >
            Subscribe for more
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
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
