# System Architecture

## High-Level Architecture

```text
Teacher Browser
      |
      v
Cloudflare Pages
      |
      v
Cloudflare Worker API / Edge Gateway
      |
      +----------------------+
      |                      |
      v                      v
Convex                  Hermes Runtime
Realtime Data           Orchestration Layer
                             |
              +--------------+--------------+
              |              |              |
              v              v              v
        Evaluation       Insights        Planner
          Agent            Agent           Agent
              |              |              |
              +------- OpenAI Provider -----+
                             |
              +--------------+--------------+
              |              |              |
              v              v              v
           Linkup        ElevenLabs      Approved Tools

Wispr Flow -> Teacher input surface
Dodo Payments -> roadmap commercialization
```

## Hermes and OpenAI

OpenAI is not integrated as a separate application service in the MVP.

Instead:

- Hermes is the runtime AI layer.
- Hermes is configured to use OpenAI as the underlying model provider.
- All runtime reasoning calls pass through Hermes.
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

## Runtime Layer

Hermes runtime agents execute bounded workflows.

The app should call a workflow endpoint such as:

```text
POST /api/workflows/evaluate-submission
```

The Worker or backend adapter:

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
