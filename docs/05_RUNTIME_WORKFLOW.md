# Runtime Workflow

## Workflow A: Evaluate Submission

### Trigger

Teacher clicks `Evaluate`.

### Steps

1. Create `workflowRun`.
2. Validate assessment and submission.
3. Load approved rubric.
4. Load relevant curriculum nodes.
5. Run Response Parsing Agent.
6. Run Curriculum Mapping Agent if needed.
7. Run Evaluation Agent.
8. Validate output schema.
9. Apply deterministic score bounds.
10. Determine `reviewRequired`.
11. Store evaluation draft.
12. Update workflow status.
13. Notify frontend.

### Review Rule

Set `reviewRequired = true` when:

- confidence is below threshold,
- awarded marks are near a rubric boundary,
- answer is empty or ambiguous,
- model detects conflicting interpretations,
- rubric is incomplete,
- parse warning exists.

## Workflow B: Generate Class Insights

### Trigger

- teacher clicks generate,
- or threshold of newly approved evaluations is reached.

### Steps

1. Load approved evaluations.
2. Aggregate deterministic metrics.
3. Run Insight Agent on aggregate data.
4. Validate insights.
5. Store class insight snapshot.
6. update dashboard.

## Workflow C: Generate Weekly Plan

### Trigger

Teacher opens planner and clicks generate.

### Steps

1. Load latest class insight snapshot.
2. Load curriculum sequence.
3. Accept teacher constraints.
4. Determine top reteaching priorities.
5. Call Linkup through approved adapter.
6. Filter and summarize resources.
7. Run Weekly Planner Agent.
8. Validate five-day structure.
9. Save draft.
10. Allow teacher editing and approval.

## Workflow D: Voice Assessment Creation

### Trigger

Teacher activates Wispr Flow.

### Steps

1. Capture speech through Wispr Flow.
2. Insert transcript into assessment builder.
3. Teacher edits transcript.
4. Run Assessment Structuring Agent.
5. Preview structured assessment.
6. Teacher approves and saves.

## Workflow E: Spoken Explanation

### Trigger

Teacher clicks `Explain this concept`.

### Steps

1. Select concept and grade level.
2. Run Explanation Agent.
3. Show text preview.
4. Teacher approves.
5. Send text to ElevenLabs.
6. Return playable audio.
7. Store audio reference only if required.

## Workflow State Machine

```text
queued
  -> validating
  -> running
  -> awaiting_review
  -> completed

Failure branches:
  -> failed_retryable
  -> failed_terminal
  -> cancelled
```
