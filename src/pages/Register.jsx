import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { registerSuccess } from '../redux/slices/authSlice'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const getStoredUsers = () => {
  try {
    const users = localStorage.getItem('users')
    return users ? JSON.parse(users) : []
  } catch {
    return []
  }
}

const saveUser = (user) => {
  const users = getStoredUsers()
  users.push(user)
  localStorage.setItem('users', JSON.stringify(users))
}

const fileToBase64 = (file) => new Promise((res, rej) => {
  const reader = new FileReader()
  reader.onload = () => res(reader.result)
  reader.onerror = rej
  reader.readAsDataURL(file)
})

const Register = () => {
  const [showIntro, setShowIntro] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [avatar, setAvatar] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
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

  const handleAvatar = async (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const data = await fileToBase64(file)
      setAvatar(data)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (!fullName.trim()) return setError('Ismingizni kiriting')
    if (!email.trim()) return setError('Email kiriting')
    if (!emailRegex.test(email)) return setError('Notogri email')
    if (!password || password.length < 6) return setError('Parol kamida 6 belgidan iborat bolishi kerak')
    if (password !== confirmPassword) return setError('Parollar mos emas')

    const users = getStoredUsers()
    if (users.find(u => u.email === email)) return setError('Bu email allaqachon royxatdan otgan')

    setLoading(true)
    const newUser = {
      id: Date.now(),
      fullName,
      email,
      password,
      avatar: avatar || null,
      createdAt: new Date().toISOString()
    }

    setTimeout(() => {
      saveUser(newUser)
      dispatch(registerSuccess(newUser))
      localStorage.setItem('user', JSON.stringify(newUser))
      setLoading(false)
      setSuccess('Royxatdan otish muvaffaqiyatli')
      setTimeout(() => navigate('/'), 900)
    }, 700)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 px-6">
      {showIntro ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.div animate={{ scale: [0.95, 1.05, 0.95] }} transition={{ duration: 1.6, repeat: Infinity }} className="text-center text-white">
            <div className="text-6xl font-black tracking-wide">REDAX</div>
            <div className="mt-3 text-sm text-slate-300">Create an account</div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="glass-card w-full max-w-md p-8 relative z-10">
          <h2 className="text-2xl font-bold text-white mb-2">Royxatdan otish</h2>
          <p className="text-sm text-slate-300 mb-6">Minimal va xavfsiz - faqat frontend demo</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-200 mb-2">Toliq ism</label>
              <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-white/5 text-white placeholder-slate-400 focus:outline-none" />
            </div>

            <div>
              <label className="block text-sm text-slate-200 mb-2">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-white/5 text-white placeholder-slate-400 focus:outline-none" type="email" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-slate-200 mb-2">Parol</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-white/5 text-white placeholder-slate-400 focus:outline-none" type="password" />
              </div>
              <div>
                <label className="block text-sm text-slate-200 mb-2">Parolni tasdiqlang</label>
                <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-white/5 text-white placeholder-slate-400 focus:outline-none" type="password" />
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-200 mb-2">Profil rasmi (ixtiyoriy)</label>
              <input onChange={handleAvatar} type="file" accept="image/*" className="w-full text-sm text-slate-300" />
              {avatar && <img src={avatar} alt="avatar" className="w-16 h-16 rounded-full mt-3" />}
            </div>

            {error && <div className="text-sm text-pink-400 font-semibold">{error}</div>}
            {success && <div className="text-sm text-green-400 font-semibold">{success}</div>}

            <div>
              <button type="submit" className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-600 to-pink-500 text-white font-semibold">{loading ? 'Yuborilmoqda...' : 'Royxatdan otish'}</button>
            </div>
          </form>

          <div className="mt-4 text-sm text-slate-300 text-center">
            Hisobingiz bormi? <Link to="/login" className="text-pink-400 font-semibold">Kirish</Link>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Register
