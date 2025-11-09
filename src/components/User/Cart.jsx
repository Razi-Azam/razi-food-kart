import React, { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Cart() {
  const { cart, updateQty, remove, total } = useContext(CartContext)
  const navigate = useNavigate()

  return (
    <div className="container mt-4 container-compact">
      <h4>Your Cart</h4>
      {cart.items.length === 0 ? (
        <div className="card p-4">Your cart is empty. <Link to="/">Shop now</Link></div>
      ) : (
        <div className="card p-3">
          <table className="table">
            <thead><tr><th>Item</th><th>Qty</th><th>Price</th><th></th></tr></thead>
            <tbody>
              {cart.items.map(it => (
                <tr key={it.id}>
                  <td>{it.name}</td>
                  <td>
                    <input type="number" value={it.qty} min={1} onChange={e => updateQty(it.id, Number(e.target.value))} style={{width:80}} />
                  </td>
                  <td>₹{it.price * it.qty}</td>
                  <td><button className="btn btn-sm btn-danger" onClick={() => remove(it.id)}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-between align-items-center">
            <div>Total: <strong>₹{total}</strong></div>
            <div>
              <button className="btn btn-outline-secondary me-2" onClick={() => navigate('/')}>Continue shopping</button>
              <Link to="/checkout" className="btn btn-primary">Checkout</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
