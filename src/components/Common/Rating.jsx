import React, { useState } from 'react'

export default function Rating({ value = 0, onSubmit }) {
  const [rating, setRating] = useState(value)
  const submit = () => { if (onSubmit) onSubmit(rating) }
  return (
    <div>
      <div className="mb-2">Your rating: {rating} / 5</div>
      <div className="mb-2">
        {[1,2,3,4,5].map(n => (
          <button
            key={n}
            type="button"
            className={`btn btn-sm me-1 ${n <= rating ? 'btn-warning' : 'btn-outline-secondary'}`}
            onClick={() => setRating(n)}
          >
            {n}
          </button>
        ))}
      </div>
      <button type="button" className="btn btn-primary btn-sm" onClick={submit}>Submit Rating</button>
    </div>
  )
}
