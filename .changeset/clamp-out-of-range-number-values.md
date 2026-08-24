---
"@aragon/gov-ui-kit": patch
---

Clamp out-of-range `InputNumber` and `InputNumberMax` values to `min`/`max` instead of dropping the character that breaches the bound, which kept the longest in-range prefix and so replaced the value with a different number: `60` rendered as `6` in a field with `max={59}`, and `101` as `10` with `max={100}`, for typed, pasted and controlled values alike. `max` is a hard ceiling, so an out-of-range error state must be rendered through the `alert` property rather than by setting `max`. `min` is raised on a committed value but cannot block partial input, so a minimum a user must not breach needs form validation.
