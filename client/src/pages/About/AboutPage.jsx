import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1, backgroundColor: 'var(--off-white)', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            color: 'var(--caramel)',
            fontSize: '0.9rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem'
          }}>
            Our Story
          </p>
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            color: 'var(--espresso)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            marginBottom: '1.5rem'
          }}>
            About Modern Cafe
          </h1>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            color: 'var(--text-mid)',
            fontSize: '1.05rem',
            lineHeight: 1.8,
            marginBottom: '1.5rem'
          }}>
            Modern Cafe was born from a simple idea — great coffee, honest ingredients,
            and a warm place to gather. From our first espresso shot to the pastries
            baked every morning, everything is crafted with care.
          </p>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            color: 'var(--text-mid)',
            fontSize: '1.05rem',
            lineHeight: 1.8,
            marginBottom: '1.5rem'
          }}>
            Whether you order for delivery or visit us in person, we want every sip
            and every bite to feel special. Thank you for being part of our story.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1.5rem',
            marginTop: '3rem'
          }}>
            {[
              { number: '2024', label: 'Founded' },
              { number: '12+',  label: 'Menu Items' },
              { number: '5★',   label: 'Customer Love' },
            ].map(({ number, label }) => (
              <div key={label} style={{
                backgroundColor: '#fff',
                borderRadius: 12,
                padding: '1.5rem',
                textAlign: 'center',
                boxShadow: '0 2px 12px rgba(44,26,14,0.08)'
              }}>
                <p style={{
                  fontFamily: 'Playfair Display, serif',
                  color: 'var(--caramel)',
                  fontSize: '1.8rem',
                  fontWeight: 700
                }}>{number}</p>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  color: 'var(--text-light)',
                  fontSize: '0.9rem',
                  marginTop: '0.25rem'
                }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default AboutPage