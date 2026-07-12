import { z } from "zod";

const trimmedString = z.string().transform((value) => value.trim()).pipe(z.string().min(1));
const trimmedStringArray = z
  .array(z.string())
  .transform((values) => values.map((value) => value.trim()).filter(Boolean));

export const bloomLevelSchema = z.enum(["remember", "understand", "apply", "analyze", "evaluate", "create"]);

export const assessmentPlanSchema = z
  .object({
    title: trimmedString,
    className: trimmedString,
    board: z.literal("CBSE"),
    grade: z.coerce.number().int().min(1).max(12),
    subject: trimmedString,
    chapter: trimmedString,
    concepts: trimmedStringArray.pipe(z.array(z.string()).min(1)),
    bloomLevels: z.array(bloomLevelSchema).min(1),
    questionCount: z.coerce.number().int().min(1).max(50),
    totalMarks: z.coerce.number().int().min(1).max(200),
    durationMinutes: z.coerce.number().int().min(5).max(240),
    objectiveRatio: z.coerce.number().int().min(0).max(100),
    instructions: z.string().transform((value) => value.trim()),
  })
  .superRefine((plan, ctx) => {
    if (plan.totalMarks < plan.questionCount) {
      ctx.addIssue({
        code: "custom",
        path: ["totalMarks"],
        message: "Total marks must be at least the number of questions.",
      });
    }
  });

export const studentProfileSchema = z.object({
  name: trimmedString,
  rollNumber: trimmedString,
  className: trimmedString,
  supportNeeds: trimmedStringArray,
  priorScorePercent: z.coerce.number().min(0).max(100).optional(),
  misconceptions: trimmedStringArray,
});

const answerInputSchema = z.object({
  questionId: trimmedString,
  response: trimmedString,
});

export const submissionInputSchema = z.object({
  assessmentId: trimmedString,
  studentId: trimmedString,
  answers: z.array(answerInputSchema).min(1),
});

export type AssessmentPlanInput = z.infer<typeof assessmentPlanSchema>;
export type StudentProfileInput = z.infer<typeof studentProfileSchema>;
export type SubmissionInput = z.infer<typeof submissionInputSchema>;

export type AssessmentDraftContract = {
  id: string;
  status: "draft";
  input: AssessmentPlanInput;
  aiRequest: {
    task: "generate_assessment";
    schemaVersion: "1.0";
    humanReviewRequired: true;
    context: {
      board: "CBSE";
      grade: number;
      subject: string;
      chapter: string;
      concepts: string[];
      bloomLevels: AssessmentPlanInput["bloomLevels"];
    };
    constraints: {
      questionCount: number;
      totalMarks: number;
      durationMinutes: number;
      objectiveRatio: number;
    };
  };
};

function slug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

export function createAssessmentDraft(rawInput: AssessmentPlanInput): AssessmentDraftContract {
  const input = assessmentPlanSchema.parse(rawInput);
  return {
    id: `draft-${slug(input.title)}`,
    status: "draft",
    input,
    aiRequest: {
      task: "generate_assessment",
      schemaVersion: "1.0",
      humanReviewRequired: true,
      context: {
        board: input.board,
        grade: input.grade,
        subject: input.subject,
        chapter: input.chapter,
        concepts: input.concepts,
        bloomLevels: input.bloomLevels,
      },
      constraints: {
        questionCount: input.questionCount,
        totalMarks: input.totalMarks,
        durationMinutes: input.durationMinutes,
        objectiveRatio: input.objectiveRatio,
      },
    },
  };
}
