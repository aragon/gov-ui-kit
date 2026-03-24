---
'@aragon/gov-ui-kit': major
---

BREAKING: Require React 19 and wagmi v3.

This release updates the kit to React 19 and aligns the internal modules layer with wagmi v3.

- Require `react` and `react-dom` `^19.0.0`
- Keep `wagmi` as a peer dependency and require `^3.0.0`
- Keep `tailwindcss` and `@tailwindcss/typography` as optional peers for the Tailwind CSS integration path
- Migrate internal wagmi usage from `useAccount` to `useConnection`
