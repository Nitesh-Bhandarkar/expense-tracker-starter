import { useState } from 'react'

const categories = ['food', 'housing', 'utilities', 'transport', 'entertainment', 'salary', 'other']

const CAT_CLASS = {
  food: 'cat-food',
  housing: 'cat-housing',
  utilities: 'cat-utilities',
  transport: 'cat-transport',
  entertainment: 'cat-entertainment',
  salary: 'cat-salary',
  other: 'cat-other',
}

function formatDate(str) {
  const d = new Date(str + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function formatAmount(amount) {
  return '₹' + amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function TransactionList({ transactions, onDelete }) {
  const [filterType, setFilterType] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')

  let filtered = transactions
  if (filterType !== 'all') filtered = filtered.filter(t => t.type === filterType)
  if (filterCategory !== 'all') filtered = filtered.filter(t => t.category === filterCategory)

  return (
    <div className="transactions">
      <div className="transactions-header">
        <h2>Transactions</h2>
        <div className="filters">
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">No transactions found</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id}>
                <td className="date-cell">{formatDate(t.date)}</td>
                <td className="desc-cell">{t.description}</td>
                <td>
                  <span className={`category-badge ${CAT_CLASS[t.category] || 'cat-other'}`}>
                    {t.category}
                  </span>
                </td>
                <td>
                  <span className={t.type === 'income' ? 'amount-income' : 'amount-expense'}>
                    {t.type === 'income' ? '+' : '−'}{formatAmount(t.amount)}
                  </span>
                </td>
                <td>
                  <button
                    className="delete-btn"
                    aria-label={`Delete ${t.description}`}
                    onClick={() => {
                      if (window.confirm('Delete this transaction?')) onDelete(t.id)
                    }}
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default TransactionList
