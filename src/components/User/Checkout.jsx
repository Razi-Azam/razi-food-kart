import React, { useContext, useState } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { AuthContext } from '../../contexts/AuthContext'
import { apiClient } from '../../api/api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function fakeProcessPayment(card) {
  return new Promise((res) => setTimeout(() => res({ success: true, txn: 'txn_' + Date.now() }), 1500))
}

export default function Checkout() {
  const { cart, clear, total } = useContext(CartContext)
  const { user } = useContext(AuthContext)
  const [processing, setProcessing] = useState(false)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    if (!user) return toast.error('Please login to checkout')
    if (!cart.items.length) return toast.error('Cart empty')

    setProcessing(true)
    try {
      const payment = await fakeProcessPayment({})
      if (!payment.success) throw new Error('Payment failed')

      // Expand items: fetch item names from API (so order includes item names)
      const expandedItems = await Promise.all(cart.items.map(async (ci) => {
        // ci.id is item id
        const res = await apiClient.get(`/items/${ci.id}`)
        const itemData = res.data
        return {
          itemId: ci.id,
          name: itemData.name || ci.name,
          qty: ci.qty,
          price: ci.price,
        }
      }))

      const restaurantId = cart.items[0].restaurantId || null

      const order = {
        userId: user.id,
        userName: user.name || user.username || user.email,
        userEmail: user.email,
        restaurantId,
        items: expandedItems,
        total,
        status: 'Order placed',
        createdAt: new Date().toISOString(),
        rating: null
      }

      const res = await apiClient.post('/orders', order)
      clear()
      toast.success('Order placed!')
      navigate(`/order/${res.data.id}`)
    } catch (err) {
      toast.error(err.message || 'Checkout failed')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="container mt-4 container-compact">
      <div className="card p-4">
        <h4>Checkout</h4>
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Card (simulation)</label>
            <input className="form-control" placeholder="4242 4242 4242 4242" required />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div>Total: <strong>₹{total}</strong></div>
            <button className="btn btn-primary" disabled={processing}>{processing ? 'Processing...' : 'Pay (Demo)'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
