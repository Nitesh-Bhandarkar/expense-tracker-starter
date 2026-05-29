# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install      # install dependencies (required before first run)
npm run dev      # start dev server at http://localhost:5173
npm run build    # production build
npm run lint     # run ESLint
npm run preview  # preview production build locally
```

There are no tests in this project.

## Architecture

This is a single-page React app (Vite + React 19) split across five components:

- **`App`** (`src/App.jsx`) — root component. Owns `transactions` and `filterMonth` as shared state. Derives the `months` array (unique months from transactions + current month, sorted descending). Passes `filterMonth`, `setFilterMonth`, and `months` down to both `SpendingChart` and `TransactionList` so they stay in sync. Passes `onAdd`/`onDelete` callbacks to the relevant components.
- **`Summary`** (`src/Summary.jsx`) — receives `transactions`, derives `totalIncome`, `totalExpenses`, and `balance` internally, and renders three summary cards. Uses `en-IN` locale for INR formatting.
- **`AddTransaction`** (`src/AddTransaction.jsx`) — owns its own form field state (`description`, `amount`, `type`, `category`, `date`). Date defaults to today; falls back to today if cleared. Validates that amount is a positive number and description is non-empty after trimming. Calls `onAdd(transaction)` on submit.
- **`SpendingChart`** (`src/SpendingChart.jsx`) — receives `transactions`, `filterMonth`, `setFilterMonth`, and `months`. Renders a recharts `BarChart` of expenses grouped by category for the selected month. Hosts the shared month dropdown that controls both the chart and the transaction list. Shows an empty state if no expenses exist for the period.
- **`TransactionList`** (`src/TransactionList.jsx`) — receives `transactions`, `onDelete`, `filterMonth`, `setFilterMonth`, and `months`. Owns `filterType`/`filterCategory` state internally. Sorts transactions in reverse chronological order before filtering. Renders a filterable table with colored category badges and a hover/focus-reveal delete button.

## State flow

```
App
├── transactions          (source of truth)
├── filterMonth           (shared between chart and list)
└── months[]              (derived from transactions)
    ├── → SpendingChart   (renders month dropdown + chart)
    └── → TransactionList (renders month dropdown in filters row + table)
```

There is no context, router, or external store — all state flows via props.

## Styling

- `src/App.css` — all styles, no CSS framework. Uses CSS custom properties (`--bg`, `--surface`, `--accent`, `--income`, `--expense`, etc.) defined in `:root`.
- Dark theme: obsidian background (`#080b14`) with indigo accent (`#818cf8`), emerald income (`#34d399`), rose expense (`#fb7185`).
- Fonts: `Bricolage Grotesque` (headings/numerals) and `Manrope` (body), loaded from Google Fonts.
- Category badges use per-category color classes: `cat-food`, `cat-housing`, `cat-utilities`, `cat-transport`, `cat-entertainment`, `cat-salary`, `cat-other`.

## Currency

All amounts are formatted in INR (₹) using `en-IN` locale. The `formatCurrency` pattern used throughout: `'₹' + n.toLocaleString('en-IN', { minimumFractionDigits: 2 })`.

## Dependencies

- `recharts` — bar chart in `SpendingChart`. Uses `BarChart`, `Bar`, `XAxis`, `YAxis`, `Tooltip`, `Cell`, `CartesianGrid`, `ResponsiveContainer`.
