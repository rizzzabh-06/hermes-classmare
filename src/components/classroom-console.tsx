"use client";

import { FormEvent, useMemo, useState } from "react";
import { answers, students as seededStudents } from "@/data/demo";
import {
  assessmentPlanSchema,
  createAssessmentDraft,
  studentProfileSchema,
  submissionInputSchema,
  type AssessmentDraftContract,
  type AssessmentPlanInput,
  type StudentProfileInput,
} from "@/lib/input-engine";
import { runDemoWorkflow } from "@/lib/workflow";

type View = "overview" | "plan" | "students" | "responses";
type Notice = { type: "success" | "error"; text: string } | null;

const workflow = runDemoWorkflow();
const initialPlan: AssessmentPlanInput = {
  title: "Quadrilaterals Diagnostic",
  className: "Grade 8 · Section A",
  board: "CBSE" as const,
  grade: 8,
  subject: "Mathematics",
  chapter: "Understanding Quadrilaterals",
  concepts: ["Angle sum property", "Parallelogram properties"],
  bloomLevels: ["understand", "apply"],
  questionCount: 5,
  totalMarks: 20,
  durationMinutes: 35,
  objectiveRatio: 40,
  instructions: "Show all reasoning for subjective questions.",
};

const navItems: Array<{ id: View; label: string; icon: string }> = [
  { id: "overview", label: "Command centre", icon: "⌂" },
  { id: "plan", label: "Test plan", icon: "✦" },
  { id: "students", label: "Students", icon: "◎" },
  { id: "responses", label: "Response inbox", icon: "↳" },
];

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-black">
      <span>{label}</span>
      {children}
      {hint && <span className="text-xs font-bold text-neutral-500">{hint}</span>}
    </label>
  );
}

const inputClass =
  "w-full border-2 border-[#18201b] bg-white px-3 py-2.5 font-bold outline-none transition focus:-translate-y-0.5 focus:shadow-[3px_3px_0_#18201b]";

function NoticeBanner({ notice }: { notice: Notice }) {
  if (!notice) return null;
  return (
    <div
      role="status"
      className={`border-2 border-[#18201b] px-4 py-3 font-black shadow-[3px_3px_0_#18201b] ${
        notice.type === "success" ? "bg-[#baf3cc]" : "bg-[#ffb4ab]"
      }`}
    >
      {notice.text}
    </div>
  );
}

