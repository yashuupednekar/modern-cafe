import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useCart } from '../../store/CartContext'
import { useAuth } from '../../store/AuthContext'

function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    street:      '',
    city:        '',
    state:       '',
    pincode:     '',
    phone:       '',
    fulfillment: 'delivery',
    payment:     'cod',
    notes:       ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const deliveryFee = form.fulfillment === 'pickup' ? 0 : cart.totalPrice > 499 ? 0 : 49
  const tax         = Math.round(cart.totalPrice * 0.05)
  const total       = cart.totalPrice + deliveryFee + tax

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handlePlaceOrder = async () => {
    if (!form.street || !form.city || !form.state || !form.pincode || !form.phone) {
      setError('Please fill in all address fields')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          items:       cart.items.map(i => ({
            product:  i._id,
            name:     i.name,
            price:    i.price,
            emoji:    i.emoji,
            quantity: i.quantity,
          })),
          address: {
            street:  form.street,
            city:    form.city,
            state:   form.state,
            pincode: form.pincode,
            phone:   form.phone,
          },
          fulfillment:   form.fulfillment,
          paymentMethod: form.payment,
          subtotal:      cart.totalPrice,
          deliveryFee,
          tax,
          total,
          notes: form.notes
        })
      })
      const data = await res.json()

      if (data.success) {
        clearCart()
        navigate(`/orders`)
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
    boxSizing: 'border-box',
    backgroundColor: '#fff'
  }

  const labelStyle = {
    display: 'block',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    fontSize: '0.9rem',
    color: 'var(--text-dark)',
    marginBottom: '0.4rem'
  }

  if (cart.items.length === 0) {
    navigate('/menu')
    return null
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
          Checkout
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'auto 340px',
          gap: '2rem',
          maxWidth: 1100,
          margin: '0 auto',
          alignItems: 'start'
        }}>

          {/* Left — Forms */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Fulfillment */}
            <div style={{
              backgroundColor: '#fff',
              borderRadius: 12,
              padding: '1.5rem',
              boxShadow: '0 2px 12px rgba(44,26,14,0.08)'
            }}>
              <h2 style={{
                fontFamily: 'Playfair Display, serif',
                color: 'var(--espresso)',
                fontSize: '1.2rem',
                marginBottom: '1rem'
              }}>
                Delivery or Pickup?
              </h2>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {['delivery', 'pickup'].map(option => (
                  <button
                    key={option}
                    onClick={() => setForm({ ...form, fulfillment: option })}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      borderRadius: 8,
                      border: '2px solid var(--espresso)',
                      backgroundColor: form.fulfillment === option ? 'var(--espresso)' : 'transparent',
                      color: form.fulfillment === option ? 'var(--cream)' : 'var(--espresso)',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      textTransform: 'capitalize'
                    }}
                  >
                    {option === 'delivery' ? '🚀 Delivery' : '🏪 Pickup'}
                  </button>
                ))}
              </div>
            </div>

            {/* Address */}
            <div style={{
              backgroundColor: '#fff',
              borderRadius: 12,
              padding: '1.5rem',
              boxShadow: '0 2px 12px rgba(44,26,14,0.08)'
            }}>
              <h2 style={{
                fontFamily: 'Playfair Display, serif',
                color: 'var(--espresso)',
                fontSize: '1.2rem',
                marginBottom: '1.25rem'
              }}>
                {form.fulfillment === 'delivery' ? 'Delivery Address' : 'Contact Details'}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Street Address</label>
                  <input name="street" value={form.street} onChange={handleChange} placeholder="123 Main Street, Flat 4B" style={inputStyle} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle}>City</label>
                    <input name="city" value={form.city} onChange={handleChange} placeholder="Mumbai" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>State</label>
                    <input name="state" value={form.state} onChange={handleChange} placeholder="Maharashtra" style={inputStyle} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle}>Pincode</label>
                    <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="400001" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Order Notes (optional)</label>
                  <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Extra sugar, no ice..." rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div style={{
              backgroundColor: '#fff',
              borderRadius: 12,
              padding: '1.5rem',
              boxShadow: '0 2px 12px rgba(44,26,14,0.08)'
            }}>
              <h2 style={{
                fontFamily: 'Playfair Display, serif',
                color: 'var(--espresso)',
                fontSize: '1.2rem',
                marginBottom: '1rem'
              }}>
                Payment Method
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { value: 'cod',      label: '💵 Cash on Delivery' },
                  { value: 'razorpay', label: '💳 Pay Online (Razorpay)' },
                ].map(({ value, label }) => (
                  <label key={value} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    borderRadius: 8,
                    border: `2px solid ${form.payment === value ? 'var(--espresso)' : 'var(--beige)'}`,
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    color: 'var(--text-dark)'
                  }}>
                    <input
                      type="radio"
                      name="payment"
                      value={value}
                      checked={form.payment === value}
                      onChange={handleChange}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* Right — Order Summary */}
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
              marginBottom: '1.25rem'
            }}>
              Order Summary
            </h2>

            {/* Items */}
            {cart.items.map(item => (
              <div key={item._id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.6rem',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.9rem',
                color: 'var(--text-mid)'
              }}>
                <span>{item.emoji} {item.name} × {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}

            <div style={{ borderTop: '1px solid var(--beige)', margin: '1rem 0' }} />

            {[
              { label: 'Subtotal',     value: `₹${cart.totalPrice}` },
              { label: 'Delivery Fee', value: deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}` },
              { label: 'Tax (5%)',     value: `₹${tax}` },
            ].map(({ label, value }) => (
              <div key={label} style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.6rem',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.9rem',
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

            {error && (
              <div style={{
                backgroundColor: '#fee2e2',
                color: '#dc2626',
                padding: '0.75rem',
                borderRadius: 8,
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.9rem',
                marginBottom: '1rem'
              }}>
                {error}
              </div>
            )}

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              style={{
                width: '100%',
                backgroundColor: 'var(--espresso)',
                color: 'var(--cream)',
                padding: '1rem',
                border: 'none',
                borderRadius: 8,
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '1rem',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Placing Order...' : 'Place Order →'}
            </button>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default CheckoutPage