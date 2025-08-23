// Use Node runtime for docx (Buffer)
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import resume from "@/data/resume.json";
import type { Resume } from "@/types/resume";

export async function GET(): Promise<Response> {
  const r = resume as unknown as Resume;
  const children: Paragraph[] = [];

  // Header
  children.push(
    new Paragraph({ text: r.name, heading: HeadingLevel.TITLE }),
    new Paragraph({ text: `${r.title} • ${r.location}` }),
    new Paragraph({ text: `${r.email} • ${r.phone}` }),
    new Paragraph({ text: "" })
  );

  // Summary
  children.push(new Paragraph({ text: "Professional Summary", heading: HeadingLevel.HEADING_1 }));
  children.push(new Paragraph({ text: r.summary }));

  // Skills
  children.push(new Paragraph({ text: "" }));
  children.push(new Paragraph({ text: "Skills", heading: HeadingLevel.HEADING_1 }));
  Object.entries(r.skills).forEach(([k, v]) => {
    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: `${k.replace(/_/g, " ")}: `, bold: true }),
          new TextRun(Array.isArray(v) ? v.join(", ") : String(v)),
        ],
      })
    );
  });

  // Experience
  children.push(new Paragraph({ text: "" }));
  children.push(new Paragraph({ text: "Professional Experience", heading: HeadingLevel.HEADING_1 }));
  r.experience.forEach((exp) => {
    children.push(
      new Paragraph({
        text: `${exp.company}${exp.location ? ` — ${exp.location}` : ""}`,
        heading: HeadingLevel.HEADING_2,
      })
    );
    exp.roles.forEach((role) => {
      children.push(new Paragraph({ text: `${role.title} (${role.period})`, heading: HeadingLevel.HEADING_3 }));
      role.highlights.forEach((h) => children.push(new Paragraph({ text: `• ${h}` })));
    });
  });

  // AI Projects
  if (r.ai_projects?.length) {
    children.push(new Paragraph({ text: "" }));
    children.push(new Paragraph({ text: "AI & Machine Learning Achievements", heading: HeadingLevel.HEADING_1 }));
    r.ai_projects.forEach((h) => children.push(new Paragraph({ text: `• ${h}` })));
  }

  // Education
  if (r.education?.length) {
    children.push(new Paragraph({ text: "" }));
    children.push(new Paragraph({ text: "Education", heading: HeadingLevel.HEADING_1 }));
    r.education.forEach((e) => children.push(new Paragraph({ text: `${e.program} — ${e.school} (${e.period})` })));
  }

  const doc = new Document({ sections: [{ properties: {}, children }] });
  const nodeBuffer = await Packer.toBuffer(doc);
  const uint8 = new Uint8Array(nodeBuffer); // Buffer -> Uint8Array (valid BodyInit)

  return new Response(uint8, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="Robbie-Sherre-Resume.docx"`,
      "Cache-Control": "no-store",
    },
  });
}
