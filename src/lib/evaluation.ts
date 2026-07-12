import { z } from "zod";
import type { EvaluationResult, Question, StudentAnswer } from "./types";

const evaluationSchema = z.object({
  answerId: z.string(),
  awardedMarks: z.number().min(0),
  maxMarks: z.number().positive(),
  correctness: z.enum(["strong", "partial", "weak", "empty"]),
  reasoningQuality: z.enum(["clear", "developing", "unclear"]),
  rubricResults: z.array(
    z.object({
      rubricPointId: z.string(),
      demonstrated: z.boolean(),
      awardedMarks: z.number().min(0),
      evidence: z.string(),
    }),
  ),
  missingPoints: z.array(z.string()),
  misconception: z.string(),
  feedback: z.string(),
  confidence: z.number().min(0).max(1),
  reviewRequired: z.boolean(),
});

function keywordHit(response: string, keywords: string[]): boolean {
  const normalized = response.toLowerCase();
  return keywords.some((keyword) => normalized.includes(keyword.toLowerCase()));
}

function clampScore(score: number, maxMarks: number): number {
  return Math.min(maxMarks, Math.max(0, Number(score.toFixed(2))));
}

export function evaluateAnswer(question: Question, answer: StudentAnswer): EvaluationResult {
  const raw = answer.rawResponse.trim();
  if (!raw) {
    return evaluationSchema.parse({
      answerId: answer.id,
      awardedMarks: 0,
      maxMarks: question.maxMarks,
      correctness: "empty",
      reasoningQuality: "unclear",
      rubricResults: question.rubric.map((point) => ({
        rubricPointId: point.id,
        demonstrated: false,
        awardedMarks: 0,
        evidence: "No response provided.",
      })),
      missingPoints: question.rubric.map((point) => point.criterion),
      misconception: "No evidence available because the answer is empty.",
      feedback: "Add your reasoning and show how the quadrilateral property applies.",
      confidence: 0.98,
      reviewRequired: true,
    });
  }

  const rubricResults = question.rubric.map((point) => {
    const demonstrated = keywordHit(raw, point.evidenceKeywords);
    return {
      rubricPointId: point.id,
      demonstrated,
      awardedMarks: demonstrated ? point.marks : 0,
      evidence: demonstrated
        ? `Found evidence for: ${point.evidenceKeywords.join(", ")}.`
        : "Required evidence was not present in the response.",
    };
  });

  const awardedMarks = clampScore(
    rubricResults.reduce((sum, point) => sum + point.awardedMarks, 0),
    question.maxMarks,
  );
  const ratio = awardedMarks / question.maxMarks;
  const missingPoints = question.rubric
    .filter((point) => !rubricResults.find((result) => result.rubricPointId === point.id)?.demonstrated)
    .map((point) => point.criterion);
  const hasCorrectNumericalAnswer = /(^|\D)75(\D|$)/.test(raw);
  const confidence = clampScore(0.62 + ratio * 0.28 + (hasCorrectNumericalAnswer ? 0.08 : 0), 1);
  const reviewRequired = confidence < 0.78 || (ratio > 0.35 && ratio < 0.75) || missingPoints.length > 0;

  return evaluationSchema.parse({
    answerId: answer.id,
    awardedMarks,
    maxMarks: question.maxMarks,
    correctness: ratio >= 0.85 ? "strong" : ratio >= 0.45 ? "partial" : "weak",
    reasoningQuality: missingPoints.length === 0 ? "clear" : hasCorrectNumericalAnswer ? "developing" : "unclear",
    rubricResults,
    missingPoints,
    misconception:
      missingPoints.length === 0
        ? "No major misconception detected."
        : hasCorrectNumericalAnswer
          ? "The final answer is present, but the property-based justification is incomplete."
          : "The response appears to rely on visual intuition instead of the quadrilateral angle-sum property.",
    feedback:
      missingPoints.length === 0
        ? "Strong work: the property, calculation, and final angle are all clearly shown."
        : `Good start. Improve the answer by adding: ${missingPoints.join("; ")}.`,
    confidence,
    reviewRequired,
  });
}

export function scorePercent(result: EvaluationResult): number {
  return Math.round((result.awardedMarks / result.maxMarks) * 100);
}
