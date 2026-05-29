function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpenses

  const fmt = (n) =>
    '₹' + Math.abs(n).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })

  return (
    <div className="summary">
      <div className="summary-card income-card">
        <div className="card-label">Income</div>
        <div className="card-amount income-amount">{fmt(totalIncome)}</div>
      </div>
      <div className="summary-card expense-card">
        <div className="card-label">Expenses</div>
        <div className="card-amount expense-amount">{fmt(totalExpenses)}</div>
      </div>
      <div className="summary-card balance-card">
        <div className="card-label">Balance</div>
        <div className={`card-amount balance-amount ${balance >= 0 ? 'positive' : 'negative'}`}>
          {balance < 0 ? '−' : ''}{fmt(balance)}
        </div>
      </div>
    </div>
  )
}

export default Summary
