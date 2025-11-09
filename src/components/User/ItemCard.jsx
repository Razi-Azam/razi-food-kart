import React, { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'

export default function ItemCard({ item, restaurant }) {
  const { addToCart } = useContext(CartContext)
  // attach restaurantId to the item object for checkout grouping
  const itemWithMeta = { ...item, restaurantId: item.restaurantId }

  return (
    <div className="card h-100">
      <img
        src={item.image || '/images/foods/default.jpg'}
        alt={item.name}
        className="card-img-top"
        style={{ height: 150, objectFit: 'cover' }}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{item.name}</h5>
        <p className="mb-1 small">{restaurant?.name}</p>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <div>₹{item.price}</div>
          <button className="btn btn-sm btn-primary" onClick={() => addToCart(itemWithMeta)}>Add</button>
        </div>
      </div>
    </div>
  )
}
