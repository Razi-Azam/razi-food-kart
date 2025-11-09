import React from 'react'

const steps = ["Order placed", "Order Accepted", "Food processing", "Out for delivery", "Order delivered"]

export default function StatusBar({ status }) {
  const idx = steps.indexOf(status)
  return (
    <div className="d-flex align-items-center justify-content-between bg-white p-3 shadow-sm rounded">
      {steps.map((s, i) => (
        <div key={s} className="text-center flex-fill">
          <div className={`step-circle mb-2 ${i <= idx ? 'bg-success' : 'bg-secondary'}`}>
            {i <= idx ? '✓' : i + 1}
          </div>
          <div className="step-label">{s}</div>
        </div>
      ))}
    </div>
  )
}
