---
"@aragon/gov-ui-kit": minor
---

Enforce EVM-stringent validation on `ProposalActionsDecoder` inputs: validate signed `int*` values (previously unvalidated), check that numeric values fit the bit-width of their type (e.g. `uint8` must be 0-255), verify EIP-55 address checksums (all-lowercase addresses are still accepted), and strip negative signs from unsigned number inputs. Adds `signedNumber` and `numberRange` messages to the `proposalActionsDecoder.validation` copy.
