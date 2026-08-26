function CallToAction() {
  return (
    <section style={{
      backgroundColor: 'var(--coffee)',
      padding: '5rem 2rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        width: 400,
        height: 400,
        borderRadius: '50%',
        backgroundColor: 'var(--espresso)',
        top: -150,
        right: -100,
        opacity: 0.5
      }} />
      <div style={{
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: '50%',
        backgroundColor: 'var(--espresso)',
        bottom: -120,
        left: -80,
        opacity: 0.4
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 600, margin: '0 auto' }}>
        
        <p style={{
          fontFamily: 'Inter, sans-serif',
          color: 'var(--caramel)',
          fontSize: '0.9rem',
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: '1rem'
        }}>
          Order Today
        </p>

        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          color: 'var(--cream)',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 700,
          lineHeight: 1.2,
          marginBottom: '1.25rem'
        }}>
          Fresh Coffee Delivered to Your Door
        </h2>

        <p style={{
          fontFamily: 'Inter, sans-serif',
          color: 'var(--beige)',
          fontSize: '1rem',
          lineHeight: 1.8,
          opacity: 0.85,
          marginBottom: '2.5rem'
        }}>
          Order online and get your favourite cafe items delivered hot and fresh. 
          Free delivery on orders above ₹499.
        </p>

        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button style={{
            backgroundColor: 'var(--caramel)',
            color: 'var(--cream)',
            padding: '1rem 2.5rem',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '1rem'
          }}>
            Order Now →
          </button>
          <button style={{
            backgroundColor: 'transparent',
            color: 'var(--cream)',
            padding: '1rem 2.5rem',
            border: '2px solid var(--cream)',
            borderRadius: 8,
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '1rem',
            opacity: 0.85
          }}>
            View Menu
          </button>
        </div>

        {/* Delivery info */}
        <div style={{
          display: 'flex',
          gap: '2rem',
          justifyContent: 'center',
          marginTop: '3rem',
          flexWrap: 'wrap'
        }}>
          {[
            { icon: '🚀', text: 'Fast Delivery' },
            { icon: '🔥', text: 'Always Fresh' },
            { icon: '💳', text: 'Easy Payments' },
          ].map(({ icon, text }) => (
            <div key={text} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--beige)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.9rem',
              opacity: 0.85
            }}>
              <span>{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default CallToAction