"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";

export default function AssessmentsPage() {
  const assessments = useQuery(api.inputs.listAssessmentPlans);
  return <><div className="neo-page-header"><div><h1 className="neo-page-header__title">Assessments</h1><p className="neo-page-header__subtitle">Convex-backed assessment inputs ready for generation and delivery.</p></div><Link href="/dashboard/assessments/new" className="neo-button px-5 py-3">+ New Assessment</Link></div>
    {assessments === undefined ? <div className="neo-empty"><div className="neo-empty__title">Loading from Convex…</div></div> : assessments.length === 0 ? <div className="neo-empty"><div className="neo-empty__title">No assessments yet</div><div className="neo-empty__text">Create the first validated AI input package.</div></div> : <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:"1rem"}}>{assessments.map(item=><article key={item._id} className="neo-card" style={{padding:"1.5rem"}}><div style={{display:"flex",justifyContent:"space-between",gap:"1rem"}}><span className="neo-badge neo-badge--ready">{item.status.replaceAll("_"," ")}</span><small>{new Date(item.createdAt).toLocaleDateString()}</small></div><h2 style={{fontWeight:900,fontSize:"1.3rem",marginTop:"1rem"}}>{item.title}</h2><p style={{fontWeight:700,color:"#666"}}>{item.chapter} · Grade {item.grade}</p><div style={{display:"flex",gap:".75rem",marginTop:"1rem"}}><span className="neo-stat" style={{padding:".6rem",boxShadow:"2px 2px 0 var(--ink)"}}>{item.questionCount} questions</span><span className="neo-stat" style={{padding:".6rem",boxShadow:"2px 2px 0 var(--ink)",background:"var(--yellow)"}}>{item.totalMarks} marks</span></div><Link href={`/dashboard/assessments/${item._id}/submit`} className="neo-button neo-button--mint px-4 py-2" style={{display:"block",marginTop:"1rem",textAlign:"center"}}>Open student response form</Link></article>)}</div>}
  </>;
}
