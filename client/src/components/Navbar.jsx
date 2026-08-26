import { useState } from 'react'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav style={{
      backgroundColor: 'var(--espresso)',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      
      {/* Logo */}
      <div style={{
        color: 'var(--cream)',
        fontFamily: 'Playfair Display, serif',
        fontSize: '1.5rem',
        fontWeight: 700,
        letterSpacing: '0.05em'
      }}>
        Modern Cafe
      </div>

      {/* Desktop Links */}
      <div style={{
        display: 'flex',
        gap: '2rem',
        alignItems: 'center'
      }} className="desktop-nav">
        {['Home', 'Menu', 'About', 'Contact'].map(link => (
          <a key={link} href={`#${link.toLowerCase()}`} style={{
            color: 'var(--cream)',
            textDecoration: 'none',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '0.95rem',
            opacity: 0.85,
            transition: 'opacity 0.2s'
          }}
            onMouseOver={e => e.target.style.opacity = 1}
            onMouseOut={e => e.target.style.opacity = 0.85}
          >
            {link}
          </a>
        ))}

        {/* Cart Icon */}
        <button style={{
          backgroundColor: 'var(--caramel)',
          color: 'var(--cream)',
          border: 'none',
          borderRadius: 6,
          padding: '0.5rem 1rem',
          cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          fontSize: '0.9rem'
        }}>
          🛒 Cart (0)
        </button>

        {/* Login */}
        <a href="#login" style={{
          color: 'var(--cream)',
          textDecoration: 'none',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 500,
          fontSize: '0.95rem',
          opacity: 0.85
        }}>
          Login
        </a>
      </div>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: 'none',
          backgroundColor: 'transparent',
          border: 'none',
          color: 'var(--cream)',
          fontSize: '1.5rem',
          cursor: 'pointer'
        }}
        className="hamburger"
      >
        {menuOpen ? '✕' : '☰'}
      </button>

    </nav>
  )
}

export default Navbar