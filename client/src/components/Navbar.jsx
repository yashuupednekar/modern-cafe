import { useState } from 'react'
import { Link } from 'react-router-dom'

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
      <Link to="/" style={{
        color: 'var(--cream)',
        fontFamily: 'Playfair Display, serif',
        fontSize: '1.5rem',
        fontWeight: 700,
        letterSpacing: '0.05em',
        textDecoration: 'none'
      }}>
        Modern Cafe
      </Link>

      {/* Desktop Links */}
      <div style={{
        display: 'flex',
        gap: '2rem',
        alignItems: 'center'
      }}>
        {[
          { label: 'Home',    path: '/'      },
          { label: 'Menu',    path: '/menu'  },
          { label: 'About',   path: '/#about'},
          { label: 'Contact', path: '/#contact'},
        ].map(({ label, path }) => (
          <Link key={label} to={path} style={{
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
            {label}
          </Link>
        ))}

        {/* Cart */}
        <Link to="/cart" style={{
          backgroundColor: 'var(--caramel)',
          color: 'var(--cream)',
          border: 'none',
          borderRadius: 6,
          padding: '0.5rem 1rem',
          cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          fontSize: '0.9rem',
          textDecoration: 'none'
        }}>
          🛒 Cart (0)
        </Link>

        {/* Login */}
        <Link to="/login" style={{
          color: 'var(--cream)',
          textDecoration: 'none',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 500,
          fontSize: '0.95rem',
          opacity: 0.85
        }}>
          Login
        </Link>
      </div>

    </nav>
  )
}

export default Navbar