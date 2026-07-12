import type { CurriculumNode, Question, Student, StudentAnswer } from "@/lib/types";

export const curriculumNodes: CurriculumNode[] = [
  {
    id: "cbse-g8-math-quadrilaterals-angle-sum",
    board: "CBSE",
    grade: 8,
    subject: "Mathematics",
    chapter: "Understanding Quadrilaterals",
    concept: "Angle sum property of quadrilaterals",
    skill: "Apply geometric properties to justify unknown angles",
    learningOutcome: "Solves problems using properties of polygons and quadrilaterals",
    bloomLevel: "apply",
  },
  {
    id: "cbse-g8-math-parallelogram-properties",
    board: "CBSE",
    grade: 8,
    subject: "Mathematics",
    chapter: "Understanding Quadrilaterals",
    concept: "Properties of parallelograms",
    skill: "Connect opposite sides and angles to classification",
    learningOutcome: "Identifies and explains properties of special quadrilaterals",
    bloomLevel: "understand",
  },
];

export const students: Student[] = [
  { id: "stu-aanya", name: "Aanya", rollNumber: "08" },
  { id: "stu-kabir", name: "Kabir", rollNumber: "14" },
  { id: "stu-meera", name: "Meera", rollNumber: "21" },
];

export const questions: Question[] = [
  {
    id: "q-angle-sum",
    text: "A quadrilateral has three angles measuring 80°, 95°, and 110°. Find the fourth angle and explain your reasoning.",
    maxMarks: 4,
    modelAnswer:
      "The sum of interior angles of a quadrilateral is 360°. The known angles add to 285°, so the fourth angle is 360° - 285° = 75°.",
    curriculumNodeId: "cbse-g8-math-quadrilaterals-angle-sum",
    rubric: [
      {
        id: "rp-sum",
        criterion: "States that a quadrilateral's interior angles sum to 360°",
        marks: 1.5,
        evidenceKeywords: ["360", "sum", "angles"],
      },
      {
        id: "rp-add",
        criterion: "Correctly adds the three given angles to 285°",
        marks: 1,
        evidenceKeywords: ["285", "80", "95", "110"],
      },
      {
        id: "rp-subtract",
        criterion: "Subtracts from 360° to get 75°",
        marks: 1.5,
        evidenceKeywords: ["75", "subtract", "minus", "360"],
      },
    ],
  },
];

export const answers: StudentAnswer[] = [
  {
    id: "ans-aanya-angle-sum",
    studentId: "stu-aanya",
    questionId: "q-angle-sum",
    rawResponse:
      "All angles in a quadrilateral add to 360 degrees. 80 + 95 + 110 is 285, so the missing angle is 360 - 285 = 75 degrees.",
  },
  {
    id: "ans-kabir-angle-sum",
    studentId: "stu-kabir",
    questionId: "q-angle-sum",
    rawResponse: "I added 80, 95 and 110 and got 285. The answer is 75 degrees but I am not sure why.",
  },
  {
    id: "ans-meera-angle-sum",
    studentId: "stu-meera",
    questionId: "q-angle-sum",
    rawResponse: "The fourth angle is 85 because it should look balanced.",
  },
];
