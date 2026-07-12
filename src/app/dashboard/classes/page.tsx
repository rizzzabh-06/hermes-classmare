"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { FormEvent, useState } from "react";

export default function ClassesPage() {
  const classes = useQuery(api.classroom.listClasses);
  const createClass = useMutation(api.classroom.createClass);
  const [show, setShow] = useState(false); const [message,setMessage]=useState("");
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const data=new FormData(event.currentTarget); try { await createClass({name:`Grade ${data.get("grade")} · Section ${String(data.get("section")).toUpperCase()}`,grade:Number(data.get("grade")),section:String(data.get("section")).toUpperCase(),subject:String(data.get("subject")),academicYear:String(data.get("academicYear"))}); setShow(false); setMessage("Class saved to Convex."); } catch { setMessage("Could not save. Ensure Convex is running."); } }
  const field="w-full border-3 border-black bg-white px-3 py-2 font-bold";
  return <><div className="neo-page-header"><div><h1 className="neo-page-header__title">Classes</h1><p className="neo-page-header__subtitle">Live classroom records from Convex.</p></div><button onClick={()=>setShow(!show)} className="neo-button px-5 py-3">{show?"Cancel":"+ Create Class"}</button></div>{message&&<div className="neo-card" style={{padding:"1rem",background:"var(--mint)",marginBottom:"1rem",fontWeight:800}}>{message}</div>}{show&&<form onSubmit={submit} className="neo-card" style={{padding:"1.5rem",marginBottom:"1.5rem",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:"1rem"}}><label className="font-bold">Grade<input name="grade" type="number" defaultValue="8" className={field}/></label><label className="font-bold">Section<input name="section" defaultValue="A" className={field}/></label><label className="font-bold">Subject<input name="subject" defaultValue="Mathematics" className={field}/></label><label className="font-bold">Academic year<input name="academicYear" defaultValue="2025-26" className={field}/></label><button className="neo-button neo-button--mint px-4 py-2">Save class</button></form>}{classes===undefined?<div className="neo-empty"><div className="neo-empty__title">Loading classes…</div></div>:<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:"1rem"}}>{classes.map(cls=><article key={cls._id} className="neo-card" style={{padding:"1.5rem"}}><span className="neo-badge neo-badge--active">Active</span><h2 style={{fontWeight:900,fontSize:"1.3rem",marginTop:".75rem"}}>{cls.name}</h2><p style={{fontWeight:700}}>{cls.board} · {cls.subject}</p><p style={{fontSize:".8rem",color:"#666"}}>{cls.academicYear}</p></article>)}</div>}</>;
}
