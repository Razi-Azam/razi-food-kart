// src/components/Common/Header.jsx
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { CartContext } from '../../contexts/CartContext'
import brandLogoTransparent from '../../assets/brand-logo-transparent.png'

export default function Header() {
  const { user, logout } = useContext(AuthContext)
  const { cart } = useContext(CartContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    // call logout from context (which should clear localStorage/user)
    if (logout) logout()
    // optional: also remove any other local keys
    localStorage.removeItem('razi_cart')
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg 
        navbar-dark  bg-dark shadow-lg bg-body-primary 
        border border-start-0 border-top-0 border-end-0 border-info"
    >
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img
            src={brandLogoTransparent}
            alt="Brand Logo"
            className="card-img-top"
            style={{ height: 100, width: "auto", objectFit: 'cover' }}
          />
            Razi Food Kart
        </Link>

        <div className="d-flex align-items-center">
          <Link to="/cart" className="btn btn-outline-info me-2">Cart ({cart?.items?.length || 0}) 🛒 </Link>

          {!user ? (
            <>
              <Link to="/login" className="btn btn-primary me-2">Login</Link>
              <Link to="/signup" className="btn btn-outline-secondary">Sign up</Link>
            </>
          ) : (
            <div className="dropdown">
              <button
                type="button"
                className="btn btn-light dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {user.name}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                {user.role === 'owner' && (
                  <li>
                    <Link className="dropdown-item" to="/owner">Owner Dashboard</Link>
                  </li>
                )}
                <li>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={handleLogout}   // <-- call the function
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
