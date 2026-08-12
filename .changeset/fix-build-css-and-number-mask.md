---
"@aragon/gov-ui-kit": patch
---

Fix the precompiled `build.css` bundle, which was minified by a nesting-unaware pass that merged the selector lists of Tailwind's nested variant rules: ~140 `2xl:*` utilities removed the border of their last child and ~54 `md:*` utilities gave every child a right border, so consumers of the published CSS saw stray vertical bars on components such as `AlertCard` and `Accordion`. The bundle is now minified by Tailwind's own optimizer and is byte-identical to a source compile, and `pnpm check:css` guards it in CI. Also render `InputNumber` and `InputNumberMax` `prefix`/`suffix` values literally instead of parsing them as imask pattern definitions (`suffix="days"` rendered as `d_ys`), and clamp out-of-range values to `min`/`max` instead of dropping the offending character (`50` rendered as `5` when `max` was `20`). `min` and `max` are hard input boundaries, so an out-of-range error state must be rendered through the `alert` property.
