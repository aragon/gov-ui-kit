---
"@aragon/gov-ui-kit": patch
---

Update devDependencies with major version bumps: vite 7→8, rollup-plugin-visualizer 6→7, vite-plugin-static-copy 3→4, vite-plugin-svgr 4→5, @rollup/plugin-terser 0.4→1.0, @changesets/changelog-github 0.5→0.6, vite-plugin-node-polyfills 0.25→0.26

- Migrate `rollup.config.js` to ESM (`rollup.config.mjs`) for rollup-plugin-visualizer v7 compatibility (ESM-only)
- Use explicit `index.css` paths in all CSS `@import` statements for Vite 8 / Rolldown compatibility
- Fix `jest.setSystemTime` call to pass a number instead of Date object for @sinonjs/fake-timers v15 compatibility
