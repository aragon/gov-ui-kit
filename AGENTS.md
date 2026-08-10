# AGENTS.md — @aragon/gov-ui-kit

Published React 19 + TypeScript component library for Aragon governance UIs. This is a
single package shipped to npm and consumed downstream (including aragon/app), so public
exports, peer dependencies, and semver are part of the product contract.

## Commands

Use pnpm only. Node is pinned in `.nvmrc`; pnpm and engine requirements live in
`package.json` and `pnpm-workspace.yaml` (`engineStrict: true`). npm/yarn installs fail.

- Setup: `corepack enable` → `pnpm install` → `pnpm run setup` (husky hooks).
- `pnpm storybook` — Storybook dev server on :6006; primary component dev surface.
- `pnpm build` — Rollup build to `dist/` plus compiled `build.css`.
- `pnpm build:storybook` — static Storybook build used in CI.
- `pnpm test` — Jest. Variants: `pnpm test:watch`, `pnpm test:coverage`.
- `pnpm type-check` — `tsc --noemit`.
- `pnpm lint` — Biome check with writes. `pnpm lint:check` — no writes.

Before a PR: `pnpm lint:check && pnpm type-check && pnpm test`.
CI also runs `pnpm build`, `pnpm build:storybook`, `pnpm test:coverage`, and on PRs
`pnpm changeset status --since origin/main`. User-facing changes need `pnpm changeset`.

## Architecture

- **Single package, not a workspace.** `pnpm-workspace.yaml` has pnpm settings/overrides
  only; no `packages:` globs. `turbo.json` caches `lint:check`, `type-check`, and `test`.
- **One public JS entry.** `src/index.ts` re-exports `./core` and `./modules`, which re-export
  their `assets`, `components`, `hooks`, `types`, and `utils` barrels. Every public symbol
  must ride this chain into `dist/index.es.js`.
- **Public package entries:** `.`, `./index.css`, `./build.css`. Do not add subpath exports or
  tell consumers to import from `dist/…`.
- **`src/core/` = reusable UI primitives**: button, dialog, dropdown, forms, tooltip, tag,
  dataList, accordion, and similar generic building blocks. No governance flow logic here.
- **`src/modules/` = governance-domain composition**: wallet, vote, proposal, dao, member,
  asset, transaction, smartContract, action, and address components built from core + peers.
- **Styling:** Tailwind CSS v4, CSS-first. There is no `tailwind.config.js`. Root `index.css`
  imports `./src/index.css` and `tailwindcss`; `src/index.css` pulls in core + theme CSS.
  Tokens live under `src/theme/tokens/` via `@theme` and expose the `--color-*` scale used
  as utilities such as `bg-primary-500` and `text-neutral-800`.
- **Icons:** SVG imports are transformed by SVGR in Rollup/Storybook. Adding an icon means
  adding the SVG under `src/core/assets/icons/` and registering it in
  `src/core/components/icon/iconType.ts` and `iconList.ts` (checked-in registries).
- **Docs/tests:** component docs are co-located `*.stories.tsx`; tests are co-located
  `*.test.tsx` / `*.spec.ts(x)`. Storybook reads `docs/**/*.@(md|mdx)`,
  `src/**/*.stories.@(js|jsx|ts|tsx)`, and `src/**/*.@(md|mdx)`.
- **Agent entry points:** root `AGENTS.md` is canonical. `CLAUDE.md` imports `@AGENTS.md`;
  `.cursor/rules/main.mdc` and `.github/copilot-instructions.md` are symlinks to it. Do not
  duplicate instruction prose in tool-specific files.

## Hard Rules

- **No raw hex/rgb** in components or CSS. Use token-backed utilities; colors must work in
  light and dark themes.
- **No Tailwind arbitrary spacing/values** (`p-[17px]`, `w-[42%]`). Use the token/scale.
- **No component without a co-located `*.stories.tsx`.** Storybook is the docs source of truth.
- **Do not build custom dropdown/dialog/tooltip primitives outside the kit.** Reuse the
  Radix-based primitives in `src/core/components`.
- **Do not edit design-token sources** (`src/theme/tokens/**`) without an ADR.
- **Do not skip VR review on UI-touching PRs** once visual regression review exists (M5).
- **Unit tests should assert behavior/logic, not markup.** Rendering/DOM assertions beyond
  smoke coverage belong in higher-level verification, not unit tests.
- **Do not edit generated build artifacts:** `dist/`, `build.css`, `storybook-static`.
- **Do not add ESLint or Prettier.** Lint/format is Biome via Ultracite.
- **Do not move peer deps into `dependencies`:** react, react-dom, react-hook-form,
  @tanstack/react-query, viem, wagmi, tailwindcss, @tailwindcss/typography.
- **Do not break public API casually.** Removing/renaming an exported symbol or prop is a
  breaking change and needs a deliberate Changeset.

## Architectural principles

- **Kit/app boundary litmus test.** Generic, reusable, non-domain UI belongs in `src/core`.
  Governance-domain composition belongs in `src/modules`. App-specific side effects, backend
  orchestration, or aragon/app flows belong in aragon/app, not this package.
- **MCP discipline.** Use tools for ground truth: current docs, primary sources, repo patterns.
  Prefer existing conventions over new ones; keep architectural decisions in code and this file.
- **Rules-vs-skills decision rule.** Keep always-on rules short, high-signal, and repo-wide.
  Put explicit procedural workflows (release steps, VR ceremony, heavy checks) in scripts or
  external skills instead of expanding this file.

## Skills available

No repo-local skill system is committed here (`skills/`, `.agents/`, and `.claude/` are absent).
If your agent runtime provides external skills, use them on demand for React, Storybook,
Tailwind/Radix, verification, and code review. Do not duplicate those workflows in this
always-on file.

## Where to look

- `src/core/components/` — reusable primitives and their stories/tests.
- `src/modules/` — governance feature components and composition.
- `src/theme/tokens/` — design-token source; do not edit without an ADR.
- `docs/codingGuidelines/` — dependency and coding guidance.
- `docs/`, `.storybook/main.ts`, `.storybook/preview.tsx` — Storybook docs/config.
- `package.json`, `pnpm-workspace.yaml`, `turbo.json` — scripts, deps, pnpm/Turbo rules.
- `rollup.config.mjs`, `svgo.config.js`, `postcss.config.js` — build and asset pipeline.
- `.github/workflows/library-test.yml` — CI truth for build/test/type/lint/changeset gates.
