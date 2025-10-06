import Header from "../components/Header"
import Footer from "../components/Footer"


export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <Header />
    <main className="h-full flex-1">
      
      {children}
    </main>
    <Footer />
    </>
  )
}