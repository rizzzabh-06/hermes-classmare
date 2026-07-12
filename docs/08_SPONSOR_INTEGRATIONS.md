# Sponsor Integrations

## Integration Strategy

Each sponsor must have a clear product role.

Do not force every sponsor into the critical path.

## OpenAI

### Role

Underlying model provider used by Hermes.

### Important Architecture Decision

The application does not maintain a separate direct OpenAI integration for the MVP.

OpenAI powers:

- Hermes development sessions,
- Hermes runtime agents,
- evaluation reasoning,
- rubric generation,
- feedback,
- insights,
- weekly plans,
- concept explanations.

### Demo Value

Five stars.

### Acceptance Criteria

- Hermes runtime is configured with OpenAI.
- No duplicate prompt stack exists outside Hermes.
- Secrets remain server-side.
- Model and prompt versions are traceable.

---

## Convex

### Role

Primary real-time application database.

Stores:

- classes,
- students,
- curriculum,
- assessments,
- answers,
- evaluations,
- analytics,
- workflow runs,
- weekly plans.

### Demo Value

Four to five stars.

### Acceptance Criteria

- Dashboard updates in real time.
- Workflow states are visible.
- Seed data can be loaded.
- Teacher edits persist immediately.

---

## Cloudflare Pages

### Role

Host the frontend.

### Acceptance Criteria

- Public preview and production URLs.
- Environment-specific builds.
- Fast global delivery.

---

## Cloudflare Workers

### Role

Secure edge/API gateway.

Handles:

- Hermes runtime invocation,
- sponsor API adapters,
- secret management,
- rate limiting,
- webhooks,
- request validation.

### Demo Value

Three to four stars.

---

## Linkup

### Role

Planner resource enrichment.

Use cases:

- retrieve CBSE references,
- find teaching resources,
- find relevant educational articles,
- enrich weekly plans.

### Safety Rules

- Linkup results do not define official curriculum.
- Retrieved material is optional enrichment.
- Store title, source, summary, and retrieval time.
- Teacher can remove resources.

### Demo Value

Four stars.

---

## Wispr Flow

### Role

Voice-first teacher input.

Use cases:

- dictate an assessment,
- dictate a rubric,
- dictate planner constraints,
- dictate feedback.

### MVP Scope

Use Wispr Flow at the interface level.

A full custom speech pipeline is unnecessary.

### Demo Value

Four stars.

---

## ElevenLabs

### Role

Optional, limited spoken concept explanation.

Use case:

Teacher clicks `Explain this concept`, previews the generated text, then plays a natural-language explanation.

### Scope Guard

Do not make audio generation part of grading.

Do not generate audio for every student automatically.

Use one polished demo path.

### Demo Value

Three to four stars.

---

## Dodo Payments

### Role

Commercialization roadmap.

Future use cases:

- teacher premium plan,
- school subscription,
- usage-based AI credits,
- invoice and billing management.

### MVP Scope

Do not build checkout.

Include:

- pricing section,
- future billing architecture note,
- disabled or waitlist upgrade CTA.

### Demo Value

Two stars.

---

## Sponsor Demo Matrix

| Sponsor | MVP Status | Demo Moment |
|---|---|---|
| OpenAI via Hermes | Required | Evaluate subjective answer |
| Convex | Required | Live dashboard update |
| Cloudflare Pages | Required | Public deployed app |
| Cloudflare Workers | Required | Secure workflow/API execution |
| Linkup | Required | Enriched planner resource |
| Wispr Flow | Required | Dictate assessment request |
| ElevenLabs | Limited | Play one concept explanation |
| Dodo Payments | Roadmap | Pricing/commercialization slide |
