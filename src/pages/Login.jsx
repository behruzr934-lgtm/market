import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../redux/slices/authSlice'
import './Login.css'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const getStoredUsers = () => {
  try {
    const users = localStorage.getItem('users')
    return users ? JSON.parse(users) : []
  } catch {
    return []
  }
}

const Login = () => {
  const [showIntro, setShowIntro] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => {
      setShowIntro(false)
      setShowForm(true)
    }, 2000)
    return () => clearTimeout(t)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
   
    if (!email.trim()) return setError('Email kiriting')
    if (!password || password.length < 6) return setError('Parol kamida 6 belgidan iborat bolishi kerak')

    setLoading(true)
    try{
      const request = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password })
      }) 
      const data = await request.json()
      console.log(data);
      
      if (request.ok) {
        alert('Tizimga muvaffaqiyatli kirdingiz')
        dispatch(loginSuccess(data))
        navigate('/')
      } else{
        setError(data.message || 'Login muvaffaqiyatsiz')
      }
    }catch(e) {
        setError('Xatolik yuz berdi')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 px-6">
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              initial={{ rotate: -6 }}
              animate={{ rotate: 6 }}
              transition={{ yoyo: Infinity, duration: 2 }}
              className="text-center text-white"
            >
              <div className="cosmic-wrap">
                <h1 className="cosmic-text">LOGIN</h1>
                <div className="cosmic-sub">Kirish uchun kuting...</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="glass-card w-full max-w-md p-8 relative z-10"
        >
          <h2 className="text-2xl font-bold text-white mb-2">Tizimga kirish</h2>
          <p className="text-sm text-slate-300 mb-6">Email va parol bilan tizimga kiring</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
              <label className="block text-sm text-slate-200 mb-2">Email</label>
              <input
                className="w-full px-4 py-3 rounded-lg bg-white/5 text-white placeholder-slate-400 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@domain.com"
                type="text"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
              <label className="block text-sm text-slate-200 mb-2">Parol</label>
              <input
                className="w-full px-4 py-3 rounded-lg bg-white/5 text-white placeholder-slate-400 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                type="password"
              />
            </motion.div>

            {error && <div className="text-sm text-pink-400 font-semibold">{error}</div>}

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}>
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-600 to-pink-500 text-white font-semibold"
              >
                {loading ? 'Yuborilmoqda...' : 'Kirish'}
              </button>
            </motion.div>
          </form>

          <div className="mt-4 text-sm text-slate-300 text-center">
            Hisobingiz yoqmi? <Link to="/register" className="text-pink-400 font-semibold">Royxatdan otish</Link>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Login
