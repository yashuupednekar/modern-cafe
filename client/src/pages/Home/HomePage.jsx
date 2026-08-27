import Navbar from '../../components/Navbar'
import Hero from '../../components/Hero'
import FeaturedMenu from '../../components/FeaturedMenu'
import Testimonials from '../../components/Testimonials'
import CallToAction from '../../components/CallToAction'
import Footer from '../../components/Footer'

function HomePage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Hero />
      <FeaturedMenu />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  )
}

export default HomePage