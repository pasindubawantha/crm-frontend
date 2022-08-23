import Header from "./header"
import Footer from "./footer"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="container py-3">
      <Header />
      <main className="container">{children}</main>
      <Footer />
    </div>
  )
}
