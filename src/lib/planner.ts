import type { ClassInsight, WeeklyPlanDay } from "./types";

const days: WeeklyPlanDay["day"][] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export function generateWeeklyPlan(insight: ClassInsight): WeeklyPlanDay[] {
  const priority = insight.reteachingPriorities[0] ?? "Consolidate current chapter understanding";
  return days.map((day, index) => ({
    day,
    objective: index === 0 ? priority : `Apply quadrilateral reasoning in ${index + 1} increasingly independent problems`,
    concept: index < 3 ? "Angle sum property of quadrilaterals" : "Properties of special quadrilaterals",
    activity: [
      "Misconception sort using three anonymized student answers.",
      "Teacher-led mini lesson with worked examples and error spotting.",
      "Pair practice: explain each calculation step before solving.",
      "Small-group challenge: classify quadrilaterals from properties.",
      "Exit-ticket clinic and teacher review of remaining doubts.",
    ][index],
    differentiation: index < 2 ? "Give scaffolded equation frames to students below 70%." : "Offer extension proofs to students above 85%.",
    practice: `${3 + index} CBSE-style problems with one written justification each.`,
    formativeCheck: index === 4 ? "Five-question exit ticket and teacher-approved feedback review." : "One-minute hinge question before moving on.",
    resources: index === 1 ? ["Linkup enrichment: CBSE Grade 8 quadrilateral angle-sum explainer"] : [],
  }));
}

export function isValidFiveDayPlan(plan: WeeklyPlanDay[]): boolean {
  return plan.length === 5 && days.every((day, index) => plan[index]?.day === day) && plan.every((item) => item.objective && item.concept && item.activity && item.formativeCheck);
}
