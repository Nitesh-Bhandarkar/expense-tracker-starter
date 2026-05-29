import { useState } from 'react'

const categories = ["food", "housing", "utilities", "transport", "entertainment", "salary", "other"];

const todayStr = () => new Date().toISOString().split('T')[0]

function AddTransaction({ onAdd }) {
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [type, setType] = useState("expense")
  const [category, setCategory] = useState("food")
  const [date, setDate] = useState(todayStr)

  const handleSubmit = (e) => {
    e.preventDefault()
    const parsed = parseFloat(amount)
    if (!description.trim() || !parsed || parsed <= 0) return

    onAdd({
      id: Date.now(),
      description: description.trim(),
      amount: parsed,
      type,
      category,
      date: date || todayStr(),
    })

    setDescription("")
    setAmount("")
    setType("expense")
    setCategory("food")
    setDate(todayStr())
  }

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default AddTransaction
