# Testing Strategy

## Unit Tests

Test:

- validation schemas,
- score bounds,
- curriculum mapping helpers,
- workflow state transitions,
- analytics calculations,
- planner structure validation.

## Integration Tests

Test:

- Convex mutations and queries,
- Cloudflare Worker routes,
- Hermes invocation adapter,
- Linkup adapter,
- ElevenLabs adapter,
- workflow persistence.

## Contract Tests

Every Hermes agent must be tested against:

- valid output,
- malformed output,
- missing fields,
- low confidence,
- timeout,
- provider error.

## End-to-End Tests

Critical paths:

1. Teacher signs in.
2. Opens seeded class.
3. Evaluates answer.
4. Approves result.
5. Opens analytics.
6. Generates weekly plan.
7. plays explanation.

## Demo Reliability Tests

- seed reset,
- retry workflow,
- provider unavailable fallback,
- slow network state,
- empty analytics state.

## Evaluation Quality Tests

Maintain a small gold dataset:

- question,
- rubric,
- sample answers,
- expected score range,
- expected misconceptions.

Track:

- score agreement,
- feedback relevance,
- false certainty,
- review-required rate.
