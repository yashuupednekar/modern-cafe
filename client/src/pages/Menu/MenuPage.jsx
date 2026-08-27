import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import api from '../../services/api'

function MenuPage() {
  const [products, setProducts]           = useState([])
  const [categories, setCategories]       = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch]               = useState('')
  const [loading, setLoading]             = useState(true)

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await api.getCategories()
      if (data.success) setCategories(data.categories)
    }
    fetchCategories()
  }, [])

  // Fetch products when category or search changes
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      const params = {}
      if (activeCategory !== 'all') params.category = activeCategory
      if (search) params.search = search
      const data = await api.getProducts(params)
      if (data.success) setProducts(data.products)
      setLoading(false)
    }

    const delay = setTimeout(fetchProducts, 300)
    return () => clearTimeout(delay)
  }, [activeCategory, search])

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
          {/* All button */}
          <button
            onClick={() => setActiveCategory('all')}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: 25,
              border: '2px solid var(--espresso)',
              backgroundColor: activeCategory === 'all' ? 'var(--espresso)' : 'transparent',
              color: activeCategory === 'all' ? 'var(--cream)' : 'var(--espresso)',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
            }}
          >
            All
          </button>

          {categories.map(cat => (
            <button
              key={cat._id}
              onClick={() => setActiveCategory(cat.slug)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: 25,
                border: '2px solid var(--espresso)',
                backgroundColor: activeCategory === cat.slug ? 'var(--espresso)' : 'transparent',
                color: activeCategory === cat.slug ? 'var(--cream)' : 'var(--espresso)',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
              }}
            >
              {cat.name}
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
          {loading ? 'Loading...' : `Showing ${products.length} item${products.length !== 1 ? 's' : ''}`}
        </p>

        {/* Loading Skeleton */}
        {loading ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
            maxWidth: 1100,
            margin: '0 auto'
          }}>
            {[1,2,3,4,5,6].map(i => (
              <div key={i} style={{
                backgroundColor: '#fff',
                borderRadius: 12,
                padding: '1.5rem',
                height: 280,
                boxShadow: '0 2px 12px rgba(44,26,14,0.08)',
                animation: 'pulse 1.5s infinite'
              }} />
            ))}
          </div>
        ) : (
          /* Cards Grid */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
            maxWidth: 1100,
            margin: '0 auto'
          }}>
            {products.length === 0 ? (
              <div style={{
                gridColumn: '1/-1',
                textAlign: 'center',
                padding: '3rem',
                color: 'var(--text-light)',
                fontFamily: 'Inter, sans-serif'
              }}>
                No items found.
              </div>
            ) : (
              products.map(item => (
                <div key={item._id} style={{
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
                    {item.category?.name}
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
        )}

      </main>

      <Footer />
    </div>
  )
}

export default MenuPage