---
'@aragon/gov-ui-kit': minor
---

Add wagmi v3 support and optimize imports

- **wagmi v3 compatibility**: Updated peer dependency from `^2.19.0` to `^2.19.0 || ^3.0.0` (non-breaking, supports both
  v2 and v3)
- **Import path optimization**: Moved chain definitions from `wagmi/chains` to `viem/chains` (the canonical source,
  works with both v2 and v3)
- **Removed overrides**: Eliminated `@reown/appkit` version override that is no longer needed
