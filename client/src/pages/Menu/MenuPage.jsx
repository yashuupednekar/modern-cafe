import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const allItems = [
  { id: 1,  name: 'Espresso',        category: 'Coffee',    price: 120, emoji: '☕', description: 'Rich and bold single shot espresso made from premium arabica beans.' },
  { id: 2,  name: 'Cappuccino',      category: 'Coffee',    price: 180, emoji: '🍵', description: 'Perfectly balanced espresso with steamed milk and thick foam.' },
  { id: 3,  name: 'Cold Brew',       category: 'Coffee',    price: 220, emoji: '🧊', description: 'Slow steeped cold brew coffee served over ice. Smooth and refreshing.' },
  { id: 4,  name: 'Latte',           category: 'Coffee',    price: 190, emoji: '☕', description: 'Smooth espresso with lots of steamed milk and a light layer of foam.' },
  { id: 5,  name: 'Croissant',       category: 'Bakery',    price: 150, emoji: '🥐', description: 'Freshly baked buttery croissant with a golden flaky crust.' },
  { id: 6,  name: 'Blueberry Muffin',category: 'Bakery',    price: 130, emoji: '🧁', description: 'Soft muffin loaded with fresh blueberries and a sugar crust top.' },
  { id: 7,  name: 'Banana Bread',    category: 'Bakery',    price: 160, emoji: '🍞', description: 'Moist homestyle banana bread baked fresh every morning.' },
  { id: 8,  name: 'Cheesecake',      category: 'Dessert',   price: 280, emoji: '🍰', description: 'Creamy New York style cheesecake with a buttery graham cracker crust.' },
  { id: 9,  name: 'Chocolate Brownie',category: 'Dessert',  price: 180, emoji: '🍫', description: 'Fudgy dark chocolate brownie with a crispy top and gooey centre.' },
  { id: 10, name: 'Tiramisu',        category: 'Dessert',   price: 260, emoji: '🍮', description: 'Classic Italian tiramisu with mascarpone and espresso soaked ladyfingers.' },
  { id: 11, name: 'Matcha Latte',    category: 'Specialty', price: 200, emoji: '🍃', description: 'Premium Japanese matcha blended with steamed oat milk.' },
  { id: 12, name: 'Turmeric Latte',  category: 'Specialty', price: 190, emoji: '🌿', description: 'Golden milk latte with turmeric, ginger and a hint of black pepper.' },
]

const categories = ['All', 'Coffee', 'Bakery', 'Dessert', 'Specialty']

function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = allItems.filter(item => {
    const matchCategory = activeCategory === 'All' || item.category === activeCategory
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, backgroundColor: 'var(--off-white)', padding: '3rem 2rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            color: 'var(--caramel)',
            fontSize: '0.9rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem'
          }}>
            Explore
          </p>
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            color: 'var(--espresso)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            marginBottom: '1rem'
          }}>
            Our Full Menu
          </h1>

          {/* Search */}
          <input
            type="text"
            placeholder="Search menu..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              padding: '0.75rem 1.25rem',
              borderRadius: 8,
              border: '2px solid var(--beige)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.95rem',
              width: '100%',
              maxWidth: 400,
              outline: 'none',
              backgroundColor: '#fff',
              color: 'var(--text-dark)'
            }}
          />
        </div>

        {/* Category Filter */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '2.5rem'
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: 25,
                border: '2px solid var(--espresso)',
                backgroundColor: activeCategory === cat ? 'var(--espresso)' : 'transparent',
                color: activeCategory === cat ? 'var(--cream)' : 'var(--espresso)',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p style={{
          fontFamily: 'Inter, sans-serif',
          color: 'var(--text-light)',
          fontSize: '0.9rem',
          marginBottom: '1.5rem',
          maxWidth: 1100,
          margin: '0 auto 1.5rem'
        }}>
          Showing {filtered.length} item{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
          maxWidth: 1100,
          margin: '0 auto'
        }}>
          {filtered.length === 0 ? (
            <div style={{
              gridColumn: '1/-1',
              textAlign: 'center',
              padding: '3rem',
              color: 'var(--text-light)',
              fontFamily: 'Inter, sans-serif'
            }}>
              No items found for "{search}"
            </div>
          ) : (
            filtered.map(item => (
              <div key={item.id} style={{
                backgroundColor: '#fff',
                borderRadius: 12,
                padding: '1.5rem',
                boxShadow: '0 2px 12px rgba(44,26,14,0.08)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer'
              }}
                onMouseOver={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(44,26,14,0.15)'
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(44,26,14,0.08)'
                }}
              >
                {/* Emoji */}
                <div style={{
                  fontSize: '2.5rem',
                  backgroundColor: 'var(--beige)',
                  width: 64,
                  height: 64,
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
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
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  marginBottom: '0.5rem'
                }}>
                  {item.name}
                </h3>

                {/* Description */}
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  color: 'var(--text-light)',
                  fontSize: '0.88rem',
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
            ))
          )}
        </div>

      </main>

      <Footer />
    </div>
  )
}

export default MenuPage