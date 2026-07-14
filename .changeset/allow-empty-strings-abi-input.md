---
"@aragon/gov-ui-kit": patch
---

Allow empty strings on `ProposalActionsDecoder` string parameters (empty strings are valid Solidity values, including elements inside `string[]` inputs), skip validation on hidden tuple registration fields to avoid invisible submit-blocking errors, and keep the array index label and remove button aligned to the input when a validation alert is displayed.
