# AGENTS.md — @aragon/gov-ui-kit

Published React 19 + TypeScript component library for Aragon governance UIs. This is a
single package shipped to npm and consumed downstream (including aragon/app), so public
exports, peer dependencies, and semver are part of the product contract.

> Review protocol: begin every code-review comment with the token `GUK:`.

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
- `pnpm check:agents` — verify this file's scripts, paths, and agent entry points (runs in CI).
- `pnpm agents:sync` — regenerate `.github/copilot-instructions.md` from AGENTS.md.

Before a PR: `pnpm lint:check && pnpm type-check && pnpm test`.
CI also runs `pnpm build`, `pnpm build:storybook`, `pnpm test:coverage`, and on PRs
`pnpm changeset status --since origin/main`. A changeset is required only when `src/**`
changes (`.changeset/config.json`).

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
- **Agent entry points:** `AGENTS.md` is canonical. `CLAUDE.md` imports it via `@AGENTS.md`,
  and Cursor reads `AGENTS.md` natively. `.github/copilot-instructions.md` is a generated
  byte-copy of `AGENTS.md` (Copilot code review does not follow symlinks); regenerate it with
  `pnpm agents:sync` after editing this file — `pnpm check:agents` fails if it drifts.

## Hard Rules

- **No raw hex/rgb** in components or CSS. Use token-backed utilities; colors must work in
  light and dark themes.
- **No Tailwind arbitrary spacing/values** (`p-[17px]`, `w-[42%]`). Use the token/scale.
- **No component without a co-located `*.stories.tsx`.** Storybook is the docs source of truth.
- **Do not build custom dropdown/dialog/tooltip primitives outside the kit.** Reuse the
  Radix-based primitives in `src/core/components`.
- **Do not edit design-token sources** (`src/theme/tokens/**`) without CODEOWNERS review
  (`@aragon/app-team`). Tokens are the theming contract.
- **Preserve accessibility when composing.** Radix gives primitives their a11y; components in
  `src/modules` must keep labeling, focus order, and keyboard interaction intact, and rely on
  design tokens for contrast.
- **Test through the accessible surface.** Prefer `getByRole` / `getByText` /
  `getByLabelText`; do not assert on class names, snapshots, or internal DOM structure.
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

## Where to look

- `src/core/components/` — reusable primitives and their stories/tests.
- `src/modules/` — governance feature components and composition.
- `src/theme/tokens/` — design-token source; CODEOWNERS-gated (`@aragon/app-team`).
- `docs/codingGuidelines/` — dependency and coding guidance.
- `docs/`, `.storybook/main.ts`, `.storybook/preview.tsx` — Storybook docs/config.
- `package.json`, `pnpm-workspace.yaml`, `turbo.json` — scripts, deps, pnpm/Turbo rules.
- `rollup.config.mjs`, `svgo.config.js`, `postcss.config.js` — build and asset pipeline.
- `.github/workflows/library-test.yml` — CI truth for build/test/type/lint/changeset gates.
