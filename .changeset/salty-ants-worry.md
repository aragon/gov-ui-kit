---
'@aragon/gov-ui-kit': minor
---

**BREAKING** Refactor ProposalVoting component to improve handling of stages:

- Mark `name` property of `BodyContent` and `Stage` components as required
- Rename `Container` component to `StageContainer`, implement new `Container` component for simple governance proposals
