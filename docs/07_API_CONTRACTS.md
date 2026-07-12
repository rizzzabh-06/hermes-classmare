# API Contracts

## Create Assessment

`POST /api/assessments`

Request:
```json
{
  "classId": "class_123",
  "title": "Quadrilaterals Check",
  "chapterIds": ["chapter_quad"],
  "questions": []
}
```

## Start Evaluation

`POST /api/workflows/evaluate-submission`

Request:
```json
{
  "submissionId": "submission_123"
}
```

Response:
```json
{
  "workflowId": "workflow_123",
  "status": "queued"
}
```

## Workflow Status

`GET /api/workflows/:id`

Response:
```json
{
  "id": "workflow_123",
  "status": "running",
  "currentStage": "evaluation",
  "progress": 70
}
```

## Approve Evaluation

`POST /api/evaluations/:id/approve`

Request:
```json
{
  "awardedMarks": 2,
  "feedback": "Good reasoning. State the angle-sum property explicitly."
}
```

## Generate Weekly Plan

`POST /api/workflows/generate-weekly-plan`

Request:
```json
{
  "classId": "class_123",
  "weekStart": "2026-07-13",
  "constraints": {
    "availableDays": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "sessionMinutes": 40
  }
}
```

## Generate Spoken Explanation

`POST /api/explanations/audio`

Request:
```json
{
  "conceptId": "concept_123",
  "grade": 8,
  "tone": "friendly"
}
```

## Error Shape

```json
{
  "error": {
    "code": "WORKFLOW_FAILED",
    "message": "The evaluation could not be completed.",
    "retryable": true
  }
}
```
