import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useCart } from '../../store/CartContext'
import { useAuth } from '../../store/AuthContext'
import API_URL from '../../services/config'

function ProductDetailPage() {
  const { slug } = useParams()
  const { addToCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState([])
  const [avgRating, setAvgRating] = useState(0)
  const [totalReviews, setTotalReviews] = useState(0)
  const [loading, setLoading] = useState(true)

  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/products/${slug}`)
        const data = await res.json()
        if (data.success) {
          setProduct(data.product)
          const revRes = await fetch(`${API_URL}/reviews/product/${data.product._id}`)
          const revData = await revRes.json()
          if (revData.success) {
            setReviews(revData.reviews)
            setAvgRating(revData.avgRating)
            setTotalReviews(revData.totalReviews)
          }
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [slug])

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    if (!user) {
      navigate('/login')
      return
    }
    setSubmitting(true)
    setError('')
    setMessage('')
    try {
      const res = await fetch(`${API_URL}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          productId: product._id,
          rating,
          comment
        })
      })
      const data = await res.json()
      if (data.success) {
        setMessage('Review submitted ✅')
        setComment('')
        setRating(5)
        // Refresh reviews
        const revRes = await fetch(`${API_URL}/reviews/product/${product._id}`)
        const revData = await revRes.json()
        if (revData.success) {
          setReviews(revData.reviews)
          setAvgRating(revData.avgRating)
          setTotalReviews(revData.totalReviews)
        }
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', color: 'var(--text-light)' }}>
          Loading...
        </main>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-light)' }}>Product not found</p>
          <Link to="/menu" style={{ color: 'var(--caramel)', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>← Back to Menu</Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, backgroundColor: 'var(--off-white)', padding: '3rem 2rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>

          <Link to="/menu" style={{
            fontFamily: 'Inter, sans-serif',
            color: 'var(--caramel)',
            fontWeight: 600,
            textDecoration: 'none',
            fontSize: '0.9rem'
          }}>
            ← Back to Menu
          </Link>

          {/* Product */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: '2.5rem',
            marginTop: '1.5rem',
            backgroundColor: '#fff',
            borderRadius: 16,
            padding: '2rem',
            boxShadow: '0 2px 12px rgba(44,26,14,0.08)',
            alignItems: 'center'
          }}>
            <div style={{
              width: 140,
              height: 140,
              borderRadius: 16,
              backgroundColor: 'var(--beige)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '4rem'
            }}>
              {product.emoji || '☕'}
            </div>

            <div>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                color: 'var(--caramel)',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '0.4rem'
              }}>
                {product.category?.name || 'Menu'}
              </p>
              <h1 style={{
                fontFamily: 'Playfair Display, serif',
                color: 'var(--espresso)',
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                fontWeight: 700,
                marginBottom: '0.5rem'
              }}>
                {product.name}
              </h1>

              {/* Rating stars */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ color: 'var(--caramel)', fontSize: '1.1rem' }}>
                  {'★'.repeat(Math.round(avgRating))}{'☆'.repeat(5 - Math.round(avgRating))}
                </span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: 'var(--text-light)' }}>
                  {avgRating} ({totalReviews} review{totalReviews !== 1 ? 's' : ''})
                </span>
              </div>

              <p style={{
                fontFamily: 'Inter, sans-serif',
                color: 'var(--text-mid)',
                lineHeight: 1.7,
                marginBottom: '1.25rem'
              }}>
                {product.description}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <p style={{
                  fontFamily: 'Playfair Display, serif',
                  color: 'var(--espresso)',
                  fontSize: '1.8rem',
                  fontWeight: 700
                }}>
                  ₹{product.price}
                </p>
                <button
                  onClick={() => addToCart({
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    emoji: product.emoji || '☕'
                  })}
                  style={{
                    backgroundColor: 'var(--espresso)',
                    color: 'var(--cream)',
                    border: 'none',
                    borderRadius: 8,
                    padding: '0.75rem 1.5rem',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Reviews section */}
          <div style={{ marginTop: '3rem' }}>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              color: 'var(--espresso)',
              fontSize: '1.6rem',
              marginBottom: '1.5rem'
            }}>
              Customer Reviews
            </h2>

            {/* Write review */}
            <div style={{
              backgroundColor: '#fff',
              borderRadius: 12,
              padding: '1.5rem',
              boxShadow: '0 2px 12px rgba(44,26,14,0.08)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                color: 'var(--espresso)',
                marginBottom: '1rem'
              }}>
                Write a Review
              </h3>

              {!user ? (
                <p style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-light)' }}>
                  <Link to="/login" style={{ color: 'var(--caramel)', fontWeight: 600 }}>Login</Link> to leave a review.
                </p>
              ) : (
                <form onSubmit={handleSubmitReview}>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
                      Rating
                    </label>
                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      {[1, 2, 3, 4, 5].map(n => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setRating(n)}
                          style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            color: n <= rating ? 'var(--caramel)' : '#ddd'
                          }}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', fontWeight: 600, display: 'block', marginBottom: '0.4rem' }}>
                      Comment (optional)
                    </label>
                    <textarea
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                      rows={3}
                      placeholder="Share your experience..."
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: 8,
                        border: '2px solid var(--beige)',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.95rem',
                        outline: 'none',
                        boxSizing: 'border-box',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                  {message && (
                    <p style={{ color: '#14532d', fontFamily: 'Inter, sans-serif', marginBottom: '0.75rem' }}>{message}</p>
                  )}
                  {error && (
                    <p style={{ color: '#dc2626', fontFamily: 'Inter, sans-serif', marginBottom: '0.75rem' }}>{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      backgroundColor: 'var(--espresso)',
                      color: 'var(--cream)',
                      border: 'none',
                      borderRadius: 8,
                      padding: '0.65rem 1.5rem',
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      opacity: submitting ? 0.7 : 1
                    }}
                  >
                    {submitting ? 'Submitting...' : 'Submit Review'}
                  </button>
                </form>
              )}
            </div>

            {/* Review list */}
            {reviews.length === 0 ? (
              <p style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-light)', textAlign: 'center', padding: '2rem' }}>
                No reviews yet. Be the first!
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {reviews.map(r => (
                  <div key={r._id} style={{
                    backgroundColor: '#fff',
                    borderRadius: 12,
                    padding: '1.25rem',
                    boxShadow: '0 2px 12px rgba(44,26,14,0.08)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                          width: 36,
                          height: 36,
                          borderRadius: '50%',
                          backgroundColor: 'var(--espresso)',
                          color: 'var(--cream)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 700,
                          fontSize: '0.85rem'
                        }}>
                          {r.user?.name?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                        <div>
                          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, color: 'var(--espresso)', fontSize: '0.95rem' }}>
                            {r.user?.name || 'Customer'}
                          </p>
                          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'var(--text-light)' }}>
                            {new Date(r.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <span style={{ color: 'var(--caramel)', fontSize: '1rem' }}>
                        {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                      </span>
                    </div>
                    {r.comment && (
                      <p style={{
                        fontFamily: 'Inter, sans-serif',
                        color: 'var(--text-mid)',
                        fontSize: '0.95rem',
                        lineHeight: 1.6,
                        marginTop: '0.5rem'
                      }}>
                        {r.comment}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ProductDetailPage