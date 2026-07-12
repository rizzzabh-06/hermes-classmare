import { answers, questions, students } from "@/data/demo";
import { evaluateAnswer } from "./evaluation";
import { buildClassInsight } from "./insights";
import { generateWeeklyPlan } from "./planner";
import type { WorkflowEvent } from "./types";

export function runDemoWorkflow() {
  const events: WorkflowEvent[] = [
    {
      stage: "queued",
      status: "queued",
      message: "Teacher requested evaluation for the seeded quadrilaterals assessment.",
    },
    {
      stage: "validating",
      status: "validating",
      message: "Assessment, rubric, curriculum scope, and student answers were validated.",
    },
    {
      stage: "evaluation",
      status: "running",
      message: "Deterministic local workflow evaluated answers against the approved rubric.",
    },
    {
      stage: "review",
      status: "awaiting_review",
      message: "Subjective results are marked for teacher review before final approval.",
    },
  ];

  const question = questions[0];
  const evaluations = answers.map((answer) => evaluateAnswer(question, answer));
  const insight = buildClassInsight(evaluations, students);
  const weeklyPlan = generateWeeklyPlan(insight);

  return {
    events: [
      ...events,
      {
        stage: "planner",
        status: "completed" as const,
        message: "Weekly plan draft generated from approved-style class insight.",
      },
    ],
    evaluations,
    insight,
    weeklyPlan,
  };
}
