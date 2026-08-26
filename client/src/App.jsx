function App() {
  return (
    <div style={{ padding: '2rem', backgroundColor: 'var(--off-white)', minHeight: '100vh' }}>
      
      {/* Color Palette Test */}
      <h1 style={{ marginBottom: '1rem' }}>Modern Cafe — Design System</h1>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {[
          { name: 'Espresso',   color: '#2C1A0E' },
          { name: 'Coffee',     color: '#4A2C17' },
          { name: 'Brown Mid',  color: '#6B3F2A' },
          { name: 'Caramel',    color: '#C47F3A' },
          { name: 'Cream',      color: '#F5ECD7' },
          { name: 'Beige',      color: '#EDE0C8' },
        ].map(({ name, color }) => (
          <div key={name} style={{ textAlign: 'center' }}>
            <div style={{ width: 80, height: 80, backgroundColor: color, borderRadius: 8, border: '1px solid #ccc' }} />
            <p style={{ fontSize: 12, marginTop: 4, color: 'var(--text-mid)' }}>{name}</p>
          </div>
        ))}
      </div>

      {/* Typography Test */}
      <h1>Heading 1 — Playfair Display</h1>
      <h2>Heading 2 — Playfair Display</h2>
      <h3>Heading 3 — Playfair Display</h3>
      <p style={{ marginTop: '1rem', color: 'var(--text-mid)' }}>
        Body text — Inter font. The quick brown fox jumps over the lazy dog.
      </p>

      {/* Button Test */}
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <button style={{
          backgroundColor: 'var(--espresso)',
          color: 'var(--cream)',
          padding: '0.75rem 1.5rem',
          border: 'none',
          borderRadius: 6,
          cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600
        }}>
          Primary Button
        </button>
        <button style={{
          backgroundColor: 'transparent',
          color: 'var(--espresso)',
          padding: '0.75rem 1.5rem',
          border: '2px solid var(--espresso)',
          borderRadius: 6,
          cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600
        }}>
          Outline Button
        </button>
      </div>

    </div>
  )
}

export default App