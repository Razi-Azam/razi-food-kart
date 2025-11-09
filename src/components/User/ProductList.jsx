import React, { useEffect, useState } from 'react'
import { apiClient } from '../../api/api'
import ItemCard from './ItemCard'

export default function ProductList() {
  const [items, setItems] = useState([])
  const [restaurants, setRestaurants] = useState([])
  const [q, setQ] = useState('')

  useEffect(() => { load() }, [])

  const load = async () => {
    try {
      const [ir, rr] = await Promise.all([apiClient.get('/items'), apiClient.get('/restaurants')])
      setItems(ir.data)
      setRestaurants(rr.data)
    } catch (err) {
      console.error(err)
    }
  }

  const merged = items.map(it => ({ ...it, restaurant: restaurants.find(r => String(r.id) === String(it.restaurantId)) }))
  const filtered = merged.filter(m => {
    const qq = q.toLowerCase()
    return m.name.toLowerCase().includes(qq) || (m.restaurant && m.restaurant.name.toLowerCase().includes(qq))
  })

  return (
    <div className="container mt-4 container-compact">
      <h3 className='text-warning text-sm'>Your Delicious Food is waiting for you. Order Now!</h3>
      <div className="d-flex mb-3">
        <input className="form-control me-2 my-4" 
          placeholder="Search Your favourite Food 🍝 or Restaurant 🍽️" 
          value={q} onChange={e => setQ(e.target.value)} />
      </div>
      <div className="row g-3">
        {filtered.map(item => (
          <div className="col-md-4" key={item.id}>
            <ItemCard item={item} restaurant={item.restaurant} />
          </div>
        ))}
      </div>
    </div>
  )
}
