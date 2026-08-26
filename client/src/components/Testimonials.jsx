const reviews = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    comment: 'The cappuccino here is absolutely divine! Best cafe experience in the city. The ambiance is warm and the staff is incredibly friendly.',
    avatar: 'PS'
  },
  {
    id: 2,
    name: 'Rahul Mehta',
    location: 'Pune',
    rating: 5,
    comment: 'Ordered the cold brew and cheesecake for delivery — arrived perfectly packed and tasted amazing. Will definitely order again!',
    avatar: 'RM'
  },
  {
    id: 3,
    name: 'Sneha Patil',
    location: 'Aurangabad',
    rating: 5,
    comment: 'Modern Cafe has the best matcha latte I have ever had. The croissants are freshly baked and melt in your mouth. Highly recommended!',
    avatar: 'SP'
  },
]

function Testimonials() {
  return (
    <section style={{
      backgroundColor: 'var(--beige)',
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
          What People Say
        </p>
        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          color: 'var(--espresso)',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 700,
        }}>
          Customer Reviews
        </h2>
      </div>

      {/* Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        maxWidth: 1000,
        margin: '0 auto'
      }}>
        {reviews.map(review => (
          <div key={review.id} style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: '2rem',
            boxShadow: '0 2px 12px rgba(44, 26, 14, 0.08)',
          }}>

            {/* Stars */}
            <div style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
              {'★'.repeat(review.rating)}
            </div>

            {/* Comment */}
            <p style={{
              fontFamily: 'Inter, sans-serif',
              color: 'var(--text-mid)',
              fontSize: '0.95rem',
              lineHeight: 1.7,
              marginBottom: '1.5rem',
              fontStyle: 'italic'
            }}>
              "{review.comment}"
            </p>

            {/* Author */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: 44,
                height: 44,
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
                {review.avatar}
              </div>
              <div>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  color: 'var(--espresso)',
                  fontWeight: 600,
                  fontSize: '0.95rem'
                }}>
                  {review.name}
                </p>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  color: 'var(--text-light)',
                  fontSize: '0.8rem'
                }}>
                  {review.location}
                </p>
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  )
}

export default Testimonials