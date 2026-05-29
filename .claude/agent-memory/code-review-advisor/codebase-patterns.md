---
name: codebase-patterns
description: Recurring bugs, conventions, and patterns observed in the expense tracker codebase across reviews
metadata:
  type: project
---

## Confirmed Conventions
- `amount` is always stored as `parseFloat` number, never a string (enforced in AddTransaction.handleSubmit)
- IDs are generated with `Date.now()` — unique enough for a single-user SPA but not collision-proof under rapid submission
- Categories are a fixed set defined as a module-level `const` array in both AddTransaction and TransactionList (duplicated — not shared)
- State flows via props only; no Context, Redux, or external store
- All styles in src/App.css using CSS custom properties (no framework)
- Currency symbol: ₹ (Indian Rupee), locale: en-IN

## Known Bugs / Issues Found (first full review, 2026-05-29)
- **Seed data bug**: id:4 "Freelance Work" is typed as `type: "expense"` but categorized as `"salary"` — almost certainly should be `type: "income"`. This causes the Summary balance and chart to be wrong out of the box.
- **Amount validation gap**: `parseFloat("")` returns `NaN`; the guard `if (!amount)` catches empty string but a user typing spaces or entering `0` as amount passes through. A `0` amount is technically accepted.
- **`0` amount allowed**: `if (!amount)` — numeric `0` is falsy, so a zero-amount transaction is blocked, but the string `"0"` is truthy and passes, creating a ₹0.00 transaction.
- **`Date.now()` ID collisions**: rapid double-submission within the same millisecond would produce duplicate IDs (minor in practice for a SPA).
- **`handleAdd` uses stale closure**: `setTransactions([...transactions, transaction])` captures `transactions` at call time rather than using functional update form. Should be `setTransactions(prev => [...prev, transaction])`.
- **Negative/zero amount not guarded**: No `amount > 0` check; a user can submit negative amounts via the number input (typing `-50`) which would corrupt Summary totals.
- **`window.confirm` for delete**: Acceptable for a simple SPA but blocks the main thread and looks out-of-place in a polished dark-themed UI.
- **`categories` array duplicated**: Defined identically in both AddTransaction.jsx and TransactionList.jsx. Should live in a shared constants file.
- **SpendingChart Cell key uses array index**: `key={index}` on recharts `<Cell>` — fine here since the array is derived and not reordered interactively, but worth noting.
- **`formatAmount` always shows 2 decimal places** in TransactionList, but Summary `fmt` rounds to 0 decimals — inconsistent presentation of the same data.
- **Delete button opacity-0 by default**: Only visible on row hover (CSS). This is a pure-CSS pattern that is inaccessible via keyboard navigation (focus doesn't trigger `tbody tr:hover`).
- **Header subtitle hardcoded**: "January 2025" is a static string — won't update as transactions are added for different months.
- **No `aria-label` on delete button**: The ✕ character has no accessible label; screen readers announce only "button" with no description of which transaction is being deleted.
- **`handleAdd` missing `useCallback`**: Minor for this scale, but worth noting as a convention if the app grows.

## Positive Patterns
- `formatDate` appends `T00:00:00` to avoid UTC-offset date shift — good defensive coding.
- `CAT_CLASS` fallback to `'cat-other'` for unknown categories is robust.
- Functional filter chaining in TransactionList is clean and readable.
- CSS custom properties used consistently throughout — easy to theme.
- `SpendingChart` returns `null` when there's no expense data — clean empty-state handling.
