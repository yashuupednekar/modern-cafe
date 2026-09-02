import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useAuth } from '../../store/AuthContext'
import API_URL from '../../services/config'

const statusColors = {
  pending:          { bg: '#fef9c3', color: '#854d0e' },
  confirmed:        { bg: '#dbeafe', color: '#1e40af' },
  preparing:        { bg: '#fce7f3', color: '#9d174d' },
  ready:            { bg: '#d1fae5', color: '#065f46' },
  'out-for-delivery': { bg: '#e0e7ff', color: '#3730a3' },
  delivered:        { bg: '#dcfce7', color: '#14532d' },
  cancelled:        { bg: '#fee2e2', color: '#991b1b' },
}

function OrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API_URL}/orders`, {
          credentials: 'include'
        })
        const data = await res.json()
        if (data.success) setOrders(data.orders)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    if (user) fetchOrders()
    else setLoading(false)
  }, [user])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{
        flex: 1,
        backgroundColor: 'var(--off-white)',
        padding: '3rem 2rem'
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>

          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            color: 'var(--espresso)',
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            fontWeight: 700,
            marginBottom: '2rem'
          }}>
            My Orders
          </h1>

          {/* Not logged in */}
          {!user && (
            <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
              <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔐</p>
              <h2 style={{
                fontFamily: 'Playfair Display, serif',
                color: 'var(--espresso)',
                marginBottom: '0.75rem'
              }}>
                Please login to view your orders
              </h2>
              <Link to="/login" style={{
                backgroundColor: 'var(--espresso)',
                color: 'var(--cream)',
                padding: '0.85rem 2rem',
                borderRadius: 8,
                textDecoration: 'none',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600
              }}>
                Login
              </Link>
            </div>
          )}

          {/* Loading */}
          {user && loading && (
            <div style={{
              textAlign: 'center',
              padding: '4rem',
              fontFamily: 'Inter, sans-serif',
              color: 'var(--text-light)'
            }}>
              Loading orders...
            </div>
          )}

          {/* Empty */}
          {user && !loading && orders.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
              <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</p>
              <h2 style={{
                fontFamily: 'Playfair Display, serif',
                color: 'var(--espresso)',
                marginBottom: '0.75rem'
              }}>
                No orders yet
              </h2>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                color: 'var(--text-light)',
                marginBottom: '1.5rem'
              }}>
                Browse our menu and place your first order!
              </p>
              <Link to="/menu" style={{
                backgroundColor: 'var(--espresso)',
                color: 'var(--cream)',
                padding: '0.85rem 2rem',
                borderRadius: 8,
                textDecoration: 'none',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600
              }}>
                Browse Menu
              </Link>
            </div>
          )}

          {/* Orders List */}
          {user && !loading && orders.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {orders.map(order => (
                <div key={order._id} style={{
                  backgroundColor: '#fff',
                  borderRadius: 12,
                  padding: '1.5rem',
                  boxShadow: '0 2px 12px rgba(44,26,14,0.08)'
                }}>

                  {/* Order Header */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}>
                    <div>
                      <p style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.8rem',
                        color: 'var(--text-light)',
                        marginBottom: '0.25rem'
                      }}>
                        Order ID: #{order._id.slice(-8).toUpperCase()}
                      </p>
                      <p style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.85rem',
                        color: 'var(--text-mid)'
                      }}>
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'long', year: 'numeric'
                        })}
                      </p>
                    </div>

                    {/* Status Badge */}
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
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    {order.items.map((item, i) => (
                      <span key={i} style={{
                        backgroundColor: 'var(--beige)',
                        padding: '0.3rem 0.75rem',
                        borderRadius: 20,
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.85rem',
                        color: 'var(--text-mid)'
                      }}>
                        {item.emoji} {item.name} × {item.quantity}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid var(--beige)',
                    paddingTop: '1rem',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <span style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.85rem',
                        color: 'var(--text-light)',
                        textTransform: 'capitalize'
                      }}>
                        {order.fulfillment === 'delivery' ? '🚀 Delivery' : '🏪 Pickup'}
                      </span>
                      <span style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.85rem',
                        color: 'var(--text-light)',
                        textTransform: 'capitalize'
                      }}>
                        💳 {order.paymentMethod.toUpperCase()}
                      </span>
                    </div>
                    <p style={{
                      fontFamily: 'Playfair Display, serif',
                      color: 'var(--espresso)',
                      fontWeight: 700,
                      fontSize: '1.1rem'
                    }}>
                      ₹{order.total}
                    </p>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  )
}

export default OrdersPage