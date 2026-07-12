# Hermes Runtime Agent Architecture

## Design Principle

Use a small number of specialized Hermes agents.

Do not create agents merely to make the architecture look complex.

## Runtime Components

### 1. Workflow Orchestrator

Responsibilities:

- receive workflow request,
- validate stage transitions,
- call specialized agents,
- maintain workflow state,
- enforce timeouts,
- persist trace events,
- retry safe stages,
- stop unsafe or invalid execution.

The orchestrator does not perform subject evaluation itself.

### 2. Assessment Structuring Agent

Purpose:

Convert teacher instructions or imported content into structured assessment data.

Inputs:

- teacher text,
- selected curriculum scope,
- optional voice transcript.

Outputs:

- title,
- instructions,
- questions,
- marks,
- response type,
- rubric draft,
- curriculum tags.

### 3. Response Parsing Agent

Purpose:

Normalize student response content.

Inputs:

- question,
- raw student response,
- expected response type.

Outputs:

- cleaned response,
- detected sections,
- uncertainty,
- parse warnings.

### 4. Evaluation Agent

Purpose:

Evaluate objective and subjective answers against an approved rubric.

Inputs:

- question,
- max marks,
- model answer,
- rubric points,
- student response,
- curriculum context.

Outputs:

- awarded marks,
- rubric point results,
- correctness,
- reasoning quality,
- missing points,
- feedback,
- confidence,
- review required.

### 5. Curriculum Mapping Agent

Purpose:

Map questions and responses onto the static curriculum taxonomy.

Outputs:

- chapter,
- topic,
- concept,
- skill,
- learning outcome,
- cognitive level,
- confidence.

It cannot create new official curriculum nodes.

### 6. Insight Agent

Purpose:

Aggregate approved evaluations into meaningful patterns.

Outputs:

- strengths,
- weak concepts,
- common misconceptions,
- student groups,
- reteaching priorities,
- intervention suggestions.

### 7. Weekly Planner Agent

Purpose:

Create an editable weekly teaching plan.

Inputs:

- class insights,
- curriculum sequence,
- teacher constraints,
- available days,
- approved Linkup resources.

Outputs:

- daily objective,
- concept,
- activity,
- differentiation,
- practice,
- formative check,
- resources.

### 8. Explanation Agent

Purpose:

Generate a short, age-appropriate explanation for a selected concept.

This agent feeds the optional ElevenLabs flow.

## Agent Output Policy

Every agent returns structured output.

Example status envelope:

```json
{
  "status": "success",
  "workflowId": "wf_123",
  "agent": "evaluation",
  "version": "1.0",
  "confidence": 0.92,
  "reviewRequired": false,
  "data": {}
}
```

## Context Policy

Agents receive only the minimum required context.

Do not provide:

- unrelated student records,
- entire school data,
- unnecessary prior chats,
- unrestricted repository data.

## Error Policy

Agent failures must return:

- stage,
- error code,
- safe message,
- retryable flag,
- partial output availability.

## Human-in-the-Loop Policy

Teacher approval is required for:

- subjective marks,
- major feedback,
- weekly plan publication,
- spoken explanation playback when student-facing.
