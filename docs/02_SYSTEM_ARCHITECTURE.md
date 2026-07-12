# System Architecture

## High-Level Architecture

```text
Teacher Browser
      |
      v
Cloudflare Pages
      |
      v
Cloudflare Worker/OpenNext API Layer
      |
      +----------------------+
      |                      |
      v                      v
Convex                  Hermes Desktop
Realtime Data           Agent Planning Surface
                             |
              +--------------+--------------+
              |              |              |
              v              v              v
        Evaluation       Insights        Planner
          Prompt           Prompt          Prompt
              |              |              |
              +------- OpenAI Provider -----+
                             |
              +--------------+--------------+
              |              |              |
              v              v              v
           Linkup Slot    ElevenLabs Slot Approved Tools

Wispr Flow -> Teacher input surface
Dodo Payments -> roadmap commercialization
```

## Hermes and OpenAI

OpenAI is not integrated as a separate application service in the MVP.

Instead:

- Hermes Desktop is the agent and reasoning surface used by the developer and teacher demo flow.
- Hermes Desktop is configured to use OpenAI credits as the underlying model provider.
- The running application does not directly call OpenAI or embed a second agent runtime.
- The product avoids maintaining duplicate prompt logic in both Hermes and direct OpenAI SDK code.

This creates one AI execution surface and one place for:

- prompts,
- tool permissions,
- retries,
- model selection,
- structured output rules,
- logging,
- and evaluation.

## Frontend

Recommended:

- React or Next.js-compatible static/edge deployment
- TypeScript
- Tailwind CSS
- Framer Motion
- Convex client
- component-driven neo-brutalist UI

Hosted on Cloudflare Pages.

## Edge/API Layer

Cloudflare Workers handle:

- secure API gateway,
- webhook endpoints,
- sponsor integration proxies,
- signed runtime requests,
- rate limiting,
- environment variables,
- deployment routing.

## Data Layer

Convex stores:

- users,
- schools,
- classes,
- students,
- curriculum nodes,
- assessments,
- questions,
- rubrics,
- submissions,
- answers,
- evaluations,
- insights,
- plans,
- resources,
- workflow runs,
- audit events.

## Workflow Layer

The MVP application executes deterministic workflow state transitions and stores traceable events. Hermes Desktop prompts define how human-supervised agent reasoning should evaluate, explain, and plan.

A future server-side adapter may expose an endpoint such as:

```text
POST /api/workflows/evaluate-submission
```

The future Worker or backend adapter:

1. validates request,
2. creates workflow record in Convex,
3. invokes Hermes,
4. streams or polls status,
5. validates final output,
6. persists results,
7. returns workflow status.

## Security Boundary

Hermes must not have unrestricted access.

Runtime tools should be allowlisted:

- read approved curriculum context,
- read submitted answer,
- write evaluation draft,
- call Linkup through a controlled adapter,
- call ElevenLabs through a controlled adapter.

Hermes must not:

- directly mutate teacher-approved records,
- access unrelated classes,
- expose provider keys,
- execute arbitrary shell commands in production,
- browse unrestricted sources during grading.

## Environment Separation

Use separate environments for:

- local development,
- preview,
- production.

Separate:

- Hermes development configuration,
- Hermes runtime configuration,
- Convex deployment,
- Cloudflare secrets,
- sponsor credentials.
