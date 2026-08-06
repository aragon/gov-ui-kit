# AGENTS.md — @aragon/gov-ui-kit

Published React 19 + TypeScript component library ("the kit") implementing Aragon's
governance UI. Single package, shipped to npm, consumed downstream (incl. aragon/app),
so the **public API surface and semver matter**. Pre-alpha; breaking changes are allowed
but must be intentional.

Top-down: **Commands → Architecture → Hard Rules → Architectural principles → Skills available → Where to look.**

## Commands

Use pnpm only. `engineStrict` is on; Node and pnpm are pinned (`.nvmrc`, `.npmrc`).
npm/yarn installs fail.

- Setup: `corepack enable` → `pnpm install` → `pnpm run setup` (installs husky hooks).
- `pnpm storybook` — run Storybook on :6006 (primary dev surface).
- `pnpm build` — Rollup build → `dist/` + `build.css` (ESM + types + SVGR icons).
- `pnpm build:storybook` — static Storybook build (used in CI).
- `pnpm test` — Jest. `pnpm test:watch`, `pnpm test:coverage`.
- `pnpm type-check` — `tsc --noemit`.
- `pnpm lint` — Biome check + autofix (writes). `pnpm lint:check` — no writes (CI).

Before opening a PR, run locally:
`pnpm lint:check && pnpm type-check && pnpm test`
CI runs the same plus `pnpm build`, `pnpm build:storybook`, `pnpm test:coverage`, and
`pnpm changeset status --since origin/main` (any user-facing change needs a changeset).

Changesets: `pnpm changeset`. No changeset = no version bump / changelog entry.

## Architecture

- **Single package, not a workspace.** `pnpm-workspace.yaml` holds pnpm settings/overrides
  only (no `packages:` globs); `turbo.json` only caches `lint`/`type-check`/`test`.
- **One public entry:** `src/index.ts` re-exports `./core` and `./modules`, both of which
  re-export `assets`, `components`, `hooks`, `types`, `utils` barrel chains →
  `dist/index.es.js`. Every public symbol must ride this chain.
- **`src/core/` = generic, reusable UI primitives** (button, dialog, dropdown, form
  controls, tooltip, tag, dataList, accordion, …). No domain logic.
- **`src/modules/` = governance-domain composition** (wallet, vote, proposal, dao, member,
  asset, transaction, smartContract, …), built on core + peer deps.
- **Styling:** Tailwind v4, CSS-first (no `tailwind.config.js`). Design tokens are defined
  under `src/theme/tokens/` (e.g. `primitives/*.css` via `@theme`) and consumed as
  Tailwind utilities from the `--color-*` scale (`bg-primary-500`, `text-neutral-800`, …).
  Root `index.css` → `src/core/index.css` + `src/theme/index.css`.
- **Icons:** SVGs → React components by SVGR at build time (`@svgr/rollup` + `svgo.config.js`
  in Rollup; `vite-plugin-svgr` in Storybook). `src/core/components/icon/iconType.ts` and
  `iconList.ts` are **generated — do not hand-edit**.
- **Docs & tests are co-located:** `*.stories.tsx` (the documentation source of truth) and
  `*.test.tsx`/`*.spec.ts(x)` live next to the component. Storybook globs `docs/**` and
  `src/**/*.stories.*` and `src/**/*.mdx`.
- **Public entry points only:** `.`, `./index.css`, `./build.css`. Package ships `dist/`,
  `index.css`, `build.css`, `src/**/*.css`, `src/theme/fonts/*`.

## Hard Rules

- **No raw hex/rgb** in components or CSS — use the design tokens (`bg-primary-*`,
  `text-neutral-*`). Colors must resolve in both light and dark theme.
- **No Tailwind arbitrary spacing/values** (`p-[17px]`, `w-[42%]`) — use the token/scale.
- **No component without a co-located `*.stories.tsx`** — Storybook is the docs source of
  truth and a missing story is a silent docs regression, not a build error.
- **Don't build a custom dropdown/dialog/tooltip (or other covered primitive) outside the
  kit** — reuse the kit's Radix-based primitives in `src/core/components`.
- **Don't edit design-token sources** (`src/theme/tokens/**`) without an ADR.
- **Don't skip VR (visual regression) review on UI-touching PRs** once VR is installed (M5).
- **Unit tests: no rendering/DOM assertions beyond smoke** — assert behavior/logic, not markup.
- **Don't edit generated artifacts** — `dist/`, `build.css`, `iconType.ts`, `iconList.ts`.

## Architectural principles

- **Kit/app boundary litmus test.** Ask: *is this generic, reusable, and free of a specific
  app/domain flow?* → `src/core`. *Is it governance-domain composition?* → `src/modules`.
  If it orchestrates app-specific side effects, fetches/backend, or aragon/app flows, it
  belongs in **aragon/app, not here**. The kit stays dependency-light (React + Radix +
  peer deps only); app-specific coupling breaks that contract.
- **MCP discipline.** Use tooling/resources deliberately and only when they add ground truth
  (current docs, primary sources, existing repo patterns). Prefer reading the repo and
  reusing its conventions over inventing new ones. Keep architectural decisions in code and
  this file, not scattered across tool state.
- **Rules-vs-skills decision rule.** Keep **always-on, high-signal** rules here (short,
  command-first, only non-obvious facts). Put **explicit, opt-in, procedural** workflows
  (multi-step tooling, release/VR pipelines, heavy operations) in skills/scripts — not as
  always-on rules. If it only matters sometimes, it isn't a hard rule. Rules must stay well
  under the ~32 KiB agent-context budget.

## Skills available

Agent skills relevant to this repo (loaded on demand; the always-on rules above are not
duplicated): react-best-practices, frontend-design, shadcn (Radix/Tailwind components),
verification, requesting/receiving-code-review, test-driven-development,
systematic-debugging, and context7 (library/API docs). Invoke a skill by name from the
skill registry when a task matches.

## Where to look

- `src/core/components/` — reusable primitives and their stories/tests.
- `src/modules/` — governance feature components.
- `src/theme/tokens/` + `docs/codingGuidelines/` — design tokens and dependency policies.
- `docs/` and `.storybook/` — product & component documentation, Storybook config.
- `package.json`, `rollup.config.mjs`, `turbo.json`, `.github/workflows/` — build/CI ground truth.
- README.md — install/usage; Storybook for component docs.

## Don't

- Don't add ESLint/Prettier — lint/format is Biome via Ultracite only.
- Don't add subpath exports or tell consumers to import from `dist/…`.
- Don't move peer deps (react, react-dom, react-hook-form, @tanstack/react-query, viem,
  wagmi, tailwindcss) from `peerDependencies` into `dependencies` — duplicate-instance bugs.
- Don't restate what Biome/tsc already enforce.
