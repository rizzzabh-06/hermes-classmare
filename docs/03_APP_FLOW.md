# App Flow

## 1. Landing Page

Sections:

- Hero
- Problem
- How it works
- Product showcase
- Hermes-powered intelligence
- Weekly planner
- Sponsor-powered capabilities
- Demo CTA
- FAQ

Primary CTA:
- Try Demo

Secondary CTA:
- View Workflow

## 2. Authentication

```text
Landing Page
  -> Sign In
  -> Demo Account or Teacher Account
  -> Dashboard
```

## 3. Teacher Onboarding

```text
Create profile
  -> Select board
  -> Select grades
  -> Select subjects
  -> Create first class
```

Skip option is available for demo.

## 4. Dashboard

Shows:

- classes,
- pending evaluations,
- recent assessments,
- weak concepts,
- generated weekly plan,
- quick actions.

Quick actions:

- Create assessment
- Add students
- Evaluate responses
- Generate plan
- Dictate with Wispr Flow

## 5. Class Flow

```text
Dashboard
  -> Open class
  -> Overview
     - students
     - assessments
     - concept mastery
     - recent insights
     - weekly planner
```

## 6. Assessment Creation Flow

```text
Create Assessment
  -> Select class
  -> Select subject
  -> Select chapter
  -> Add questions
  -> Add marks and rubric
  -> Review
  -> Save or publish
```

Voice path:

```text
Teacher activates Wispr Flow
  -> Dictates assessment request
  -> Speech becomes editable text
  -> Hermes structures draft
  -> Teacher reviews
  -> Assessment saved
```

## 7. Submission Flow

```text
Open assessment
  -> Select student
  -> Paste or upload response
  -> Confirm parsed content
  -> Submit for evaluation
```

## 8. Hermes Evaluation Flow

```text
Submission received
  -> Workflow created
  -> Input validation
  -> Response parser
  -> Curriculum mapping
  -> Rubric evaluation
  -> Feedback generation
  -> Confidence check
  -> Review-required decision
  -> Persist draft result
  -> Teacher review
```

## 9. Teacher Review Flow

Teacher sees:

- original question,
- student answer,
- rubric,
- proposed marks,
- explanation,
- confidence,
- misconception,
- review flag.

Actions:

- approve,
- edit marks,
- edit feedback,
- request reevaluation,
- mark for manual review.

## 10. Analytics Flow

```text
Approved evaluations
  -> student metrics update
  -> class metrics update
  -> concept heatmap update
  -> insight agent runs
```

## 11. Weekly Planner Flow

```text
Class analytics
  -> Teacher selects week
  -> Adds constraints
  -> Hermes identifies priorities
  -> Linkup enriches resources
  -> Planner generated
  -> Teacher edits
  -> Teacher approves
```

## 12. Explain This Concept Flow

```text
Teacher selects weak concept
  -> Hermes creates short explanation
  -> Teacher previews text
  -> ElevenLabs creates audio
  -> Audio player appears
```

This feature is intentionally limited.

## 13. Demo Flow

Recommended demo:

1. Sign in to seeded teacher account.
2. Open Grade 8 Mathematics class.
3. Open Quadrilaterals assessment.
4. Show one subjective answer.
5. Trigger Hermes evaluation.
6. Review marks and misconception.
7. Open class heatmap.
8. Generate weekly plan.
9. Show Linkup resource.
10. Play one ElevenLabs explanation.
