import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/lib/openai";
import resume from "@/data/resume.json";

const SYSTEM_PROMPT = `
You are "AI Robbie", a concise assistant representing Robbie Sherre.
Use ONLY the provided resume JSON. If asked for info not in it, say you don't have that detail yet.
Prefer bullet points and quantify impact where possible. Keep answers professional and crisp.
`;

export async function POST(req: NextRequest) {
  const { message = "" } = await req.json();
  if (!message.trim()) {
    return NextResponse.json({ reply: "Please enter a question." }, { status: 400 });
  }

  const user = `User Question: ${message}\nResume JSON:\n${JSON.stringify(resume)}`;
  const r = await chat.create({
    model: "gpt-4o-mini",
    temperature: 0.3,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: user }
    ]
  });

  return NextResponse.json({ reply: r.choices[0].message?.content ?? "" });
}
