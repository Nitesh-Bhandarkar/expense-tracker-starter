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

This is a single-page React app (Vite + React 19) split across four components:

- **`App`** (`src/App.jsx`) — root component. Owns the `transactions` array (the only shared state) and passes it down. Passes an `onAdd` callback to `AddTransaction` to append new transactions.
- **`Summary`** (`src/Summary.jsx`) — receives `transactions`, derives `totalIncome`, `totalExpenses`, and `balance` internally, and renders the three summary cards.
- **`AddTransaction`** (`src/AddTransaction.jsx`) — owns its own form field state (`description`, `amount`, `type`, `category`). Calls `onAdd(transaction)` on submit with `amount` stored as a `parseFloat` number.
- **`TransactionList`** (`src/TransactionList.jsx`) — receives `transactions`, owns `filterType`/`filterCategory` state internally, and renders the filtered table.

There is no context, router, or external store — all state flows via props. Styling is plain CSS in `src/App.css` with no framework. The `.delete-btn` class exists in the CSS but delete functionality is not yet implemented.
