import Header from "../components/Header"


export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-blue-charcoal-950 min-h-screen">
      <Header />
      {children}
    </main>
  )
}