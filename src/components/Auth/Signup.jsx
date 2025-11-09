import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { toast } from 'react-toastify'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const { signup } = useContext(AuthContext)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      const payload = { name, email, password, role }
      if (role === 'owner') payload.restaurantId = null
      await signup(payload)
      toast.success('Account created')
      navigate('/')
    } catch (err) {
      toast.error(err.message || 'Signup failed')
    }
  }

  return (
    <div className="container mt-4 container-compact">
      <div className="card p-4">
        <h4>Sign up</h4>
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Full name</label>
            <input className="form-control" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Role</label>
            <select className="form-select" value={role} onChange={e => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="owner">Restaurant Owner</option>
            </select>
          </div>
          <button className="btn btn-primary">Create account</button>
        </form>
      </div>
    </div>
  )
}
