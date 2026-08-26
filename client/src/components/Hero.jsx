function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      backgroundColor: 'var(--espresso)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* Background circles for depth */}
      <div style={{
        position: 'absolute',
        width: 500,
        height: 500,
        borderRadius: '50%',
        backgroundColor: 'var(--coffee)',
        top: -100,
        right: -100,
        opacity: 0.4
      }} />
      <div style={{
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: '50%',
        backgroundColor: 'var(--caramel)',
        bottom: -80,
        left: -80,
        opacity: 0.15
      }} />

      {/* Content */}
      <div style={{
        textAlign: 'center',
        zIndex: 1,
        maxWidth: 700
      }}>

        {/* Tagline */}
        <p style={{
          fontFamily: 'Inter, sans-serif',
          color: 'var(--caramel)',
          fontSize: '0.95rem',
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: '1.5rem'
        }}>
          ☕ Premium Cafe Experience
        </p>

        {/* Main Heading */}
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          color: 'var(--cream)',
          fontSize: 'clamp(2.5rem, 7vw, 5rem)',
          fontWeight: 700,
          lineHeight: 1.15,
          marginBottom: '1.5rem'
        }}>
          Where Every Sip Tells a Story
        </h1>

        {/* Subtext */}
        <p style={{
          fontFamily: 'Inter, sans-serif',
          color: 'var(--beige)',
          fontSize: '1.1rem',
          lineHeight: 1.8,
          opacity: 0.85,
          marginBottom: '2.5rem',
          maxWidth: 500,
          margin: '0 auto 2.5rem'
        }}>
          Handcrafted coffee, freshly baked goods and a warm atmosphere — 
          delivered to your door or enjoyed in our cafe.
        </p>

        {/* Buttons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button style={{
            backgroundColor: 'var(--caramel)',
            color: 'var(--cream)',
            padding: '1rem 2rem',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '1rem',
            letterSpacing: '0.02em',
            transition: 'transform 0.2s, opacity 0.2s'
          }}
            onMouseOver={e => e.target.style.opacity = 0.9}
            onMouseOut={e => e.target.style.opacity = 1}
          >
            Explore Our Menu →
          </button>

          <button style={{
            backgroundColor: 'transparent',
            color: 'var(--cream)',
            padding: '1rem 2rem',
            border: '2px solid var(--cream)',
            borderRadius: 8,
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '1rem',
            opacity: 0.85,
            transition: 'opacity 0.2s'
          }}
            onMouseOver={e => e.target.style.opacity = 1}
            onMouseOut={e => e.target.style.opacity = 0.85}
          >
            Order Now
          </button>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex',
          gap: '3rem',
          justifyContent: 'center',
          marginTop: '4rem',
          flexWrap: 'wrap'
        }}>
          {[
            { number: '50+', label: 'Menu Items' },
            { number: '10K+', label: 'Happy Customers' },
            { number: '5★', label: 'Average Rating' },
          ].map(({ number, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <p style={{
                fontFamily: 'Playfair Display, serif',
                color: 'var(--caramel)',
                fontSize: '2rem',
                fontWeight: 700
              }}>
                {number}
              </p>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                color: 'var(--beige)',
                fontSize: '0.85rem',
                opacity: 0.7,
                marginTop: '0.25rem'
              }}>
                {label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Hero