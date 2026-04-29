import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Analytics from "@/components/Analytics";
import SocialIcons from "@/components/SocialIcons";
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
    "Notes, insights & experiments in data science and AI — by Pujitha Bobbili",
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
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Analytics />
        {/* HEADER */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between h-16">
            <Link
              href="/"
              className="text-sm font-medium tracking-wide uppercase text-foreground hover:text-muted transition-colors duration-300"
            >
              The Neural Notebook
            </Link>
            <nav className="flex items-center gap-8 text-sm">
              <Link
                href="/"
                className="text-muted hover:text-foreground transition-colors duration-300"
              >
                Home
              </Link>
              <Link
                href="/archive"
                className="text-muted hover:text-foreground transition-colors duration-300"
              >
                Archive
              </Link>
              <Link
                href="/subscribe"
                className="text-muted hover:text-foreground transition-colors duration-300"
              >
                Subscribe
              </Link>
            </nav>
          </div>
        </header>

        {/* SPACER */}
        <div className="h-16" />

        {/* MAIN */}
        <main className="flex-1">{children}</main>

        {/* FOOTER */}
        <footer className="border-t border-border">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted mb-4">
                  The Neural Notebook
                </p>
                <p className="text-sm text-muted/70 leading-relaxed">
                  Notes, insights &amp; experiments in data science and AI.
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted mb-4">
                  Pages
                </p>
                <div className="flex flex-col gap-2.5 text-sm">
                  <Link href="/" className="text-muted/70 hover:text-foreground transition-colors duration-300">Home</Link>
                  <Link href="/archive" className="text-muted/70 hover:text-foreground transition-colors duration-300">Archive</Link>
                  <Link href="/subscribe" className="text-muted/70 hover:text-foreground transition-colors duration-300">Subscribe</Link>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted mb-4">
                  Connect
                </p>
                <SocialIcons size="md" />
              </div>
            </div>
            <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-muted/50">
                &copy; {new Date().getFullYear()} The Neural Notebook
              </p>
              <p className="text-xs text-muted/50">
                Built with Next.js
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
