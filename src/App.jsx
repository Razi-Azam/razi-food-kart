import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Common/Header'
import Footer from './components/Common/Footer'
import ProductList from './components/User/ProductList'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import Cart from './components/User/Cart'
import Checkout from './components/User/Checkout'
import OwnerDashboard from './components/Owner/OwnerDashboard'
import OrderStatusPage from './components/User/OrderStatusPage'
import ProtectedRoute from './components/Common/ProtectedRoute'
import { ToastContainer } from 'react-toastify'

export default function App() {
  return (
    <div className='bg-dark'>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/owner" element={<ProtectedRoute role="owner"><OwnerDashboard /></ProtectedRoute>} />
        <Route path="/order/:id" element={<ProtectedRoute><OrderStatusPage /></ProtectedRoute>} />
      </Routes>
      <Footer />
      <ToastContainer position="top-right" />
    </div>
  )
}
