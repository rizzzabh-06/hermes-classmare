export type WorkflowStatus =
  | "queued"
  | "validating"
  | "running"
  | "awaiting_review"
  | "completed"
  | "failed_retryable"
  | "failed_terminal"
  | "cancelled";

export type CurriculumNode = {
  id: string;
  board: "CBSE";
  grade: number;
  subject: string;
  chapter: string;
  concept: string;
  skill: string;
  learningOutcome: string;
  bloomLevel: "remember" | "understand" | "apply" | "analyze" | "evaluate" | "create";
};

export type Student = {
  id: string;
  name: string;
  rollNumber: string;
};

export type RubricPoint = {
  id: string;
  criterion: string;
  marks: number;
  evidenceKeywords: string[];
};

export type Question = {
  id: string;
  text: string;
  maxMarks: number;
  modelAnswer: string;
  rubric: RubricPoint[];
  curriculumNodeId: string;
};

export type StudentAnswer = {
  id: string;
  studentId: string;
  questionId: string;
  rawResponse: string;
};

export type EvaluationResult = {
  answerId: string;
  awardedMarks: number;
  maxMarks: number;
  correctness: "strong" | "partial" | "weak" | "empty";
  reasoningQuality: "clear" | "developing" | "unclear";
  rubricResults: Array<{
    rubricPointId: string;
    demonstrated: boolean;
    awardedMarks: number;
    evidence: string;
  }>;
  missingPoints: string[];
  misconception: string;
  feedback: string;
  confidence: number;
  reviewRequired: boolean;
};

export type ClassInsight = {
  averageScorePercent: number;
  strongConcepts: string[];
  weakConcepts: string[];
  commonMisconceptions: string[];
  studentsNeedingSupport: string[];
  reteachingPriorities: string[];
};

export type WeeklyPlanDay = {
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
  objective: string;
  concept: string;
  activity: string;
  differentiation: string;
  practice: string;
  formativeCheck: string;
  resources: string[];
};

export type WorkflowEvent = {
  stage: string;
  status: WorkflowStatus;
  message: string;
};
