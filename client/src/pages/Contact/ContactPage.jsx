import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Frontend-only for now — can wire to backend later
    setSent(true)
    setForm({ name: '', email: '', message: '' })
  }

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: 8,
    border: '2px solid var(--beige)',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.95rem',
    outline: 'none',
    boxSizing: 'border-box',
    marginBottom: '1rem'
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1, backgroundColor: 'var(--off-white)', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            color: 'var(--caramel)',
            fontSize: '0.9rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem'
          }}>
            Get in Touch
          </p>
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            color: 'var(--espresso)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            marginBottom: '1rem'
          }}>
            Contact Us
          </h1>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            color: 'var(--text-mid)',
            marginBottom: '2rem',
            lineHeight: 1.7
          }}>
            Have a question or feedback? We’d love to hear from you.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '2.5rem'
          }}>
            {[
              { icon: '📍', text: '123 Cafe Street, Mumbai' },
              { icon: '📞', text: '+91 98765 43210' },
              { icon: '✉️', text: 'hello@moderncafe.in' },
            ].map(({ icon, text }) => (
              <div key={text} style={{
                backgroundColor: '#fff',
                borderRadius: 12,
                padding: '1.25rem',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.95rem',
                color: 'var(--text-mid)',
                boxShadow: '0 2px 12px rgba(44,26,14,0.08)'
              }}>
                {icon} {text}
              </div>
            ))}
          </div>

          {sent ? (
            <div style={{
              backgroundColor: '#dcfce7',
              color: '#14532d',
              padding: '1.25rem',
              borderRadius: 12,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600
            }}>
              Message sent! We’ll get back to you soon. ✅
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{
              backgroundColor: '#fff',
              borderRadius: 12,
              padding: '2rem',
              boxShadow: '0 2px 12px rgba(44,26,14,0.08)'
            }}>
              <label style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.9rem' }}>Name</label>
              <input
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                style={inputStyle}
              />
              <label style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.9rem' }}>Email</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                style={inputStyle}
              />
              <label style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.9rem' }}>Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
              <button type="submit" style={{
                backgroundColor: 'var(--espresso)',
                color: 'var(--cream)',
                border: 'none',
                borderRadius: 8,
                padding: '0.85rem 2rem',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '1rem'
              }}>
                Send Message
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ContactPage