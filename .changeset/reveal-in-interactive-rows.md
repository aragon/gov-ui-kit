---
"@aragon/gov-ui-kit": patch
---

Restored the address reveal inside interactive rows. 2.11.0 dropped it along with the copy control whenever a member, DAO, vote or transaction item was a link or had an `onClick`, which is how consumers render those items, so the reveal disappeared from the surfaces it was built for. `AddressOutput` now takes a `hasInteractiveAncestor` prop: the reveal hangs off a non-focusable trigger and the copy control defaults away, so the address still reveals on hover without nesting a control inside the row, adding a tab stop, or competing for the row's click. Keyboard and tap reveal remain unavailable on those rows until the row container itself changes. Added the interactive-item stories that would have caught this.
