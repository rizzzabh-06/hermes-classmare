# Classroom Intelligence

Hermes Desktop-powered CBSE assessment intelligence for teachers.

The current build is a fast hackathon foundation: a Next.js + TypeScript teacher workspace with a test-plan builder, student-profile input, response capture, deterministic demo evaluation, class insights, Convex persistence contracts, and Cloudflare Workers deployment configuration through OpenNext.

## Commands

| Purpose | Command |
|---|---|
| Install | `npm install` |
| Develop | `npm run dev` |
| Test | `npm test` |
| Type-check | `npm run typecheck` |
| Lint | `npm run lint` |
| Build | `npm run build` |

## Architecture notes

- Hermes Desktop is the only AI/agent surface for the MVP, powered by the user's OpenAI credits.
- The application does not include a direct OpenAI SDK or a second agent framework.
- Convex is the primary data-layer target; the UI runs from local seeded data until a Convex deployment URL is configured.
- The frontend emits versioned, human-review-gated input contracts for the separate AI engine being built by the other workstream.
- Cloudflare deployment is configured with OpenNext and `wrangler.jsonc`.

Start with:

1. `AGENTS.md`
2. `docs/00_PROJECT_OVERVIEW.md`
3. `docs/01_PRD.md`
4. `docs/10_DEVELOPMENT_PHASES.md`
5. `docs/15_HERMES_MASTER_PROMPTS.md`
