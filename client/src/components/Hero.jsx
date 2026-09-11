import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

function Hero() {
  const heroRef    = useRef(null)
  const taglineRef = useRef(null)
  const headingRef = useRef(null)
  const subRef     = useRef(null)
  const buttonsRef = useRef(null)
  const statsRef   = useRef(null)
  const circle1Ref = useRef(null)
  const circle2Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Background circles float animation
      gsap.to(circle1Ref.current, {
        y: -30,
        x: 20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      gsap.to(circle2Ref.current, {
        y: 20,
        x: -15,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5
      })

      // Entrance timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(taglineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
      .fromTo(headingRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 },
        '-=0.4'
      )
      .fromTo(subRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5'
      )
      .fromTo(buttonsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4'
      )
      .fromTo(statsRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.15 },
        '-=0.3'
      )

    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} style={{
      minHeight: '100vh',
      backgroundColor: 'var(--espresso)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* Background circles */}
      <div ref={circle1Ref} style={{
        position: 'absolute',
        width: 500,
        height: 500,
        borderRadius: '50%',
        backgroundColor: 'var(--coffee)',
        top: -100,
        right: -100,
        opacity: 0.4
      }} />
      <div ref={circle2Ref} style={{
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: '50%',
        backgroundColor: 'var(--caramel)',
        bottom: -80,
        left: -80,
        opacity: 0.15
      }} />

      {/* Content */}
      <div style={{ textAlign: 'center', zIndex: 1, maxWidth: 700 }}>

        {/* Tagline */}
        <p ref={taglineRef} style={{
          fontFamily: 'Inter, sans-serif',
          color: 'var(--caramel)',
          fontSize: '0.95rem',
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: '1.5rem',
          opacity: 0
        }}>
          ☕ Premium Cafe Experience
        </p>

        {/* Main Heading */}
        <h1 ref={headingRef} style={{
          fontFamily: 'Playfair Display, serif',
          color: 'var(--cream)',
          fontSize: 'clamp(2.5rem, 7vw, 5rem)',
          fontWeight: 700,
          lineHeight: 1.15,
          marginBottom: '1.5rem',
          opacity: 0
        }}>
          Where Every Sip Tells a Story
        </h1>

        {/* Subtext */}
        <p ref={subRef} style={{
          fontFamily: 'Inter, sans-serif',
          color: 'var(--beige)',
          fontSize: '1.1rem',
          lineHeight: 1.8,
          opacity: 0,
          marginBottom: '2.5rem',
          maxWidth: 500,
          margin: '0 auto 2.5rem'
        }}>
          Handcrafted coffee, freshly baked goods and a warm atmosphere —
          delivered to your door or enjoyed in our cafe.
        </p>

        {/* Buttons */}
        <div ref={buttonsRef} style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          opacity: 0
        }}>
          <button style={{
            backgroundColor: 'var(--caramel)',
            color: 'var(--cream)',
            padding: '1rem 2rem',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '1rem',
          }}
            onMouseOver={e => gsap.to(e.target, { scale: 1.05, duration: 0.2 })}
            onMouseOut={e => gsap.to(e.target, { scale: 1, duration: 0.2 })}
          >
            Explore Our Menu →
          </button>
          <button style={{
            backgroundColor: 'transparent',
            color: 'var(--cream)',
            padding: '1rem 2rem',
            border: '2px solid var(--cream)',
            borderRadius: 8,
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '1rem',
            opacity: 0.85,
          }}
            onMouseOver={e => gsap.to(e.target, { scale: 1.05, duration: 0.2 })}
            onMouseOut={e => gsap.to(e.target, { scale: 1, duration: 0.2 })}
          >
            Order Now
          </button>
        </div>

        {/* Stats */}
        <div ref={statsRef} style={{
          display: 'flex',
          gap: '3rem',
          justifyContent: 'center',
          marginTop: '4rem',
          flexWrap: 'wrap'
        }}>
          {[
            { number: '50+',  label: 'Menu Items'       },
            { number: '10K+', label: 'Happy Customers'  },
            { number: '5★',   label: 'Average Rating'   },
          ].map(({ number, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <p style={{
                fontFamily: 'Playfair Display, serif',
                color: 'var(--caramel)',
                fontSize: '2rem',
                fontWeight: 700
              }}>
                {number}
              </p>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                color: 'var(--beige)',
                fontSize: '0.85rem',
                opacity: 0.7,
                marginTop: '0.25rem'
              }}>
                {label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Hero