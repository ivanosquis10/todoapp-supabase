import Footer from './Footer'
import Header from './Header'

export default function Layout({ children }) {
  return (
    <div className="container">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
