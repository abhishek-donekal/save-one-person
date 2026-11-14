import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { CartProvider } from '@/lib/shop/CartContext'
import CartDrawer from '@/components/shop/CartDrawer'
import PersonOfTheWeekPopup from '@/components/ui/PersonOfTheWeekPopup'
import HolidayBanner from '@/components/ui/HolidayBanner'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <HolidayBanner />
      <Header />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
      <PersonOfTheWeekPopup />
    </CartProvider>
  )
}
