import type { Metadata } from "next";
import Link from "next/link";
import ChatWidget from "@/components/ChatWidget";
import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";

export const metadata: Metadata = {
  title: "Interactive Resume — Robbie Sherre",
  description: "Recruiter-friendly interactive resume with AI Robbie",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors">
        {/* Top Nav */}
        <header className="sticky top-0 z-30 w-full border-b bg-white/80 backdrop-blur dark:bg-gray-900/80 dark:border-gray-800">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-gradient-to-br from-blue-600 to-indigo-600" />
              <span className="font-semibold">Interactive Resume</span>
            </Link>
            <nav className="flex items-center gap-3">
              <Link href="/resume" className="text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Resume
              </Link>
              {/* External or file routes can stay <a> */}
              <a
                href="/api/export/docx"
                className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Download .DOCX
              </a>
              <ThemeToggle />
            </nav>
          </div>
        </header>

        {children}

        <footer className="border-t dark:border-gray-800">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Robbie Sherre • Built with Next.js & Tailwind
          </div>
        </footer>

        <ChatWidget />
      </body>
    </html>
  );
}