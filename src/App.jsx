import { useState } from 'react'
import './App.css'
import Summary from './Summary'
import AddTransaction from './AddTransaction'
import TransactionList from './TransactionList'
import SpendingChart from './SpendingChart'

const currentMonth = new Date().toISOString().slice(0, 7)

function App() {
  const [transactions, setTransactions] = useState([
    { id: 1, description: "Salary", amount: 5000, type: "income", category: "salary", date: "2025-01-01" },
    { id: 2, description: "Rent", amount: 1200, type: "expense", category: "housing", date: "2025-01-02" },
    { id: 3, description: "Groceries", amount: 150, type: "expense", category: "food", date: "2025-01-03" },
    { id: 4, description: "Freelance Work", amount: 800, type: "income", category: "salary", date: "2025-01-05" },
    { id: 5, description: "Electric Bill", amount: 95, type: "expense", category: "utilities", date: "2025-01-06" },
    { id: 6, description: "Dinner Out", amount: 65, type: "expense", category: "food", date: "2025-01-07" },
    { id: 7, description: "Gas", amount: 45, type: "expense", category: "transport", date: "2025-01-08" },
    { id: 8, description: "Netflix", amount: 15, type: "expense", category: "entertainment", date: "2025-01-10" },
  ]);

  const [filterMonth, setFilterMonth] = useState(currentMonth)

  const months = [...new Set([
    ...transactions.map(t => t.date.slice(0, 7)),
    currentMonth,
  ])].sort().reverse()

  const handleAdd = (transaction) => {
    setTransactions(prev => [...prev, transaction]);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <div className="logo-mark">◈</div>
          <h1>Finance Tracker</h1>
        </div>
        <p className="subtitle">{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
      </header>

      <Summary transactions={transactions} />
      <AddTransaction onAdd={handleAdd} />
      <SpendingChart
        transactions={transactions}
        filterMonth={filterMonth}
        setFilterMonth={setFilterMonth}
        months={months}
      />
      <TransactionList
        transactions={transactions}
        onDelete={handleDelete}
        filterMonth={filterMonth}
        setFilterMonth={setFilterMonth}
        months={months}
      />
    </div>
  );
}

export default App
