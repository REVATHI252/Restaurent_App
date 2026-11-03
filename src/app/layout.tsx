import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import FeedbackModal from '@/components/common/FeedbackModal';

export const metadata: Metadata = {
  title: 'Paradise Food Court | World Famous Hyderabadi Dum Biryani Since 1953',
  description:
    'Experience authentic Royal Hyderabadi Dum Biryani, Kalmi Kebabs, Mirchi Ka Salan, and Shahi Qubani-ka-Meetha from the iconic Paradise Food Court, Secunderabad.',
  keywords: [
    'Paradise Food Court',
    'Hyderabadi Dum Biryani',
    'Best Biryani in Hyderabad',
    'Secunderabad Biryani',
    'Mutton Dum Biryani',
    'Chicken Dum Biryani',
    'Kebabs',
    'Paradise Online Order',
  ],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-paradise-maroon-950">
      <body className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#1F1F1F] antialiased selection:bg-paradise-maroon-800 selection:text-paradise-gold-200">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
            <FeedbackModal />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
