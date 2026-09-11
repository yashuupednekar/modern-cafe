import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useAuth } from '../../store/AuthContext'
import API_URL from '../../services/config'

const statusColors = {
  pending:            { bg: '#fef9c3', color: '#854d0e' },
  confirmed:          { bg: '#dbeafe', color: '#1e40af' },
  preparing:          { bg: '#fce7f3', color: '#9d174d' },
  ready:              { bg: '#d1fae5', color: '#065f46' },
  'out-for-delivery': { bg: '#e0e7ff', color: '#3730a3' },
  delivered:          { bg: '#dcfce7', color: '#14532d' },
  cancelled:          { bg: '#fee2e2', color: '#991b1b' },
}

function AccountPage() {
  const { user, logout } = useAuth()
  const navigate          = useNavigate()

  const [activeTab, setActiveTab] = useState('profile')
  const [orders, setOrders]       = useState([])
  const [loading, setLoading]     = useState(false)
  const [profile, setProfile]     = useState({ name: '', email: '', phone: '' })
  const [editing, setEditing]     = useState(false)
  const [message, setMessage]     = useState('')

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    setProfile({ name: user.name, email: user.email, phone: user.phone || '' })
  }, [user])

  useEffect(() => {
    if (activeTab === 'orders') fetchOrders()
  }, [activeTab])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const res  = await fetch(`${API_URL}/orders`, { credentials: 'include' })
      const data = await res.json()
      if (data.success) setOrders(data.orders)
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  const handleUpdateProfile = async () => {
    try {
      const res  = await fetch(`${API_URL}/auth/update-profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name: profile.name, phone: profile.phone })
      })
      const data = await res.json()
      if (data.success) {
        setMessage('Profile updated successfully ✅')
        setEditing(false)
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (err) { console.error(err) }
  }

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const tabStyle = (tab) => ({
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderBottom: activeTab === tab ? '3px solid var(--espresso)' : '3px solid transparent',
    backgroundColor: 'transparent',
    color: activeTab === tab ? 'var(--espresso)' : 'var(--text-light)',
    fontFamily: 'Inter, sans-serif',
    fontWeight: activeTab === tab ? 600 : 400,
    fontSize: '0.95rem',
    cursor: 'pointer'
  })

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: 8,
    border: '2px solid var(--beige)',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.95rem',
    outline: 'none',
    color: 'var(--text-dark)',
    boxSizing: 'border-box',
    backgroundColor: editing ? '#fff' : 'var(--off-white)'
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

      <main style={{ flex: 1, backgroundColor: 'var(--off-white)', padding: '3rem 2rem' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <h1 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--espresso)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 700 }}>
                My Account
              </h1>
              <p style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-light)', marginTop: '0.25rem' }}>
                Welcome back, {user?.name?.split(' ')[0]}! 👋
              </p>
            </div>
            <button
              onClick={handleLogout}
              style={{ backgroundColor: 'transparent', color: '#dc2626', border: '2px solid #dc2626', borderRadius: 8, padding: '0.5rem 1rem', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.9rem' }}
            >
              Logout
            </button>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--beige)', marginBottom: '2rem' }}>
            {[
              { tab: 'profile', label: '👤 Profile'  },
              { tab: 'orders',  label: '📦 My Orders' },
            ].map(({ tab, label }) => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={tabStyle(tab)}>
                {label}
              </button>
            ))}
          </div>

          {/* ── PROFILE TAB ── */}
          {activeTab === 'profile' && (
            <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: '2rem', boxShadow: '0 2px 12px rgba(44,26,14,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--espresso)', fontSize: '1.3rem' }}>
                  Profile Details
                </h2>
                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    style={{ backgroundColor: 'var(--espresso)', color: 'var(--cream)', border: 'none', borderRadius: 8, padding: '0.5rem 1rem', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.9rem' }}
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                      onClick={handleUpdateProfile}
                      style={{ backgroundColor: 'var(--espresso)', color: 'var(--cream)', border: 'none', borderRadius: 8, padding: '0.5rem 1rem', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.9rem' }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditing(false)}
                      style={{ backgroundColor: 'transparent', color: 'var(--text-dark)', border: '2px solid var(--beige)', borderRadius: 8, padding: '0.5rem 1rem', cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.9rem' }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {message && (
                <div style={{ backgroundColor: '#dcfce7', color: '#14532d', padding: '0.75rem 1rem', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  {message}
                </div>
              )}

              {/* Avatar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2rem' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', backgroundColor: 'var(--espresso)', color: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', fontWeight: 700 }}>
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p style={{ fontFamily: 'Playfair Display, serif', color: 'var(--espresso)', fontSize: '1.2rem', fontWeight: 700 }}>{user?.name}</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-light)', fontSize: '0.9rem' }}>{user?.email}</p>
                  {user?.role === 'admin' && (
                    <span style={{ backgroundColor: 'var(--caramel)', color: '#fff', padding: '0.2rem 0.6rem', borderRadius: 20, fontSize: '0.75rem', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                      Admin
                    </span>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input
                    value={profile.name}
                    onChange={e => setProfile({ ...profile, name: e.target.value })}
                    disabled={!editing}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input
                    value={profile.email}
                    disabled
                    style={{ ...inputStyle, backgroundColor: 'var(--off-white)', opacity: 0.7 }}
                  />
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '0.3rem' }}>
                    Email cannot be changed
                  </p>
                </div>
                <div>
                  <label style={labelStyle}>Phone</label>
                  <input
                    value={profile.phone}
                    onChange={e => setProfile({ ...profile, phone: e.target.value })}
                    disabled={!editing}
                    placeholder="+91 98765 43210"
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Admin Link */}
              {user?.role === 'admin' && (
                <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'var(--beige)', borderRadius: 8 }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: 'var(--espresso)', marginBottom: '0.5rem' }}>
                    Admin Access
                  </p>
                  <Link to="/admin" style={{ color: 'var(--caramel)', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.9rem' }}>
                    Go to Admin Dashboard →
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* ── ORDERS TAB ── */}
          {activeTab === 'orders' && (
            <div>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '3rem', fontFamily: 'Inter, sans-serif', color: 'var(--text-light)' }}>
                  Loading orders...
                </div>
              ) : orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(44,26,14,0.08)' }}>
                  <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</p>
                  <h2 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--espresso)', marginBottom: '0.75rem' }}>No orders yet</h2>
                  <p style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-light)', marginBottom: '1.5rem' }}>Browse our menu and place your first order!</p>
                  <Link to="/menu" style={{ backgroundColor: 'var(--espresso)', color: 'var(--cream)', padding: '0.85rem 2rem', borderRadius: 8, textDecoration: 'none', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                    Browse Menu
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {orders.map(order => (
                    <div key={order._id} style={{ backgroundColor: '#fff', borderRadius: 12, padding: '1.5rem', boxShadow: '0 2px 12px rgba(44,26,14,0.08)' }}>

                      {/* Order Header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div>
                          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'var(--text-light)', marginBottom: '0.25rem' }}>
                            Order #{order._id.slice(-8).toUpperCase()}
                          </p>
                          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'var(--text-mid)' }}>
                            {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </p>
                        </div>
                        <span style={{
                          backgroundColor: statusColors[order.orderStatus]?.bg || '#f3f4f6',
                          color: statusColors[order.orderStatus]?.color || '#374151',
                          padding: '0.35rem 0.85rem',
                          borderRadius: 20,
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 600,
                          fontSize: '0.8rem',
                          textTransform: 'capitalize'
                        }}>
                          {order.orderStatus.replace('-', ' ')}
                        </span>
                      </div>

                      {/* Items */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                        {order.items.map((item, i) => (
                          <span key={i} style={{ backgroundColor: 'var(--beige)', padding: '0.3rem 0.75rem', borderRadius: 20, fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'var(--text-mid)' }}>
                            {item.emoji} {item.name} × {item.quantity}
                          </span>
                        ))}
                      </div>

                      {/* Order Footer */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--beige)', paddingTop: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'var(--text-light)' }}>
                            {order.fulfillment === 'delivery' ? '🚀 Delivery' : '🏪 Pickup'}
                          </span>
                          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'var(--text-light)' }}>
                            💳 {order.paymentMethod.toUpperCase()}
                          </span>
                          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: order.paymentStatus === 'paid' ? 'green' : 'var(--text-light)', fontWeight: order.paymentStatus === 'paid' ? 600 : 400 }}>
                            {order.paymentStatus === 'paid' ? '✅ Paid' : '⏳ ' + order.paymentStatus}
                          </span>
                        </div>
                        <p style={{ fontFamily: 'Playfair Display, serif', color: 'var(--espresso)', fontWeight: 700, fontSize: '1.1rem' }}>
                          ₹{order.total}
                        </p>
                      </div>

                      {/* Delivery Address */}
                      {order.fulfillment === 'delivery' && order.address && (
                        <div style={{ marginTop: '0.75rem', padding: '0.75rem', backgroundColor: 'var(--off-white)', borderRadius: 8 }}>
                          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'var(--text-light)', fontWeight: 600, marginBottom: '0.25rem' }}>
                            Delivery Address:
                          </p>
                          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'var(--text-mid)' }}>
                            {order.address.street}, {order.address.city}, {order.address.state} - {order.address.pincode}
                          </p>
                        </div>
                      )}

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  )
}

export default AccountPage