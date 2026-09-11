import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

function CallToAction() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const badgesRef  = useRef(null)
  const circle1Ref = useRef(null)
  const circle2Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Floating circles
      gsap.to(circle1Ref.current, {
        y: -20, x: 15,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      gsap.to(circle2Ref.current, {
        y: 15, x: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5
      })

      // Content animation
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      )

      // Badges stagger
      gsap.fromTo(Array.from(badgesRef.current?.children || []),
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.5,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: badgesRef.current,
            start: 'top 90%',
          }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{
      backgroundColor: 'var(--coffee)',
      padding: '5rem 2rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* Background decoration */}
      <div ref={circle1Ref} style={{
        position: 'absolute',
        width: 400, height: 400,
        borderRadius: '50%',
        backgroundColor: 'var(--espresso)',
        top: -150, right: -100,
        opacity: 0.5
      }} />
      <div ref={circle2Ref} style={{
        position: 'absolute',
        width: 300, height: 300,
        borderRadius: '50%',
        backgroundColor: 'var(--espresso)',
        bottom: -120, left: -80,
        opacity: 0.4
      }} />

      {/* Content */}
      <div ref={contentRef} style={{ position: 'relative', zIndex: 1, maxWidth: 600, margin: '0 auto' }}>

        <p style={{
          fontFamily: 'Inter, sans-serif',
          color: 'var(--caramel)',
          fontSize: '0.9rem',
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: '1rem'
        }}>
          Order Today
        </p>

        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          color: 'var(--cream)',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 700,
          lineHeight: 1.2,
          marginBottom: '1.25rem'
        }}>
          Fresh Coffee Delivered to Your Door
        </h2>

        <p style={{
          fontFamily: 'Inter, sans-serif',
          color: 'var(--beige)',
          fontSize: '1rem',
          lineHeight: 1.8,
          opacity: 0.85,
          marginBottom: '2.5rem'
        }}>
          Order online and get your favourite cafe items delivered hot and fresh.
          Free delivery on orders above ₹499.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/menu" style={{
            backgroundColor: 'var(--caramel)',
            color: 'var(--cream)',
            padding: '1rem 2.5rem',
            border: 'none',
            borderRadius: 8,
            textDecoration: 'none',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '1rem',
            display: 'inline-block'
          }}
            onMouseOver={e => gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2 })}
            onMouseOut={e => gsap.to(e.currentTarget, { scale: 1, duration: 0.2 })}
          >
            Order Now →
          </Link>
          <Link to="/menu" style={{
            backgroundColor: 'transparent',
            color: 'var(--cream)',
            padding: '1rem 2.5rem',
            border: '2px solid var(--cream)',
            borderRadius: 8,
            textDecoration: 'none',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '1rem',
            opacity: 0.85,
            display: 'inline-block'
          }}
            onMouseOver={e => gsap.to(e.currentTarget, { scale: 1.05, opacity: 1, duration: 0.2 })}
            onMouseOut={e => gsap.to(e.currentTarget, { scale: 1, opacity: 0.85, duration: 0.2 })}
          >
            View Menu
          </Link>
        </div>

        {/* Delivery badges */}
        <div ref={badgesRef} style={{
          display: 'flex',
          gap: '2rem',
          justifyContent: 'center',
          marginTop: '3rem',
          flexWrap: 'wrap'
        }}>
          {[
            { icon: '🚀', text: 'Fast Delivery' },
            { icon: '🔥', text: 'Always Fresh'  },
            { icon: '💳', text: 'Easy Payments' },
          ].map(({ icon, text }) => (
            <div key={text} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--beige)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.9rem',
              opacity: 0.85
            }}>
              <span>{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default CallToAction