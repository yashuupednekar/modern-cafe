const items = [
  {
    id: 1,
    name: 'Espresso',
    category: 'Coffee',
    price: 120,
    description: 'Rich and bold single shot espresso made from premium arabica beans.',
    emoji: '☕'
  },
  {
    id: 2,
    name: 'Cappuccino',
    category: 'Coffee',
    price: 180,
    description: 'Perfectly balanced espresso with steamed milk and thick foam.',
    emoji: '🍵'
  },
  {
    id: 3,
    name: 'Croissant',
    category: 'Bakery',
    price: 150,
    description: 'Freshly baked buttery croissant with a golden flaky crust.',
    emoji: '🥐'
  },
  {
    id: 4,
    name: 'Cold Brew',
    category: 'Coffee',
    price: 220,
    description: 'Slow steeped cold brew coffee served over ice. Smooth and refreshing.',
    emoji: '🧊'
  },
  {
    id: 5,
    name: 'Cheesecake',
    category: 'Dessert',
    price: 280,
    description: 'Creamy New York style cheesecake with a buttery graham cracker crust.',
    emoji: '🍰'
  },
  {
    id: 6,
    name: 'Matcha Latte',
    category: 'Specialty',
    price: 200,
    description: 'Premium Japanese matcha blended with steamed oat milk.',
    emoji: '🍃'
  },
]

function FeaturedMenu() {
  return (
    <section style={{
      backgroundColor: 'var(--off-white)',
      padding: '5rem 2rem',
    }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          color: 'var(--caramel)',
          fontSize: '0.9rem',
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: '0.75rem'
        }}>
          Our Specialties
        </p>
        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          color: 'var(--espresso)',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 700,
          marginBottom: '1rem'
        }}>
          Featured Menu
        </h2>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          color: 'var(--text-light)',
          fontSize: '1rem',
          maxWidth: 500,
          margin: '0 auto'
        }}>
          Handpicked favourites from our kitchen — crafted fresh every day.
        </p>
      </div>

      {/* Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        maxWidth: 1100,
        margin: '0 auto'
      }}>
        {items.map(item => (
          <div key={item.id} style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: '1.5rem',
            boxShadow: '0 2px 12px rgba(44, 26, 14, 0.08)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            cursor: 'pointer'
          }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(44, 26, 14, 0.15)'
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(44, 26, 14, 0.08)'
            }}
          >
            {/* Emoji */}
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem',
              backgroundColor: 'var(--beige)',
              width: 70,
              height: 70,
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {item.emoji}
            </div>

            {/* Category */}
            <p style={{
              fontFamily: 'Inter, sans-serif',
              color: 'var(--caramel)',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '0.4rem'
            }}>
              {item.category}
            </p>

            {/* Name */}
            <h3 style={{
              fontFamily: 'Playfair Display, serif',
              color: 'var(--espresso)',
              fontSize: '1.2rem',
              fontWeight: 700,
              marginBottom: '0.5rem'
            }}>
              {item.name}
            </h3>

            {/* Description */}
            <p style={{
              fontFamily: 'Inter, sans-serif',
              color: 'var(--text-light)',
              fontSize: '0.9rem',
              lineHeight: 1.6,
              marginBottom: '1.25rem'
            }}>
              {item.description}
            </p>

            {/* Price + Button */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <p style={{
                fontFamily: 'Playfair Display, serif',
                color: 'var(--espresso)',
                fontSize: '1.2rem',
                fontWeight: 700
              }}>
                ₹{item.price}
              </p>
              <button style={{
                backgroundColor: 'var(--espresso)',
                color: 'var(--cream)',
                border: 'none',
                borderRadius: 6,
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '0.85rem'
              }}>
                Add to Cart
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* View All Button */}
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <button style={{
          backgroundColor: 'transparent',
          color: 'var(--espresso)',
          border: '2px solid var(--espresso)',
          borderRadius: 8,
          padding: '0.85rem 2rem',
          cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          fontSize: '1rem'
        }}>
          View Full Menu →
        </button>
      </div>

    </section>
  )
}

export default FeaturedMenu