import type { ClassInsight, EvaluationResult, Student } from "./types";
import { scorePercent } from "./evaluation";

export function buildClassInsight(results: EvaluationResult[], students: Student[]): ClassInsight {
  const averageScorePercent =
    results.length === 0 ? 0 : Math.round(results.reduce((sum, result) => sum + scorePercent(result), 0) / results.length);
  const weakResults = results.filter((result) => scorePercent(result) < 70);
  const supportIds = new Set(weakResults.map((result) => result.answerId.split("-")[1]).filter(Boolean));

  return {
    averageScorePercent,
    strongConcepts: averageScorePercent >= 75 ? ["Angle sum calculation"] : ["Identifying given angle values"],
    weakConcepts: weakResults.length > 0 ? ["Property-based geometric justification"] : [],
    commonMisconceptions: weakResults
      .map((result) => result.misconception)
      .filter((value, index, array) => array.indexOf(value) === index),
    studentsNeedingSupport: students.filter((student) => supportIds.has(student.id.split("-")[1])).map((student) => student.name),
    reteachingPriorities:
      weakResults.length > 0
        ? [
            "Revisit why every quadrilateral has interior angle sum 360°",
            "Practice converting word problems into equations",
          ]
        : ["Move to parallelogram properties extension"],
  };
}
