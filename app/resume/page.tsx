import resume from "@/data/resume.json";
import type { Resume, Skills } from "@/types/resume";

export default function ResumePage() {
  const r = resume as unknown as Resume;

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{r.name}</h1>
      <div className="text-lg text-gray-700">
        {r.title} • {r.location}
      </div>
      <div className="mt-1 text-gray-700">
        <a href={`mailto:${r.email}`} className="mr-3">
          {r.email}
        </a>
        <span>{r.phone}</span>
        {r.links?.map((l) => (
          <span key={l.label} className="ml-3">
            <a href={l.url} target="_blank" rel="noreferrer">
              {l.label}
            </a>
          </span>
        ))}
      </div>

      <div className="mt-4 flex gap-3 flex-wrap">
        <a href="/resume/print" target="_blank" rel="noreferrer">
          <button className="bg-blue-600 text-white hover:bg-blue-700">
            Download PDF (Print View)
          </button>
        </a>
        <a href="/api/export/docx">
          <button className="bg-green-600 text-white hover:bg-green-700">
            Download MS Word
          </button>
        </a>
      </div>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Professional Summary</h2>
        <p className="mt-1">{r.summary}</p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Areas of Expertise</h2>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          {Object.entries(r.skills as Skills).map(([k, arr]) => (
            <li key={k}>
              <strong className="capitalize">{k.replace(/_/g, " ")}:</strong>{" "}
              {Array.isArray(arr) ? arr.join(", ") : String(arr)}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Professional Experience</h2>
        {r.experience.map((exp) => (
          <article key={exp.company} className="mt-4">
            <h3 className="font-semibold">
              {exp.company}
              {exp.location ? ` — ${exp.location}` : ""}
            </h3>
            {exp.roles.map((role, idx) => (
              <div key={`${exp.company}-${role.title}-${idx}`} className="mt-2">
                <div className="font-medium">
                  {role.title}{" "}
                  <span className="text-gray-600">({role.period})</span>
                </div>
                <ul className="list-disc pl-6 mt-1 space-y-1">
                  {role.highlights.map((h, i) => (
                    <li key={`${role.title}-h-${i}`}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </article>
        ))}
      </section>

      {r.ai_projects?.length ? (
        <section className="mt-6">
          <h2 className="text-xl font-semibold">
            AI &amp; Machine Learning Achievements
          </h2>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            {r.ai_projects.map((p, i) => (
              <li key={`ai-${i}`}>{p}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-6">
        <h2 className="text-xl font-semibold">Education</h2>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          {r.education.map((e, i) => (
            <li key={`edu-${i}`}>
              {e.program} — {e.school} ({e.period})
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
