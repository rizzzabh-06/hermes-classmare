import { describe, expect, it } from "vitest";
import { generateWeeklyPlan, isValidFiveDayPlan } from "@/lib/planner";
import type { ClassInsight } from "@/lib/types";

const insight: ClassInsight = {
  averageScorePercent: 67,
  strongConcepts: ["Known angle addition"],
  weakConcepts: ["Geometric justification"],
  commonMisconceptions: ["Visual guessing"],
  studentsNeedingSupport: ["Meera"],
  reteachingPriorities: ["Revisit quadrilateral angle sum"],
};

describe("generateWeeklyPlan", () => {
  it("generates a valid Monday-to-Friday plan", () => {
    const plan = generateWeeklyPlan(insight);

    expect(isValidFiveDayPlan(plan)).toBe(true);
    expect(plan).toHaveLength(5);
    expect(plan[0].objective).toContain("Revisit quadrilateral angle sum");
  });
});
