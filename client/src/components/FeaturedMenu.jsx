import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { useCart } from '../store/CartContext'
import API_URL from '../services/config'

gsap.registerPlugin(ScrollTrigger)

function FeaturedMenu() {
  const { addToCart } = useCart()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardsRef   = useRef(null)
  const btnRef     = useRef(null)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res  = await fetch(`${API_URL}/products`)
        const data = await res.json()
        if (data.success && data.products?.length) {
          // Prefer featured, otherwise first 6
          const featured = data.products.filter(p => p.isFeatured)
          setItems(featured.length > 0 ? featured.slice(0, 6) : data.products.slice(0, 6))
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchFeatured()
  }, [])

  useEffect(() => {
    if (loading || items.length === 0) return

    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1,
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' }
        }
      )

      gsap.fromTo(Array.from(cardsRef.current?.children || []),
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 85%' }
        }
      )

      gsap.fromTo(btnRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.6,
          scrollTrigger: { trigger: btnRef.current, start: 'top 90%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [loading, items])

  return (
    <section ref={sectionRef} style={{
      backgroundColor: 'var(--off-white)',
      padding: '5rem 2rem',
    }}>

      <div ref={headingRef} style={{ textAlign: 'center', marginBottom: '3rem' }}>
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

      {loading ? (
        <p style={{ textAlign: 'center', fontFamily: 'Inter, sans-serif', color: 'var(--text-light)' }}>
          Loading menu...
        </p>
      ) : (
        <div ref={cardsRef} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          maxWidth: 1100,
          margin: '0 auto'
        }}>
          {items.map(item => (
            <div
              key={item._id}
              style={{
                backgroundColor: '#fff',
                borderRadius: 12,
                padding: '1.5rem',
                boxShadow: '0 2px 12px rgba(44, 26, 14, 0.08)',
                cursor: 'pointer'
              }}
              onMouseOver={e => gsap.to(e.currentTarget, { y: -6, boxShadow: '0 12px 28px rgba(44,26,14,0.15)', duration: 0.25 })}
              onMouseOut={e => gsap.to(e.currentTarget, { y: 0, boxShadow: '0 2px 12px rgba(44,26,14,0.08)', duration: 0.25 })}
            >
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
                {item.emoji || '☕'}
              </div>

              <p style={{
                fontFamily: 'Inter, sans-serif',
                color: 'var(--caramel)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '0.4rem'
              }}>
                {item.category?.name || 'Menu'}
              </p>

              <h3 style={{
                fontFamily: 'Playfair Display, serif',
                color: 'var(--espresso)',
                fontSize: '1.2rem',
                fontWeight: 700,
                marginBottom: '0.5rem'
              }}>
                {item.name}
              </h3>

              <p style={{
                fontFamily: 'Inter, sans-serif',
                color: 'var(--text-light)',
                fontSize: '0.9rem',
                lineHeight: 1.6,
                marginBottom: '1.25rem'
              }}>
                {item.description}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{
                  fontFamily: 'Playfair Display, serif',
                  color: 'var(--espresso)',
                  fontSize: '1.2rem',
                  fontWeight: 700
                }}>
                  ₹{item.price}
                </p>
                <button
                  onClick={() => addToCart({
                    _id: item._id,
                    name: item.name,
                    price: item.price,
                    emoji: item.emoji || '☕',
                  })}
                  onMouseOver={e => gsap.to(e.target, { scale: 1.05, duration: 0.2 })}
                  onMouseOut={e => gsap.to(e.target, { scale: 1, duration: 0.2 })}
                  style={{
                    backgroundColor: 'var(--espresso)',
                    color: 'var(--cream)',
                    border: 'none',
                    borderRadius: 6,
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: '0.85rem'
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div ref={btnRef} style={{ textAlign: 'center', marginTop: '3rem' }}>
        <Link
          to="/menu"
          style={{
            display: 'inline-block',
            backgroundColor: 'transparent',
            color: 'var(--espresso)',
            border: '2px solid var(--espresso)',
            borderRadius: 8,
            padding: '0.85rem 2rem',
            textDecoration: 'none',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '1rem'
          }}
          onMouseOver={e => gsap.to(e.currentTarget, { backgroundColor: 'var(--espresso)', color: 'var(--cream)', duration: 0.3 })}
          onMouseOut={e => gsap.to(e.currentTarget, { backgroundColor: 'transparent', color: 'var(--espresso)', duration: 0.3 })}
        >
          View Full Menu →
        </Link>
      </div>

    </section>
  )
}

export default FeaturedMenu