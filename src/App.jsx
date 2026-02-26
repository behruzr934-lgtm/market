import React from 'react'
import Navbar from './components/Navbar'
import Product from './components/Product'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => {
  const location = useLocation()
  const hideNav = location.pathname === '/login' || location.pathname === '/register'

  return (
    <div>
      {!hideNav && <Navbar />}
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App