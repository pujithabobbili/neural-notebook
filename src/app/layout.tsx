import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Brain, BookOpen, Archive, Mail } from "lucide-react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Neural Notebook",
  description:
    "Notes, insights & experiments in data science and AI — by Pujitha",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* HEADER */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 group">
              <Brain className="w-7 h-7 text-accent group-hover:rotate-12 transition-transform" />
              <span className="text-lg font-bold tracking-tight text-foreground">
                The Neural Notebook
              </span>
            </Link>
            <nav className="flex items-center gap-1 text-sm font-medium">
              <Link
                href="/"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-muted hover:text-foreground hover:bg-accent/5 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>
              <Link
                href="/archive"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-muted hover:text-foreground hover:bg-accent/5 transition-colors"
              >
                <Archive className="w-4 h-4" />
                <span className="hidden sm:inline">Archive</span>
              </Link>
              <Link
                href="/subscribe"
                className="flex items-center gap-1.5 ml-2 px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent/90 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Subscribe</span>
              </Link>
            </nav>
          </div>
        </header>

        {/* MAIN */}
        <main className="flex-1">{children}</main>

        {/* FOOTER */}
        <footer className="border-t border-border bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-accent" />
                <span className="font-semibold text-foreground">
                  The Neural Notebook
                </span>
              </div>
              <div className="flex items-center gap-6 text-sm text-muted">
                <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                <Link href="/archive" className="hover:text-foreground transition-colors">Archive</Link>
                <Link href="/subscribe" className="hover:text-foreground transition-colors">Subscribe</Link>
              </div>
            </div>
            <p className="mt-6 text-center text-xs text-muted">
              &copy; {new Date().getFullYear()} The Neural Notebook. Built with curiosity and caffeine.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
