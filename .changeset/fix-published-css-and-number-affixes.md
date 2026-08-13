---
"@aragon/gov-ui-kit": patch
---

Fix the precompiled `build.css` bundle, which was minified by a nesting-unaware pass that merged the selector lists of Tailwind's nested variant rules: ~140 `2xl:*` utilities removed the border of their last child and ~54 `md:*` utilities gave every child a right border, so consumers of the published CSS saw stray vertical bars on components such as `AlertCard` and `Accordion`. The bundle is now minified by Tailwind's own optimizer, and `pnpm css:check` fails in CI whenever it stops matching a source compile.

Also render `InputNumber` and `InputNumberMax` `prefix`/`suffix` values literally instead of parsing them as imask pattern definitions — a token symbol carrying a definition character was corrupted, so `suffix="aUSDC"` rendered as `_USDC`.
