---
"@aragon/gov-ui-kit": patch
---

Upgrade Storybook from v9.1.20 to v10.3.5.

Key changes:
- Storybook 10 is ESM-only and adds native Vite 8 / Rolldown support.
- Bumped Rolldown override to rc.15 (fixes infinite recursion in `generate_transitive_esm_init` that caused SIGILL crash on ARM64 with `strictExecutionOrder`).
- Migrated `backgrounds` global to the new `options` / `initialGlobals` API (automigration `addon-globals-api`).
- Removed `vite-plugin-node-polyfills` — no `path`/`url` imports exist in the source, and the plugin used a deprecated `esbuild.banner` API under Vite 8.
