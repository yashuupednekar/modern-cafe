import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useCart } from '../../store/CartContext'
import { useAuth } from '../../store/AuthContext'

function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const deliveryFee = cart.totalPrice > 499 ? 0 : 49
  const tax = Math.round(cart.totalPrice * 0.05)
  const total = cart.totalPrice + deliveryFee + tax

  const handleCheckout = () => {
    if (!user) {
      navigate('/login')
    } else {
      navigate('/checkout')
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{
        flex: 1,
        backgroundColor: 'var(--off-white)',
        padding: '3rem 2rem'
      }}>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          color: 'var(--espresso)',
          fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
          fontWeight: 700,
          marginBottom: '2rem',
          maxWidth: 1100,
          margin: '0 auto 2rem'
        }}>
          Your Cart
        </h1>

        {cart.items.length === 0 ? (
          /* Empty Cart */
          <div style={{
            textAlign: 'center',
            padding: '5rem 2rem',
            maxWidth: 400,
            margin: '0 auto'
          }}>
            <p style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</p>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              color: 'var(--espresso)',
              marginBottom: '0.75rem'
            }}>
              Your cart is empty
            </h2>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              color: 'var(--text-light)',
              marginBottom: '1.5rem'
            }}>
              Add some items from our menu to get started.
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
        ) : (
          /* Cart Content */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'auto 340px',
            gap: '2rem',
            maxWidth: 1100,
            margin: '0 auto',
            alignItems: 'start'
          }}>

            {/* Cart Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cart.items.map(item => (
                <div key={item._id} style={{
                  backgroundColor: '#fff',
                  borderRadius: 12,
                  padding: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  boxShadow: '0 2px 12px rgba(44,26,14,0.08)'
                }}>

                  {/* Emoji */}
                  <div style={{
                    fontSize: '2rem',
                    backgroundColor: 'var(--beige)',
                    width: 56,
                    height: 56,
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {item.emoji}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontFamily: 'Playfair Display, serif',
                      color: 'var(--espresso)',
                      fontSize: '1rem',
                      fontWeight: 700,
                      marginBottom: '0.25rem'
                    }}>
                      {item.name}
                    </h3>
                    <p style={{
                      fontFamily: 'Inter, sans-serif',
                      color: 'var(--caramel)',
                      fontSize: '0.9rem',
                      fontWeight: 600
                    }}>
                      ₹{item.price}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        border: '2px solid var(--espresso)',
                        backgroundColor: 'transparent',
                        color: 'var(--espresso)',
                        cursor: 'pointer',
                        fontWeight: 700,
                        fontSize: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      −
                    </button>
                    <span style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      fontSize: '1rem',
                      minWidth: 24,
                      textAlign: 'center'
                    }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        border: '2px solid var(--espresso)',
                        backgroundColor: 'var(--espresso)',
                        color: 'var(--cream)',
                        cursor: 'pointer',
                        fontWeight: 700,
                        fontSize: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      +
                    </button>
                  </div>

                  {/* Item Total */}
                  <p style={{
                    fontFamily: 'Playfair Display, serif',
                    color: 'var(--espresso)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    minWidth: 70,
                    textAlign: 'right'
                  }}>
                    ₹{item.price * item.quantity}
                  </p>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item._id)}
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#dc2626',
                      cursor: 'pointer',
                      fontSize: '1.1rem',
                      padding: '0.25rem'
                    }}
                  >
                    ✕
                  </button>

                </div>
              ))}

              {/* Clear Cart */}
              <button
                onClick={clearCart}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#dc2626',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: '0.5rem 0'
                }}
              >
                🗑 Clear cart
              </button>
            </div>

            {/* Order Summary */}
            <div style={{
              backgroundColor: '#fff',
              borderRadius: 12,
              padding: '1.5rem',
              boxShadow: '0 2px 12px rgba(44,26,14,0.08)',
              position: 'sticky',
              top: 100
            }}>
              <h2 style={{
                fontFamily: 'Playfair Display, serif',
                color: 'var(--espresso)',
                fontSize: '1.3rem',
                fontWeight: 700,
                marginBottom: '1.5rem'
              }}>
                Order Summary
              </h2>

              {[
                { label: 'Subtotal',     value: `₹${cart.totalPrice}` },
                { label: 'Delivery Fee', value: deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}` },
                { label: 'Tax (5%)',     value: `₹${tax}` },
              ].map(({ label, value }) => (
                <div key={label} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.75rem',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.95rem',
                  color: 'var(--text-mid)'
                }}>
                  <span>{label}</span>
                  <span style={{ color: value === 'FREE' ? 'green' : 'inherit' }}>{value}</span>
                </div>
              ))}

              <div style={{
                borderTop: '2px solid var(--beige)',
                paddingTop: '1rem',
                marginTop: '0.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.2rem',
                fontWeight: 700,
                color: 'var(--espresso)',
                marginBottom: '1.5rem'
              }}>
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              {cart.totalPrice < 499 && (
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.85rem',
                  color: 'var(--caramel)',
                  marginBottom: '1rem',
                  textAlign: 'center'
                }}>
                  Add ₹{499 - cart.totalPrice} more for free delivery!
                </p>
              )}

              <button
                onClick={handleCheckout}
                style={{
                  width: '100%',
                  backgroundColor: 'var(--espresso)',
                  color: 'var(--cream)',
                  padding: '1rem',
                  border: 'none',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '1rem'
                }}
              >
                Proceed to Checkout →
              </button>

              <Link to="/menu" style={{
                display: 'block',
                textAlign: 'center',
                marginTop: '1rem',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.9rem',
                color: 'var(--text-light)',
                textDecoration: 'none'
              }}>
                ← Continue Shopping
              </Link>

            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default CartPage