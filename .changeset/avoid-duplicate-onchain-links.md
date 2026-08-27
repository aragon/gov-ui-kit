---
"@aragon/gov-ui-kit": patch
---

Move `AddressOutput` and `addressUtils` to the core package layer and let `DefinitionList.Item` render on-chain
entity values as address outputs directly, without duplicating link props on children.