export function ClassroomConsole() {
  const [view, setView] = useState<View>("overview");
  const [notice, setNotice] = useState<Notice>(null);
  const [plans, setPlans] = useState<AssessmentDraftContract[]>([createAssessmentDraft(initialPlan)]);
  const [studentProfiles, setStudentProfiles] = useState<StudentProfileInput[]>(
    seededStudents.map((student, index) => ({
      name: student.name,
      rollNumber: student.rollNumber,
      className: "Grade 8 · Section A",
      supportNeeds: index === 2 ? ["Needs worked examples"] : [],
      priorScorePercent: [92, 68, 42][index],
      misconceptions: index === 2 ? ["Visual guessing in geometry"] : [],
    })),
  );
  const [submissionCount, setSubmissionCount] = useState(answers.length);

  const classHealth = useMemo(() => {
    const average = Math.round(
      studentProfiles.reduce((sum, student) => sum + (student.priorScorePercent ?? 0), 0) / Math.max(studentProfiles.length, 1),
    );
    return { average, support: studentProfiles.filter((student) => (student.priorScorePercent ?? 100) < 70).length };
  }, [studentProfiles]);

  function savePlan(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const parsed = assessmentPlanSchema.safeParse({
      title: data.get("title"),
      className: data.get("className"),
      board: "CBSE",
      grade: data.get("grade"),
      subject: data.get("subject"),
      chapter: data.get("chapter"),
      concepts: String(data.get("concepts") ?? "").split(","),
      bloomLevels: data.getAll("bloomLevels"),
      questionCount: data.get("questionCount"),
      totalMarks: data.get("totalMarks"),
      durationMinutes: data.get("durationMinutes"),
      objectiveRatio: data.get("objectiveRatio"),
      instructions: data.get("instructions"),
    });
    if (!parsed.success) {
      setNotice({ type: "error", text: parsed.error.issues[0]?.message ?? "Check the test plan inputs." });
      return;
    }
    setPlans((current) => [createAssessmentDraft(parsed.data), ...current]);
    setNotice({ type: "success", text: "Input package validated and queued for your teammate’s AI generation engine." });
  }

  function addStudent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const parsed = studentProfileSchema.safeParse({
      name: data.get("name"),
      rollNumber: data.get("rollNumber"),
      className: "Grade 8 · Section A",
      supportNeeds: String(data.get("supportNeeds") ?? "").split(","),
      priorScorePercent: data.get("priorScorePercent"),
      misconceptions: String(data.get("misconceptions") ?? "").split(","),
    });
    if (!parsed.success) {
      setNotice({ type: "error", text: parsed.error.issues[0]?.message ?? "Check the student profile." });
      return;
    }
    setStudentProfiles((current) => [...current, parsed.data]);
    form.reset();
    setNotice({ type: "success", text: `${parsed.data.name} added to the learner context store.` });
  }

  function submitResponse(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const parsed = submissionInputSchema.safeParse({
      assessmentId: data.get("assessmentId"),
      studentId: data.get("studentId"),
      answers: [{ questionId: "q-angle-sum", response: data.get("response") }],
    });
    if (!parsed.success) {
      setNotice({ type: "error", text: parsed.error.issues[0]?.message ?? "A response is required." });
      return;
    }
    setSubmissionCount((count) => count + 1);
    form.reset();
    setNotice({ type: "success", text: "Response validated, stored, and marked ready for the AI evaluation engine." });
  }

  return (
    <main className="min-h-screen bg-[#f4f1e8] text-[#18201b]">
      <header className="border-b-3 border-[#18201b] bg-[#d9ff67] px-5 py-3 lg:px-8">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center border-2 border-[#18201b] bg-[#18201b] text-lg font-black text-[#d9ff67]">CI</div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em]">Classroom Intelligence</p>
              <p className="text-sm font-bold">Teacher workspace</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden border-2 border-[#18201b] bg-white px-3 py-2 text-xs font-black sm:block">Convex input layer · local preview</span>
            <div className="grid size-10 place-items-center rounded-full border-2 border-[#18201b] bg-[#ff8fb4] font-black">RS</div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] lg:grid-cols-[240px_1fr]">
        <aside className="border-b-3 border-[#18201b] bg-[#18201b] p-4 text-white lg:min-h-[calc(100vh-67px)] lg:border-r-3 lg:border-b-0">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setView(item.id);
                  setNotice(null);
                }}
                className={`flex items-center gap-3 border-2 px-3 py-3 text-left text-sm font-black transition ${
                  view === item.id
                    ? "border-[#18201b] bg-[#d9ff67] text-[#18201b] shadow-[4px_4px_0_#ff8fb4]"
                    : "border-white/20 hover:border-white hover:bg-white/10"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          <div className="mt-8 hidden border-2 border-white/30 p-4 lg:block">
            <p className="text-xs font-black uppercase tracking-widest text-[#d9ff67]">AI boundary</p>
            <p className="mt-2 text-sm font-bold text-white/80">Inputs stop here. Your teammate’s engine consumes the validated contract and returns a reviewable draft.</p>
          </div>
        </aside>

        <section className="p-5 lg:p-8">
          <div className="mx-auto max-w-6xl">
            <NoticeBanner notice={notice} />

            {view === "overview" && (
              <div className="grid gap-6">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.18em] text-neutral-500">Sunday · Grade 8A</p>
                    <h1 className="mt-1 text-4xl font-black tracking-tight sm:text-6xl">Good afternoon, Rishabh.</h1>
                    <p className="mt-2 max-w-2xl text-lg font-bold text-neutral-600">Collect clean classroom inputs now. Let the AI engine reason later.</p>
                  </div>
                  <button onClick={() => setView("plan")} className="neo-button bg-[#ff8fb4] px-5 py-3">+ Create test plan</button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    ["Students", studentProfiles.length, "Profiles ready", "#78d6ff"],
                    ["Class average", `${classHealth.average}%`, "From prior results", "#d9ff67"],
                    ["Needs support", classHealth.support, "Below 70%", "#ffb36b"],
                    ["Responses", submissionCount, "Ready for evaluation", "#ff8fb4"],
                  ].map(([label, value, sub, color]) => (
                    <article key={String(label)} className="border-3 border-[#18201b] p-5 shadow-[5px_5px_0_#18201b]" style={{ backgroundColor: String(color) }}>
                      <p className="text-xs font-black uppercase tracking-widest">{label}</p>
                      <p className="mt-2 text-4xl font-black">{value}</p>
                      <p className="mt-1 text-sm font-bold">{sub}</p>
                    </article>
                  ))}
                </div>

                <div className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
                  <article className="border-3 border-[#18201b] bg-white p-5 shadow-[6px_6px_0_#18201b]">
                    <div className="flex items-center justify-between gap-3">
                      <div><p className="text-xs font-black uppercase tracking-widest text-neutral-500">Input pipeline</p><h2 className="text-2xl font-black">Ready for generation</h2></div>
                      <span className="border-2 border-[#18201b] bg-[#d9ff67] px-3 py-1 text-xs font-black">{plans.length} package{plans.length === 1 ? "" : "s"}</span>
                    </div>
                    <div className="mt-5 grid gap-3">
                      {plans.slice(0, 3).map((plan) => (
                        <button key={plan.id} onClick={() => setView("plan")} className="grid gap-2 border-2 border-[#18201b] bg-[#f4f1e8] p-4 text-left transition hover:-translate-y-1 hover:shadow-[4px_4px_0_#18201b] sm:grid-cols-[1fr_auto]">
                          <div><h3 className="font-black">{plan.input.title}</h3><p className="text-sm font-bold text-neutral-600">{plan.input.chapter} · {plan.input.questionCount} questions · {plan.input.totalMarks} marks</p></div>
                          <span className="self-center text-sm font-black">Open →</span>
                        </button>
                      ))}
                    </div>
                  </article>

                  <article className="border-3 border-[#18201b] bg-[#18201b] p-5 text-white shadow-[6px_6px_0_#ff8fb4]">
                    <p className="text-xs font-black uppercase tracking-widest text-[#d9ff67]">Class signal</p>
                    <h2 className="mt-2 text-2xl font-black">Reteach angle-sum reasoning</h2>
                    <p className="mt-3 font-bold text-white/75">Two students reached the answer but could not justify why the property applies.</p>
                    <div className="mt-5 h-3 border border-white bg-white/20"><div className="h-full w-[67%] bg-[#ff8fb4]" /></div>
                    <div className="mt-2 flex justify-between text-xs font-black"><span>Class mastery</span><span>67%</span></div>
                  </article>
                </div>
              </div>
            )}

            {view === "plan" && (
              <div className="grid gap-6">
                <div><p className="text-sm font-black uppercase tracking-widest text-neutral-500">Teacher input engine</p><h1 className="text-4xl font-black sm:text-5xl">Create a test plan</h1><p className="mt-2 font-bold text-neutral-600">This becomes the strict input contract for your teammate’s assessment-generation agent.</p></div>
                <form onSubmit={savePlan} className="grid gap-6 xl:grid-cols-[1fr_320px]">
                  <div className="grid gap-5 border-3 border-[#18201b] bg-white p-5 shadow-[6px_6px_0_#18201b] sm:grid-cols-2">
                    <Field label="Assessment title"><input name="title" defaultValue="Quadrilaterals Diagnostic" className={inputClass} /></Field>
                    <Field label="Class"><select name="className" className={inputClass}><option>Grade 8 · Section A</option><option>Grade 8 · Section B</option></select></Field>
                    <Field label="Grade"><input name="grade" type="number" defaultValue="8" min="1" max="12" className={inputClass} /></Field>
                    <Field label="Subject"><input name="subject" defaultValue="Mathematics" className={inputClass} /></Field>
                    <Field label="Chapter"><input name="chapter" defaultValue="Understanding Quadrilaterals" className={inputClass} /></Field>
                    <Field label="Concepts" hint="Comma-separated, from approved curriculum"><input name="concepts" defaultValue="Angle sum property, Parallelogram properties" className={inputClass} /></Field>
                    <Field label="Questions"><input name="questionCount" type="number" defaultValue="5" min="1" max="50" className={inputClass} /></Field>
                    <Field label="Total marks"><input name="totalMarks" type="number" defaultValue="20" min="1" max="200" className={inputClass} /></Field>
                    <Field label="Duration (minutes)"><input name="durationMinutes" type="number" defaultValue="35" min="5" max="240" className={inputClass} /></Field>
                    <Field label="Objective questions (%)"><input name="objectiveRatio" type="number" defaultValue="40" min="0" max="100" className={inputClass} /></Field>
                    <fieldset className="grid gap-2 sm:col-span-2"><legend className="text-sm font-black">Bloom levels</legend><div className="flex flex-wrap gap-2">{["remember", "understand", "apply", "analyze", "evaluate", "create"].map((level) => <label key={level} className="border-2 border-[#18201b] bg-[#f4f1e8] px-3 py-2 text-sm font-black"><input name="bloomLevels" value={level} type="checkbox" defaultChecked={["understand", "apply"].includes(level)} className="mr-2 accent-[#18201b]" />{level}</label>)}</div></fieldset>
                    <Field label="Teacher instructions"><textarea name="instructions" rows={4} defaultValue="Show all reasoning for subjective questions. Include one diagnostic misconception check." className={`${inputClass} sm:col-span-2`} /></Field>
                  </div>
                  <aside className="grid content-start gap-4">
                    <div className="border-3 border-[#18201b] bg-[#d9ff67] p-5 shadow-[5px_5px_0_#18201b]"><p className="text-xs font-black uppercase tracking-widest">Contract output</p><ul className="mt-3 grid gap-2 text-sm font-bold"><li>✓ Schema-validated input</li><li>✓ CBSE curriculum scope</li><li>✓ Bloom-level targets</li><li>✓ Marks and duration bounds</li><li>✓ Human review required</li></ul></div>
                    <button type="submit" className="neo-button bg-[#ff8fb4] px-5 py-4">Validate & queue generation →</button>
                    <p className="text-xs font-bold text-neutral-500">No OpenAI call happens here. Convex stores the package; your teammate’s agent consumes it.</p>
                  </aside>
                </form>
              </div>
            )}

            {view === "students" && (
              <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
                <div><p className="text-sm font-black uppercase tracking-widest text-neutral-500">Learner context</p><h1 className="text-4xl font-black sm:text-5xl">Student profiles</h1><div className="mt-6 grid gap-3">{studentProfiles.map((student) => <article key={`${student.rollNumber}-${student.name}`} className="grid gap-3 border-3 border-[#18201b] bg-white p-4 shadow-[4px_4px_0_#18201b] sm:grid-cols-[auto_1fr_auto]"><div className="grid size-11 place-items-center rounded-full border-2 border-[#18201b] bg-[#78d6ff] font-black">{student.name.slice(0, 1)}</div><div><h2 className="font-black">{student.name} <span className="text-sm text-neutral-500">#{student.rollNumber}</span></h2><p className="text-sm font-bold text-neutral-600">{student.supportNeeds.join(" · ") || "No support note"}</p></div><div className={`self-center border-2 border-[#18201b] px-3 py-1 font-black ${(student.priorScorePercent ?? 0) < 70 ? "bg-[#ffb36b]" : "bg-[#d9ff67]"}`}>{student.priorScorePercent ?? "—"}%</div></article>)}</div></div>
                <form onSubmit={addStudent} className="grid content-start gap-4 border-3 border-[#18201b] bg-[#ffde73] p-5 shadow-[6px_6px_0_#18201b]"><h2 className="text-2xl font-black">Add student</h2><Field label="Name"><input name="name" className={inputClass} /></Field><Field label="Roll number"><input name="rollNumber" className={inputClass} /></Field><Field label="Prior score (%)"><input name="priorScorePercent" type="number" min="0" max="100" defaultValue="50" className={inputClass} /></Field><Field label="Support needs" hint="Comma-separated"><input name="supportNeeds" className={inputClass} /></Field><Field label="Known misconceptions" hint="Comma-separated"><textarea name="misconceptions" rows={3} className={inputClass} /></Field><button className="neo-button bg-[#78d6ff] px-4 py-3">Save learner profile</button></form>
              </div>
            )}

            {view === "responses" && (
              <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                <form onSubmit={submitResponse} className="grid content-start gap-4 border-3 border-[#18201b] bg-white p-5 shadow-[6px_6px_0_#18201b]"><div><p className="text-sm font-black uppercase tracking-widest text-neutral-500">Student input</p><h1 className="text-3xl font-black">Capture response</h1></div><Field label="Assessment"><select name="assessmentId" className={inputClass}>{plans.map((plan) => <option key={plan.id} value={plan.id}>{plan.input.title}</option>)}</select></Field><Field label="Student"><select name="studentId" className={inputClass}>{studentProfiles.map((student) => <option key={student.rollNumber} value={student.rollNumber}>{student.name} · #{student.rollNumber}</option>)}</select></Field><Field label="Question"><div className="border-2 border-[#18201b] bg-[#f4f1e8] p-3 font-bold">A quadrilateral has angles 80°, 95°, and 110°. Find the fourth angle and explain.</div></Field><Field label="Student answer"><textarea name="response" rows={7} placeholder="Paste, type, or dictate the response…" className={inputClass} /></Field><button className="neo-button bg-[#d9ff67] px-4 py-3">Validate & queue evaluation →</button></form>
                <div><p className="text-sm font-black uppercase tracking-widest text-neutral-500">Evaluation handoff</p><h2 className="text-4xl font-black">Response inbox</h2><div className="mt-5 grid gap-3">{workflow.evaluations.map((evaluation, index) => <article key={evaluation.answerId} className="border-3 border-[#18201b] bg-white p-4 shadow-[4px_4px_0_#18201b]"><div className="flex items-center justify-between gap-3"><div><h3 className="font-black">{studentProfiles[index]?.name}</h3><p className="text-sm font-bold text-neutral-500">Quadrilaterals Diagnostic</p></div><span className={`border-2 border-[#18201b] px-3 py-1 text-xs font-black ${evaluation.reviewRequired ? "bg-[#ffb36b]" : "bg-[#d9ff67]"}`}>{evaluation.reviewRequired ? "Review required" : "Ready"}</span></div><p className="mt-3 line-clamp-2 text-sm font-bold">{answers[index]?.rawResponse}</p><div className="mt-3 flex justify-between text-xs font-black"><span>AI engine boundary</span><span>Queued →</span></div></article>)}</div></div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
