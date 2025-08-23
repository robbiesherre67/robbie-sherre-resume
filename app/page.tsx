import resume from "@/data/resume.json";
import type { Resume } from "@/types/resume";
import Link from "next/link";

export default function Home() {
  const r = resume as unknown as Resume;

  return (
    <main className="relative overflow-hidden">
      {/* Soft gradient background (dark-aware) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-16 h-72 w-72 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 blur-3xl dark:from-blue-500/10 dark:to-indigo-500/10" />
        <div className="absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-gradient-to-br from-emerald-400/20 to-blue-400/20 blur-3xl dark:from-emerald-400/10 dark:to-blue-400/10" />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-14 pb-10">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs text-gray-600 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Available for senior front-end roles
            </div>

            <h1 className="mt-4 text-4xl font-bold leading-tight text-gray-900 md:text-5xl dark:text-white">
              {r.name}
            </h1>
            <p className="mt-3 text-lg text-gray-700 dark:text-gray-300">
              {r.title} • {r.location}
            </p>

            <p className="mt-4 max-w-2xl text-gray-700 dark:text-gray-300">
              {r.summary}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/resume"
                className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
              >
                View Interactive Resume
              </Link>
              <Link
                href="/resume/print"
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
                target="_blank"
                rel="noreferrer"
              >
                Print / Save as PDF
              </Link>
              <a
                href="/api/export/docx"
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
              >
                Download .DOCX
              </a>
            </div>

            {/* Animated skill badges */}
            <div className="mt-6 flex flex-wrap gap-2 text-sm">
              {["React", "TypeScript", "Vue 3", "AEM", "Node.js", "AWS", "CI/CD"].map((tag, i) => (
                <span
                  key={tag}
                  className="rounded-full border border-gray-200 bg-white px-3 py-1 text-gray-700 shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 motion-safe:animate-floaty"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl border bg-white p-5 shadow-sm ring-1 ring-black/5 dark:border-gray-800 dark:bg-gray-900">
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Card 1 */}
                <div className="rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
                  <div className="text-xs font-medium text-emerald-600">Impact</div>
                  <div className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">25% ↑ engagement</div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">MyChart Evolution enhancements reduced support calls ~15%.</p>
                </div>
                {/* Card 2 */}
                <div className="rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
                  <div className="text-xs font-medium text-indigo-600">Scale</div>
                  <div className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">500+ sites</div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">WordPress MU & AEM components for healthcare microsites.</p>
                </div>
                {/* Card 3 */}
                <div className="rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
                  <div className="text-xs font-medium text-blue-600">AI</div>
                  <div className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">70% auto-responses</div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Support chatbot with OpenAI; faster first response.</p>
                </div>
                {/* Card 4 */}
                <div className="rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
                  <div className="text-xs font-medium text-rose-600">Delivery</div>
                  <div className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">60% fewer steps</div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Automated CI/CD on AWS with Docker + Jenkins.</p>
                </div>
              </div>
            </div>
            {/* glow under the grid */}
            <div aria-hidden className="absolute -inset-x-6 -bottom-6 h-12 rounded-full bg-blue-500/10 blur-2xl dark:bg-blue-500/5" />
          </div>
        </div>
      </section>

      {/* Feature row */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-xl font-semibold dark:text-white">What recruiters can do here</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
            <div className="text-sm font-semibold">Skim the essentials</div>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">A single, clean resume page that’s ATS-friendly and print-ready.</p>
          </div>
          <div className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
            <div className="text-sm font-semibold">Ask AI Robbie</div>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Chat (bottom-right) to tailor intros or pull role-specific bullets.</p>
          </div>
          <div className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
            <div className="text-sm font-semibold">Export fast</div>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">One-click Print/PDF, plus downloadable Word (.docx).</p>
          </div>
        </div>
      </section>
    </main>
  );
}