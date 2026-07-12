"use client";

import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { assessmentPlanSchema } from "@/lib/input-engine";

const field = "w-full border-3 border-black bg-white px-3 py-2 font-bold outline-none focus:shadow-[3px_3px_0_#111827]";

export default function NewAssessmentPage() {
  const save = useMutation(api.inputs.saveAssessmentPlan);
  const router = useRouter();
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const parsed = assessmentPlanSchema.safeParse({
      title: data.get("title"), className: data.get("className"), board: "CBSE", grade: data.get("grade"),
      subject: data.get("subject"), chapter: data.get("chapter"), concepts: String(data.get("concepts")).split(","),
      bloomLevels: data.getAll("bloomLevels"), questionCount: data.get("questionCount"), totalMarks: data.get("totalMarks"),
      durationMinutes: data.get("durationMinutes"), objectiveRatio: data.get("objectiveRatio"), instructions: data.get("instructions"),
    });
    if (!parsed.success) return setError(parsed.error.issues[0]?.message ?? "Invalid assessment plan");
    setSaving(true);
    try { await save(parsed.data); router.push("/dashboard/assessments"); }
    catch { setError("Could not save to Convex. Ensure `npx convex dev` is running."); setSaving(false); }
  }

  return <>
    <div className="neo-page-header"><div><h1 className="neo-page-header__title">New Assessment</h1><p className="neo-page-header__subtitle">Build the validated input package consumed by the AI core.</p></div></div>
    {error && <div className="neo-card" style={{padding:"1rem",background:"var(--pink)",marginBottom:"1rem",fontWeight:800}}>{error}</div>}
    <form onSubmit={submit} className="neo-card" style={{padding:"1.5rem"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:"1rem"}}>
        <label className="font-bold">Title<input name="title" defaultValue="Quadrilaterals Diagnostic" className={field}/></label>
        <label className="font-bold">Class<input name="className" defaultValue="Grade 8 · Section A" className={field}/></label>
        <label className="font-bold">Grade<input name="grade" type="number" defaultValue="8" className={field}/></label>
        <label className="font-bold">Subject<input name="subject" defaultValue="Mathematics" className={field}/></label>
        <label className="font-bold">Chapter<input name="chapter" defaultValue="Understanding Quadrilaterals" className={field}/></label>
        <label className="font-bold">Concepts<input name="concepts" defaultValue="Angle sum property, Parallelogram properties" className={field}/></label>
        <label className="font-bold">Questions<input name="questionCount" type="number" defaultValue="5" className={field}/></label>
        <label className="font-bold">Marks<input name="totalMarks" type="number" defaultValue="20" className={field}/></label>
        <label className="font-bold">Duration<input name="durationMinutes" type="number" defaultValue="35" className={field}/></label>
        <label className="font-bold">Objective %<input name="objectiveRatio" type="number" defaultValue="40" className={field}/></label>
      </div>
      <fieldset style={{marginTop:"1rem"}}><legend className="font-bold">Bloom levels</legend>{["remember","understand","apply","analyze","evaluate","create"].map(level=><label key={level} style={{marginRight:"1rem",fontWeight:700}}><input type="checkbox" name="bloomLevels" value={level} defaultChecked={["understand","apply"].includes(level)}/> {level}</label>)}</fieldset>
      <label className="font-bold" style={{display:"block",marginTop:"1rem"}}>Instructions<textarea name="instructions" rows={4} defaultValue="Show all reasoning. Include one misconception check." className={field}/></label>
      <button disabled={saving} className="neo-button px-5 py-3" style={{marginTop:"1rem"}}>{saving ? "Saving to Convex…" : "Save & queue generation"}</button>
    </form>
  </>;
}
