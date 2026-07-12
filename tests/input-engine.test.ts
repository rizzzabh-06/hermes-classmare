import { describe, expect, it } from "vitest";
import {
  assessmentPlanSchema,
  createAssessmentDraft,
  studentProfileSchema,
  submissionInputSchema,
} from "@/lib/input-engine";

const validPlan = {
  title: "Quadrilaterals Diagnostic",
  className: "Grade 8 · Section A",
  board: "CBSE" as const,
  grade: 8,
  subject: "Mathematics",
  chapter: "Understanding Quadrilaterals",
  concepts: ["Angle sum property", "Parallelogram properties"],
  bloomLevels: ["understand", "apply"] as const,
  questionCount: 5,
  totalMarks: 20,
  durationMinutes: 35,
  objectiveRatio: 40,
  instructions: "Show all reasoning for subjective questions.",
};

describe("assessment input engine", () => {
  it("rejects plans whose objective ratio is outside 0–100", () => {
    expect(() => assessmentPlanSchema.parse({ ...validPlan, objectiveRatio: 120 })).toThrow();
  });

  it("creates a stable draft contract for the AI engine", () => {
    const draft = createAssessmentDraft(validPlan);

    expect(draft.status).toBe("draft");
    expect(draft.input.totalMarks).toBe(20);
    expect(draft.input.subject).toBe("Mathematics");
    expect(draft.aiRequest).toEqual(
      expect.objectContaining({
        task: "generate_assessment",
        schemaVersion: "1.0",
        humanReviewRequired: true,
      }),
    );
  });

  it("normalizes student support needs and prior context", () => {
    const profile = studentProfileSchema.parse({
      name: " Aanya ",
      rollNumber: " 08 ",
      className: "Grade 8 · Section A",
      supportNeeds: [" Needs visual examples ", ""],
      priorScorePercent: 68,
      misconceptions: ["uses visual guessing"],
    });

    expect(profile.name).toBe("Aanya");
    expect(profile.supportNeeds).toEqual(["Needs visual examples"]);
  });

  it("rejects an empty student response", () => {
    expect(() =>
      submissionInputSchema.parse({
        assessmentId: "assessment-1",
        studentId: "student-1",
        answers: [{ questionId: "q1", response: "   " }],
      }),
    ).toThrow();
  });
});
