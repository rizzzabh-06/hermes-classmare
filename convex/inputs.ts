import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const bloomLevel = v.union(
  v.literal("remember"),
  v.literal("understand"),
  v.literal("apply"),
  v.literal("analyze"),
  v.literal("evaluate"),
  v.literal("create"),
);

export const listAssessmentPlans = query({
  args: {},
  handler: async (ctx) => await ctx.db.query("assessmentPlans").order("desc").collect(),
});

export const listStudents = query({
  args: {},
  handler: async (ctx) => await ctx.db.query("students").collect(),
});

export const listSubmissions = query({
  args: {},
  handler: async (ctx) => await ctx.db.query("submissions").order("desc").collect(),
});

export const saveAssessmentPlan = mutation({
  args: {
    title: v.string(),
    className: v.string(),
    board: v.literal("CBSE"),
    grade: v.number(),
    subject: v.string(),
    chapter: v.string(),
    concepts: v.array(v.string()),
    bloomLevels: v.array(bloomLevel),
    questionCount: v.number(),
    totalMarks: v.number(),
    durationMinutes: v.number(),
    objectiveRatio: v.number(),
    instructions: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("assessmentPlans", {
      ...args,
      status: "ready_for_generation",
      aiRequest: { task: "generate_assessment", schemaVersion: "1.0", humanReviewRequired: true },
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const addStudentProfile = mutation({
  args: {
    classId: v.id("classes"),
    name: v.string(),
    rollNumber: v.string(),
    supportNeeds: v.array(v.string()),
    priorScorePercent: v.optional(v.number()),
    misconceptions: v.array(v.string()),
  },
  handler: async (ctx, args) => await ctx.db.insert("students", { ...args, status: "active" }),
});

export const submitAnswers = mutation({
  args: {
    assessmentPlanId: v.id("assessmentPlans"),
    studentId: v.id("students"),
    answers: v.array(v.object({ questionId: v.string(), response: v.string() })),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const submissionId = await ctx.db.insert("submissions", {
      ...args,
      status: "queued_for_evaluation",
      submittedAt: now,
      createdAt: now,
    });
    await ctx.db.insert("workflowRuns", {
      workflowType: "evaluateSubmission",
      entityId: submissionId,
      status: "queued",
      currentStage: "awaiting_ai_engine",
      agentTrace: [{ stage: "input_validated", message: "Submission validated and queued for teammate AI engine.", at: now }],
      createdAt: now,
    });
    return submissionId;
  },
});
