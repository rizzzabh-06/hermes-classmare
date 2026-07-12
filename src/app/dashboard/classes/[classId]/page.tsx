"use client";

import Link from "next/link";
import { useState } from "react";
import NeoInput from "@/components/ui/neo-input";
import NeoTagInput from "@/components/ui/neo-tag-input";
import { useToast } from "@/components/ui/neo-toast";
import { students as seededStudents } from "@/data/demo";

type StudentRow = {
  id: string;
  name: string;
  rollNumber: string;
  supportNeeds: string[];
  priorScorePercent?: number;
  misconceptions: string[];
};

const INITIAL_STUDENTS: StudentRow[] = seededStudents.map((s) => ({
  ...s,
  supportNeeds: [],
  misconceptions: [],
}));

export default function ClassDetailPage() {
  const { toast } = useToast();
  const [studentList, setStudentList] = useState<StudentRow[]>(INITIAL_STUDENTS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    rollNumber: "",
    supportNeeds: [] as string[],
    priorScorePercent: "",
    misconceptions: [] as string[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.rollNumber.trim()) newErrors.rollNumber = "Roll number is required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newStudent: StudentRow = {
      id: `stu-${form.name.toLowerCase().replace(/\s+/g, "-")}`,
      name: form.name.trim(),
      rollNumber: form.rollNumber.trim(),
      supportNeeds: form.supportNeeds,
      priorScorePercent: form.priorScorePercent ? Number(form.priorScorePercent) : undefined,
      misconceptions: form.misconceptions,
    };

    setStudentList((prev) => [...prev, newStudent]);
    setForm({ name: "", rollNumber: "", supportNeeds: [], priorScorePercent: "", misconceptions: [] });
    setErrors({});
    setShowAddForm(false);
    toast(`${newStudent.name} added to class!`, "success");
  }

  return (
    <>
      <div className="neo-page-header">
        <div>
          <Link
            href="/dashboard/classes"
            style={{ fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(0,0,0,0.5)", textDecoration: "none" }}
            data-testid="back-to-classes"
          >
            ← Back to Classes
          </Link>
          <h1 className="neo-page-header__title" style={{ marginTop: "0.5rem" }}>Grade 8 · Section A</h1>
          <p className="neo-page-header__subtitle">CBSE · Mathematics · 2025-26</p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Link href="/dashboard/assessments/new" className="neo-button neo-button--blue px-5 py-3" data-testid="create-assessment-btn">
            + Assessment
          </Link>
          <button
            className="neo-button neo-button--mint px-5 py-3"
            onClick={() => setShowAddForm(!showAddForm)}
            data-testid="add-student-toggle"
          >
            {showAddForm ? "Cancel" : "+ Add Student"}
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        <div className="neo-stat" style={{ background: "var(--yellow)" }}>
          <div className="neo-stat__value">{studentList.length}</div>
          <div className="neo-stat__label">Students</div>
        </div>
        <div className="neo-stat" style={{ background: "var(--blue)" }}>
          <div className="neo-stat__value">1</div>
          <div className="neo-stat__label">Assessments</div>
        </div>
        <div className="neo-stat" style={{ background: "var(--mint)" }}>
          <div className="neo-stat__value">75%</div>
          <div className="neo-stat__label">Avg Score</div>
        </div>
        <div className="neo-stat" style={{ background: "var(--pink)" }}>
          <div className="neo-stat__value">2</div>
          <div className="neo-stat__label">Need Support</div>
        </div>
      </div>

      {/* Add Student Form */}
      {showAddForm && (
        <form
          onSubmit={handleSubmit}
          className="neo-card"
          style={{ padding: "1.5rem", marginBottom: "2rem", background: "var(--background)" }}
          data-testid="add-student-form"
        >
          <h2 className="font-display" style={{ fontWeight: 900, fontSize: "1.25rem", marginBottom: "1.25rem" }}>
            Add Student
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <NeoInput
              label="Name"
              placeholder="e.g. Aanya"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              error={errors.name}
            />
            <NeoInput
              label="Roll Number"
              placeholder="e.g. 08"
              value={form.rollNumber}
              onChange={(e) => setForm({ ...form, rollNumber: e.target.value })}
              error={errors.rollNumber}
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
            <NeoTagInput
              label="Support Needs"
              value={form.supportNeeds}
              onChange={(tags) => setForm({ ...form, supportNeeds: tags })}
              placeholder="e.g. visual examples, extra time"
              colorVariant="blue"
              helper="Press Enter or comma to add"
            />
            <NeoTagInput
              label="Known Misconceptions"
              value={form.misconceptions}
              onChange={(tags) => setForm({ ...form, misconceptions: tags })}
              placeholder="e.g. visual guessing"
              colorVariant="pink"
              helper="Press Enter or comma to add"
            />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <NeoInput
              label="Prior Score %"
              type="number"
              min={0}
              max={100}
              placeholder="e.g. 68"
              value={form.priorScorePercent}
              onChange={(e) => setForm({ ...form, priorScorePercent: e.target.value })}
              helper="Optional — previous assessment average"
            />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.25rem" }}>
            <button type="button" className="neo-button neo-button--secondary px-4 py-2" onClick={() => setShowAddForm(false)}>
              Cancel
            </button>
            <button type="submit" className="neo-button neo-button--mint px-5 py-3" data-testid="submit-student">
              Add Student
            </button>
          </div>
        </form>
      )}

      {/* Student Roster */}
      <section>
        <h2 className="font-display" style={{ fontWeight: 900, fontSize: "1.5rem", marginBottom: "1rem" }}>
          Student Roster
        </h2>
        <div className="neo-card" style={{ overflow: "hidden" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 2fr 1fr",
            padding: "0.875rem 1.25rem",
            borderBottom: "4px solid #000",
            background: "var(--yellow)",
            fontWeight: 900,
            fontSize: "0.625rem",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            fontFamily: "'Bricolage Grotesque', sans-serif",
          }}>
            <span>Name</span>
            <span>Roll No</span>
            <span>Support Needs</span>
            <span>Prior Score</span>
          </div>
          {studentList.map((student, i) => (
            <div
              key={student.id}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 2fr 1fr",
                padding: "1rem 1.25rem",
                borderBottom: i < studentList.length - 1 ? "3px solid #000" : "none",
                alignItems: "center",
                background: i % 2 === 0 ? "white" : "var(--background)",
              }}
              data-testid={`student-row-${student.id}`}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span
                  style={{
                    width: "2.25rem",
                    height: "2.25rem",
                    borderRadius: "var(--radius-full)",
                    border: "3px solid #000",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 900,
                    fontSize: "0.75rem",
                    background: ["var(--yellow)", "var(--pink)", "var(--blue)", "var(--mint)", "var(--purple)", "var(--orange)"][i % 6],
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  {student.name[0]}
                </span>
                <span style={{ fontWeight: 700 }}>{student.name}</span>
              </div>
              <span style={{ fontWeight: 600 }}>{student.rollNumber}</span>
              <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
                {student.supportNeeds.length > 0
                  ? student.supportNeeds.map((need) => (
                      <span key={need} className="neo-badge neo-badge--ready" style={{ fontSize: "0.5625rem" }}>
                        {need}
                      </span>
                    ))
                  : <span style={{ fontSize: "0.8125rem", color: "#9ca3af", fontWeight: 500 }}>—</span>
                }
              </div>
              <span style={{ fontWeight: 700 }}>
                {student.priorScorePercent != null ? `${student.priorScorePercent}%` : "—"}
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
