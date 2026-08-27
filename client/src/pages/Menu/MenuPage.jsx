import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

function MenuPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1, padding: '3rem 2rem', backgroundColor: 'var(--off-white)' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--espresso)' }}>
          Our Menu
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-light)', marginTop: '0.5rem' }}>
          Coming soon — full menu with categories and filters.
        </p>
      </main>
      <Footer />
    </div>
  )
}

export default MenuPage