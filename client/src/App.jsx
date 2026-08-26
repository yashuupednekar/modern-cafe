import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      <Navbar />

      {/* Main Content */}
      <main style={{ flex: 1, padding: '3rem 2rem', backgroundColor: 'var(--off-white)' }}>
        <h1 style={{ marginBottom: '1rem' }}>Welcome to Modern Cafe</h1>
        <p style={{ color: 'var(--text-mid)', fontFamily: 'Inter, sans-serif' }}>
          Phase 3 — Building pages next!
        </p>
      </main>

      <Footer />

    </div>
  )
}

export default App