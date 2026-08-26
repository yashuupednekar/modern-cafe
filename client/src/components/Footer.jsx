function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--espresso)',
      color: 'var(--cream)',
      padding: '3rem 2rem 1.5rem',
    }}>
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '2rem',
        marginBottom: '2rem'
      }}>

        {/* Brand */}
        <div>
          <h3 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.5rem',
            color: 'var(--cream)',
            marginBottom: '0.75rem'
          }}>
            Modern Cafe
          </h3>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.9rem',
            opacity: 0.7,
            maxWidth: 250,
            lineHeight: 1.6
          }}>
            A premium cafe experience. Crafted with passion, served with love.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.95rem',
            fontWeight: 600,
            marginBottom: '1rem',
            color: 'var(--caramel)'
          }}>
            Quick Links
          </h4>
          {['Home', 'Menu', 'About', 'Contact', 'Offers'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} style={{
              display: 'block',
              color: 'var(--cream)',
              textDecoration: 'none',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.9rem',
              opacity: 0.75,
              marginBottom: '0.5rem'
            }}>
              {link}
            </a>
          ))}
        </div>

        {/* Hours */}
        <div>
          <h4 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.95rem',
            fontWeight: 600,
            marginBottom: '1rem',
            color: 'var(--caramel)'
          }}>
            Opening Hours
          </h4>
          {[
            { day: 'Mon – Fri', time: '7:00 AM – 10:00 PM' },
            { day: 'Saturday',  time: '8:00 AM – 11:00 PM' },
            { day: 'Sunday',    time: '9:00 AM – 9:00 PM'  },
          ].map(({ day, time }) => (
            <p key={day} style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.9rem',
              opacity: 0.75,
              marginBottom: '0.4rem'
            }}>
              <span style={{ fontWeight: 500 }}>{day}:</span> {time}
            </p>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h4 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.95rem',
            fontWeight: 600,
            marginBottom: '1rem',
            color: 'var(--caramel)'
          }}>
            Contact
          </h4>
          {[
            '📍 123 Cafe Street, Mumbai',
            '📞 +91 98765 43210',
            '✉️ hello@moderncafe.in',
          ].map(item => (
            <p key={item} style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.9rem',
              opacity: 0.75,
              marginBottom: '0.5rem'
            }}>
              {item}
            </p>
          ))}
        </div>

      </div>

      {/* Bottom Bar */}
      <div style={{
        borderTop: '1px solid rgba(245, 236, 215, 0.15)',
        paddingTop: '1rem',
        textAlign: 'center',
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.85rem',
        opacity: 0.5
      }}>
        © 2026 Modern Cafe. All rights reserved.
      </div>

    </footer>
  )
}

export default Footer