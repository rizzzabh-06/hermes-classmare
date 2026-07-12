# Product Requirements Document

## 1. Problem

Teachers spend significant time checking assessments, recording marks, identifying weak areas, and planning follow-up lessons.

Traditional systems usually stop at:

- marks,
- percentages,
- spreadsheets,
- and static reports.

They rarely answer:

- Why did students make this mistake?
- Which concepts are weak across the class?
- Is the problem conceptual, procedural, or careless?
- What should the teacher revise next?
- Which students need differentiated support?

## 2. Product Goal

Create a teacher-first classroom intelligence system that transforms assessment responses into:

- validated evaluation,
- curriculum-aligned insights,
- misconception detection,
- class-level patterns,
- and an editable weekly teaching plan.

## 3. Success Criteria

The demo succeeds when a teacher can:

1. Create a class.
2. Add or import students.
3. Select a CBSE subject and chapter.
4. Create an assessment or use a seeded one.
5. Submit student responses.
6. Run the Hermes evaluation workflow.
7. Review answer-level results.
8. View student and class insights.
9. Generate a weekly plan.
10. use voice input, resource enrichment, or spoken explanation.
11. access the deployed product through Cloudflare.

## 4. Personas

### Teacher

Needs:
- simple assessment workflow,
- fast evaluation,
- clear insights,
- editable plans,
- confidence in results.

### Academic Coordinator

Needs:
- class-level patterns,
- curriculum coverage,
- evidence for intervention,
- explainable reports.

### Student

Indirect user.

Receives:
- teacher-approved feedback,
- concept explanations,
- optional spoken explanations.

## 5. Core Functional Requirements

### Authentication

- Teacher sign-in.
- Protected dashboard.
- Session persistence.
- Demo account support.

### Class Management

- Create class.
- Assign grade, section, subject, and board.
- Add students.
- Seed demo class.

### Curriculum

Static MVP taxonomy:

- Board
- Grade
- Subject
- Book
- Chapter
- Topic
- Concept
- Skill
- Learning outcome

Hermes may map content to this taxonomy but may not invent official nodes.

### Assessment Builder

Teacher can:

- create assessment,
- choose chapter and concepts,
- add questions,
- define marks,
- attach model answers or rubric points,
- dictate instructions through Wispr Flow,
- save draft,
- publish assessment.

### Response Ingestion

MVP supports:

- manually entered answers,
- pasted responses,
- structured demo data,
- optional uploaded text or document workflow.

OCR may be simulated or limited if required for demo reliability.

### Evaluation

Hermes evaluates using:

- question,
- maximum marks,
- rubric,
- model answer,
- curriculum context,
- student response.

Output includes:

- awarded marks,
- correctness,
- reasoning quality,
- missing points,
- misconception,
- feedback,
- confidence,
- review required.

### Analytics

Student:
- concept mastery,
- skill mastery,
- strengths,
- gaps,
- misconceptions,
- assessment trend.

Class:
- average score,
- concept heatmap,
- common misconceptions,
- students requiring support,
- high-performing concepts,
- reteaching priorities.

### Weekly Planner

Inputs:
- class weaknesses,
- recent results,
- curriculum sequence,
- available days,
- teacher constraints,
- Linkup resources.

Output:
- Monday to Friday plan,
- objective,
- concept,
- activity,
- differentiation,
- practice,
- formative check,
- resources.

Teacher can edit and approve.

### Explain This Concept

Optional ElevenLabs flow:

1. Teacher selects a weak concept.
2. Hermes generates a short age-appropriate explanation.
3. ElevenLabs converts it to speech.
4. Teacher plays it for the class or student.

### Voice-First Teacher Input

Wispr Flow supports:

- assessment prompts,
- rubric notes,
- teacher comments,
- planner constraints.

### Curriculum Enrichment

Linkup retrieves:

- CBSE-aligned references,
- educational articles,
- teaching resources,
- practice material references.

Retrieved content must be summarized and attached as optional planner resources.

## 6. Non-Functional Requirements

- Responsive desktop-first UI.
- Mobile-readable.
- Fast demo path.
- Schema validation for all agent outputs.
- Clear loading and failure states.
- Auditability.
- No exposed secrets.
- Teacher review before finalizing subjective evaluation.
- Low-complexity deployment.

## 7. MVP Acceptance Criteria

The MVP is accepted when:

- the full demo flow works on seeded data,
- at least one subjective answer is evaluated,
- one class insight report is generated,
- one weekly plan is generated,
- one sponsor voice/resource flow works,
- deployment is public,
- all core states are stored in Convex,
- Hermes runtime traces are visible to the application.
