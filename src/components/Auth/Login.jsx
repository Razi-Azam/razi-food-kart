import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { toast } from 'react-toastify'
import AuthSidePanel from './AuthSidePanel'
import foodTransparent from '../../assets/food-transparent-bg.png'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
      toast.success('Logged in')
      navigate('/')
    } catch (err) {
      toast.error(err.message || 'Login failed')
    }
  }

 return (
  <div className="container mt-4">
    <div className="row p-0" style={{ minHeight: "200px" }}>
      
      {/* LEFT SIDE PANEL */}
      <div className="col-md-6 p-0 d-none d-md-block p-2">
        <AuthSidePanel />
      </div>

      {/* RIGHT SIDE (LOGIN FORM) */}
      <div className="col-md-6 mt-4 p-4 border border-info text-white">
        <h4>Login</h4>
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input 
              className="form-control" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input 
              type="password"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button className="btn btn-primary w-100">Login</button>
        </form>
            <img 
                src={foodTransparent} 
                alt="Auth Banner"
                style={{ width: "100%", marginTop: "20px"}}
                className='center'
              />
      </div>

    </div>
  </div>
);
}