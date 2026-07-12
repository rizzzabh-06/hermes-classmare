"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NeoSelect from "@/components/ui/neo-select";
import NeoTextarea from "@/components/ui/neo-textarea";
import { useToast } from "@/components/ui/neo-toast";
import { students, questions } from "@/data/demo";

export default function SubmitAnswersPage() {
  const router = useRouter();
  const { toast } = useToast();
  const question = questions[0];

  const STUDENT_OPTIONS = students.map((s) => ({ value: s.id, label: `${s.name} (Roll ${s.rollNumber})` }));

  const [selectedStudent, setSelectedStudent] = useState("");
  const [answer, setAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!selectedStudent) newErrors.student = "Select a student";
    if (!answer.trim()) newErrors.answer = "Response cannot be empty";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast("Answer submitted for evaluation! Workflow queued.", "success");
      router.push("/dashboard/demo");
    }, 1200);
  }

  return (
    <>
      <div className="neo-page-header">
        <div>
          <h1 className="neo-page-header__title">Submit Answers</h1>
          <p className="neo-page-header__subtitle">Enter student responses for evaluation by Hermes.</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", maxWidth: "1000px" }}>
        {/* Question Card */}
        <div className="neo-card" style={{ padding: "1.75rem" }}>
          <span className="neo-badge neo-badge--published" style={{ marginBottom: "0.75rem" }}>Published</span>
          <h2 className="font-display" style={{ fontWeight: 900, fontSize: "1.375rem", marginTop: "0.5rem" }}>
            Assessment Question
          </h2>
          <p style={{ fontWeight: 700, fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(0,0,0,0.5)", marginTop: "0.5rem" }}>
            CBSE · Grade 8 · Mathematics
          </p>
          <div style={{ marginTop: "1.25rem", padding: "1rem", border: "3px solid #000", borderRadius: "var(--radius-md)", background: "var(--background)" }}>
            <p style={{ fontWeight: 700, fontSize: "1rem", lineHeight: 1.5, margin: 0 }}>
              {question.text}
            </p>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <span style={{ fontSize: "0.625rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(0,0,0,0.5)" }}>
              Rubric Points
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
              {question.rubric.map((point) => (
                <div
                  key={point.id}
                  style={{
                    padding: "0.625rem 0.875rem",
                    border: "3px solid #000",
                    borderRadius: "var(--radius-md)",
                    background: "var(--mint)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: "0.8125rem" }}>{point.criterion}</span>
                  <span className="font-display" style={{ fontWeight: 900, fontSize: "0.9375rem" }}>{point.marks}m</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{
            marginTop: "1rem",
            padding: "0.75rem 1rem",
            border: "3px solid #000",
            borderRadius: "var(--radius-md)",
            background: "var(--yellow)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <span style={{ fontWeight: 900, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Total Marks</span>
            <span className="font-display" style={{ fontWeight: 900, fontSize: "1.25rem" }}>{question.maxMarks}</span>
          </div>
        </div>

        {/* Submission Form */}
        <form onSubmit={handleSubmit} className="neo-card" style={{ padding: "1.75rem" }} data-testid="submission-form">
          <h2 className="font-display" style={{ fontWeight: 900, fontSize: "1.375rem" }}>
            Student Response
          </h2>
          <p style={{ fontWeight: 600, fontSize: "0.8125rem", color: "rgba(0,0,0,0.6)", marginTop: "0.25rem" }}>
            Select a student and enter their response for evaluation.
          </p>

          <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <NeoSelect
              label="Student"
              options={STUDENT_OPTIONS}
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              placeholder="Select a student…"
              error={errors.student}
            />

            <NeoTextarea
              label="Student's Answer"
              placeholder="Paste or type the student's response here…"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              maxLength={2000}
              showCount
              error={errors.answer}
              helper="Enter the exact written response from the student's answer sheet"
            />

            <div style={{ padding: "1rem", border: "3px dashed var(--ink)", borderRadius: "var(--radius-md)", background: "var(--background)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ fontSize: "1.5rem" }}>🎤</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: "0.8125rem" }}>Voice Input</div>
                <div style={{ fontSize: "0.75rem", color: "rgba(0,0,0,0.5)", fontWeight: 500 }}>Dictate student responses using Wispr Flow</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <button
              type="submit"
              className="neo-button neo-button--mint px-6 py-3 neo-button--lg"
              disabled={submitting}
              style={{ width: "100%" }}
              data-testid="submit-for-evaluation"
            >
              {submitting ? "⏳ Queuing for Evaluation…" : "✓ Submit for Evaluation"}
            </button>
            <p style={{ fontSize: "0.6875rem", fontWeight: 600, color: "rgba(0,0,0,0.4)", textAlign: "center" }}>
              Hermes will evaluate against the rubric. Teacher review is always required.
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
