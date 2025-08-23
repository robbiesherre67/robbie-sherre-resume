import resume from "@/data/resume.json";
import type { Resume, Skills } from "@/types/resume";

export const metadata = { title: "Robbie Sherre — Resume (Print)" };

export default function PrintResume() {
  const r = resume as unknown as Resume;

  return (
    <main className="max-w-3xl mx-auto p-6 bg-white text-black">
      <h1 className="text-3xl font-bold">{r.name}</h1>
      <div>
        {r.title} • {r.location}
      </div>
      <div>
        {r.email} • {r.phone}
      </div>

      <hr className="my-4" />

      <h2 className="text-xl font-semibold">Summary</h2>
      <p className="mt-1">{r.summary}</p>

      <h2 className="text-xl font-semibold mt-4">Skills</h2>
      <ul className="list-disc pl-6 mt-2">
        {Object.entries(r.skills as Skills).map(([k, v]) => (
          <li key={k}>
            <strong className="capitalize">{k.replace(/_/g, " ")}:</strong>{" "}
            {Array.isArray(v) ? v.join(", ") : String(v)}
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-4">Experience</h2>
      {r.experience.map((exp) => (
        <section key={exp.company} className="mt-2">
          <strong>
            {exp.company}
            {exp.location ? ` — ${exp.location}` : ""}
          </strong>
          {exp.roles.map((role, i) => (
            <div key={`${exp.company}-${role.title}-${i}`}>
              <em>{role.title}</em> <span>({role.period})</span>
              <ul className="list-disc pl-6 mt-1">
                {role.highlights.map((h, j) => (
                  <li key={`${role.title}-h-${j}`}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}

      {r.ai_projects?.length ? (
        <>
          <h2 className="text-xl font-semibold mt-4">
            AI &amp; Machine Learning Achievements
          </h2>
          <ul className="list-disc pl-6 mt-2">
            {r.ai_projects.map((p, i) => (
              <li key={`ai-${i}`}>{p}</li>
            ))}
          </ul>
        </>
      ) : null}

      <h2 className="text-xl font-semibold mt-4">Education</h2>
      <ul className="list-disc pl-6 mt-2">
        {r.education.map((e, i) => (
          <li key={`edu-${i}`}>
            {e.program} — {e.school} ({e.period})
          </li>
        ))}
      </ul>

      <style>{`
        @media print {
          a, button { display: none; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          ul, section { break-inside: avoid; }
        }
      `}</style>
    </main>
  );
}