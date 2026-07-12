# Development Phases

## Phase 0: Project Bootstrap

Deliverables:

- repository,
- AGENTS.md,
- docs,
- TypeScript app,
- lint,
- tests,
- environment templates,
- Cloudflare and Convex setup,
- seeded deterministic demo workflow.

Acceptance:

- app runs locally,
- production build passes,
- Convex schema/functions exist,
- demo can run without external secrets.

## Phase 1: Core Product Shell

Deliverables:

- authentication,
- dashboard,
- classes,
- students,
- curriculum seed,
- neo-brutalist design system.

Acceptance:

- teacher can create/open class,
- student list persists.

## Phase 2: Assessment Builder

Deliverables:

- create/edit assessment,
- static curriculum selection,
- question editor,
- rubric editor,
- draft/publish states,
- Wispr Flow input path.

Acceptance:

- teacher can create a complete assessment.

## Phase 3: Submission and Evaluation

Deliverables:

- student submission input,
- Hermes runtime endpoint,
- parser,
- curriculum mapper,
- evaluator,
- review UI,
- workflow state tracking.

Acceptance:

- subjective response produces validated draft evaluation.

## Phase 4: Analytics

Deliverables:

- student report,
- class dashboard,
- concept heatmap,
- misconception summary,
- insight agent.

Acceptance:

- approved evaluations update analytics.

## Phase 5: Weekly Planner

Deliverables:

- planner constraints,
- Linkup adapter,
- planner agent,
- editable weekly plan,
- approval state.

Acceptance:

- a class insight generates a five-day plan with at least one enriched resource.

## Phase 6: Spoken Explanation

Deliverables:

- explanation agent,
- text preview,
- ElevenLabs adapter,
- audio player.

Acceptance:

- one concept explanation can be generated and played.

## Phase 7: Landing Page and Sponsor Story

Deliverables:

- complete landing page,
- architecture section,
- sponsor section,
- pricing roadmap,
- Dodo Payments future path.

Acceptance:

- product story is clear and public.

## Phase 8: Demo Hardening

Deliverables:

- seeded demo,
- graceful failures,
- replayable workflows,
- loading states,
- test coverage,
- deployment checks,
- demo script.

Acceptance:

- complete demo runs repeatedly without manual repair.
