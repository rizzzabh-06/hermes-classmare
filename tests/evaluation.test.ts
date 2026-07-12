import { describe, expect, it } from "vitest";
import { answers, questions } from "@/data/demo";
import { evaluateAnswer } from "@/lib/evaluation";

const question = questions[0];

describe("evaluateAnswer", () => {
  it("awards full marks when the property, calculation, and final answer are present", () => {
    const result = evaluateAnswer(question, answers[0]);

    expect(result.awardedMarks).toBe(4);
    expect(result.correctness).toBe("strong");
    expect(result.reviewRequired).toBe(false);
  });

  it("requires teacher review when reasoning is incomplete", () => {
    const result = evaluateAnswer(question, answers[1]);

    expect(result.awardedMarks).toBeLessThan(4);
    expect(result.reviewRequired).toBe(true);
    expect(result.missingPoints.length).toBeGreaterThan(0);
  });

  it("never exceeds the maximum marks", () => {
    const result = evaluateAnswer(question, {
      ...answers[0],
      rawResponse: `${answers[0].rawResponse} 360 285 75 subtract angles sum`,
    });

    expect(result.awardedMarks).toBeLessThanOrEqual(question.maxMarks);
  });
});
