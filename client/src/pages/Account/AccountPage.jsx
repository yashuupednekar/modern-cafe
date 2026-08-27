import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

function AccountPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1, padding: '3rem 2rem', backgroundColor: 'var(--off-white)' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--espresso)' }}>My Account</h1>
        <p style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-light)', marginTop: '0.5rem' }}>Coming soon.</p>
      </main>
      <Footer />
    </div>
  )
}

export default AccountPage