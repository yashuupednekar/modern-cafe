import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import API_URL from '../../services/config'

function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm]       = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name:     form.name,
          email:    form.email,
          phone:    form.phone,
          password: form.password
        })
      })
      const data = await res.json()

      if (data.success) {
        navigate('/login')
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: 8,
    border: '2px solid var(--beige)',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.95rem',
    outline: 'none',
    color: 'var(--text-dark)',
    boxSizing: 'border-box'
  }

  const labelStyle = {
    display: 'block',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    fontSize: '0.9rem',
    color: 'var(--text-dark)',
    marginBottom: '0.4rem'
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{
        flex: 1,
        backgroundColor: 'var(--off-white)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 2rem'
      }}>
        <div style={{
          backgroundColor: '#fff',
          borderRadius: 16,
          padding: '2.5rem',
          width: '100%',
          maxWidth: 420,
          boxShadow: '0 4px 24px rgba(44,26,14,0.1)'
        }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{
              fontFamily: 'Playfair Display, serif',
              color: 'var(--espresso)',
              fontSize: '2rem',
              fontWeight: 700,
              marginBottom: '0.5rem'
            }}>
              Create Account
            </h1>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              color: 'var(--text-light)',
              fontSize: '0.95rem'
            }}>
              Join Modern Cafe today
            </p>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              padding: '0.75rem 1rem',
              borderRadius: 8,
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.9rem',
              marginBottom: '1.25rem'
            }}>
              {error}
            </div>
          )}

          {/* Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            <div>
              <label style={labelStyle}>Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Yash Upednekar"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Phone (optional)</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Min 6 characters"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                style={inputStyle}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                backgroundColor: 'var(--espresso)',
                color: 'var(--cream)',
                padding: '0.85rem',
                border: 'none',
                borderRadius: 8,
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '1rem',
                opacity: loading ? 0.7 : 1,
                marginTop: '0.5rem'
              }}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>

          </div>

          {/* Login link */}
          <p style={{
            textAlign: 'center',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.9rem',
            color: 'var(--text-light)',
            marginTop: '1.5rem'
          }}>
            Already have an account?{' '}
            <Link to="/login" style={{
              color: 'var(--caramel)',
              fontWeight: 600,
              textDecoration: 'none'
            }}>
              Login
            </Link>
          </p>

        </div>
      </main>

      <Footer />
    </div>
  )
}

export default RegisterPage