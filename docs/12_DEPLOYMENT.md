# Deployment

## Frontend

Deploy to Cloudflare Pages.

Environments:

- local
- preview
- production

## API and Runtime Gateway

Deploy Cloudflare Workers for:

- workflow endpoints,
- sponsor adapters,
- secret-bound requests,
- webhooks,
- rate limiting.

## Convex

Use separate deployments for:

- development,
- preview,
- production.

## Hermes Runtime

Deploy as an isolated runtime service or approved execution environment.

Requirements:

- OpenAI provider configured,
- restricted tools,
- environment-specific keys,
- structured logging,
- health check,
- timeout,
- concurrency limit.

## Secrets

Never expose:

- OpenAI provider key used by Hermes,
- Convex server credentials,
- Linkup key,
- ElevenLabs key,
- Cloudflare secrets.

Use environment secret management.

## Deployment Checklist

- build passes,
- environment variables present,
- Convex schema deployed,
- curriculum seeded,
- Hermes health check passes,
- Worker routes pass smoke tests,
- Pages deployment loads,
- demo account works.
