# Architecture Decisions

## ADR-001: Hermes as Sole Agent Framework

Decision:
Use Hermes for both development and runtime agent orchestration.

Reason:
One agent ecosystem reduces context duplication and provides a strong product story.

## ADR-002: OpenAI as Hermes Provider

Decision:
Use OpenAI as the underlying model provider for Hermes.

Do not build a separate direct OpenAI SDK integration in the MVP.

Reason:
Avoid duplicated prompts, duplicated retries, and conflicting AI execution paths.

## ADR-003: Convex as Primary Database

Decision:
Use Convex for real-time application state and persistence.

## ADR-004: Cloudflare Deployment

Decision:
Use Cloudflare Pages for frontend and Workers for API gateway and sponsor adapters.

## ADR-005: Static Curriculum

Decision:
Use a versioned static CBSE taxonomy for MVP.

Hermes may map to it but may not generate official structure.

## ADR-006: Human Review

Decision:
Teacher approval is required for subjective grading and published plans.

## ADR-007: Sponsor Scope

Decision:
Linkup and Wispr Flow are part of MVP.
ElevenLabs is limited.
Dodo Payments is roadmap-only.
