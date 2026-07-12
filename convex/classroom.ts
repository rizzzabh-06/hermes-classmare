import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const listClasses = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("classes").collect();
  },
});

export const createClass = mutation({
  args: {
    name: v.string(),
    grade: v.number(),
    section: v.string(),
    subject: v.string(),
    academicYear: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("classes", {
      ...args,
      board: "CBSE",
    });
  },
});

export const startWorkflowRun = mutation({
  args: {
    workflowType: v.union(v.literal("evaluateSubmission"), v.literal("generateWeeklyPlan")),
    entityId: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("workflowRuns", {
      ...args,
      status: "queued",
      currentStage: "queued",
      agentTrace: [{ stage: "queued", message: "Workflow queued by teacher action.", at: now }],
      createdAt: now,
    });
  },
});
