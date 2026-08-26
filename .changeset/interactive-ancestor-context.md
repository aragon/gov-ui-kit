---
"@aragon/gov-ui-kit": minor
---

`AddressOutput` now takes its `copy` and `reveal` defaults from its container: both stay `true` standalone and become `false` inside an interactive element such as a link, an interactive `DataList.Item` row, or the `Wallet` button, where a nested control is invalid markup and competes with the container for the click. Pass either prop explicitly to override, as `ProposalDataListItem` and `SmartContractFunctionDataListItem` do for their isolated links. Containers built outside the kit can mark themselves with the newly exported `InteractiveAncestorProvider`.
