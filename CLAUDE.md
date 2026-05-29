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

This is a single-page React app (Vite + React 19) with all logic in one file: `src/App.jsx`.

**State** lives entirely in `App` — no context, no external store:
- `transactions` — array of `{ id, description, amount, type, category, date }`. `amount` is stored as a **string** (not a number), which causes the summary totals to concatenate instead of add — a known intentional bug for the course.
- `description`, `amount`, `type`, `category` — controlled form inputs for adding a new transaction.
- `filterType`, `filterCategory` — drive the filtered view of the transaction list.

**Derived values** (totalIncome, totalExpenses, balance, filteredTransactions) are computed inline on each render from `transactions` state.

**Styling** is plain CSS in `src/App.css` with no CSS framework. The `.delete-btn` class exists in the CSS but the delete button is not yet wired up in the JSX — another intentional gap.

The app is a course starter project; it intentionally contains a bug (string arithmetic in totals), missing delete functionality, and rough UI — these are meant to be fixed as exercises.
