import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, CartesianGrid, ResponsiveContainer } from 'recharts'

const COLORS = ['#818cf8', '#34d399', '#fb7185', '#fbbf24', '#22d3ee', '#e879f9', '#94a3b8']

const tooltipStyle = {
  contentStyle: {
    background: '#0d1020',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 10,
    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    padding: '10px 14px',
  },
  labelStyle: { color: '#eeeeff', fontSize: 12, fontWeight: 600, marginBottom: 2 },
  itemStyle: { color: '#7878a0', fontSize: 12 },
  cursor: { fill: 'rgba(255,255,255,0.025)' },
}

function formatMonthLabel(ym) {
  const [y, m] = ym.split('-')
  return new Date(parseInt(y), parseInt(m) - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

function SpendingChart({ transactions, filterMonth, setFilterMonth, months }) {
  const visible = filterMonth === 'all'
    ? transactions
    : transactions.filter(t => t.date.startsWith(filterMonth))

  const expensesByCategory = visible
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount
      return acc
    }, {})

  const data = Object.entries(expensesByCategory)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)

  return (
    <div className="spending-chart">
      <div className="chart-header">
        <h2>Spending by Category</h2>
        <select
          className="month-select"
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
        >
          <option value="all">All Time</option>
          {months.map(m => (
            <option key={m} value={m}>{formatMonthLabel(m)}</option>
          ))}
        </select>
      </div>

      {data.length === 0 ? (
        <div className="empty-state">No expenses for this period</div>
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: '#7878a0', fontFamily: 'Manrope' }}
              axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => `₹${v}`}
              tick={{ fontSize: 11, fill: '#7878a0', fontFamily: 'Manrope' }}
              axisLine={false}
              tickLine={false}
              width={48}
            />
            <Tooltip
              formatter={(value) => [`₹${value.toFixed(2)}`, 'Spent']}
              {...tooltipStyle}
            />
            <Bar dataKey="value" radius={[5, 5, 0, 0]} maxBarSize={56}>
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} fillOpacity={0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

export default SpendingChart
