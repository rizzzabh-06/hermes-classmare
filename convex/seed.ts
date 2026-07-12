import { mutation } from "./_generated/server";

export const demo = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("classes").first();
    if (existing) return { seeded: false, classId: existing._id };

    const classId = await ctx.db.insert("classes", {
      name: "Grade 8 · Section A",
      grade: 8,
      section: "A",
      subject: "Mathematics",
      board: "CBSE",
      academicYear: "2025-26",
    });

    const studentIds = [];
    for (const student of [
      { name: "Aanya", rollNumber: "08", priorScorePercent: 92, supportNeeds: [], misconceptions: [] },
      { name: "Kabir", rollNumber: "14", priorScorePercent: 68, supportNeeds: ["Needs reasoning prompts"], misconceptions: ["Omits property justification"] },
      { name: "Meera", rollNumber: "21", priorScorePercent: 42, supportNeeds: ["Needs worked examples"], misconceptions: ["Uses visual guessing in geometry"] },
    ]) {
      studentIds.push(await ctx.db.insert("students", { classId, status: "active", ...student }));
    }

    const now = Date.now();
    const assessmentPlanId = await ctx.db.insert("assessmentPlans", {
      classId,
      title: "Quadrilaterals Diagnostic",
      className: "Grade 8 · Section A",
      board: "CBSE",
      grade: 8,
      subject: "Mathematics",
      chapter: "Understanding Quadrilaterals",
      concepts: ["Angle sum property", "Parallelogram properties"],
      bloomLevels: ["understand", "apply"],
      questionCount: 5,
      totalMarks: 20,
      durationMinutes: 35,
      objectiveRatio: 40,
      instructions: "Show all reasoning for subjective questions.",
      status: "published",
      aiRequest: { task: "generate_assessment", schemaVersion: "1.0", humanReviewRequired: true },
      createdAt: now,
      updatedAt: now,
    });

    return { seeded: true, classId, studentIds, assessmentPlanId };
  },
});
