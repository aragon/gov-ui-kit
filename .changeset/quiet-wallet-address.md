---
"@aragon/gov-ui-kit": patch
---

Removed the nested copy and reveal controls that `AddressOutput` rendered inside interactive containers. The address now stays plain text in the `Wallet` button, in `AssetTransfer`, in the transaction data list item, and in the member, DAO and vote data list items whenever the item itself is a link or a button.
