'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import {
  Home,
  UtensilsCrossed,
  MapPin,
  Camera,
  CalendarDays,
  Package,
  MessageSquareHeart,
  ShoppingBag,
  Menu as MenuIcon,
  X,
  Clock,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const { isAdmin } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState('Secunderabad (Flagship)');

  const navButtons = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Menu', href: '/menu', icon: UtensilsCrossed },
    { name: 'Outlets', href: '/locations', icon: MapPin },
    { name: 'Photos', href: '/gallery', icon: Camera },
    { name: 'Reserve Table', href: '/reservation', icon: CalendarDays },
    { name: 'Orders', href: '/orders', icon: Package },
    { name: 'Feedback', href: '/feedback', icon: MessageSquareHeart },
    ...(isAdmin ? [{ name: 'Admin Portal', href: '/admin', icon: ShieldCheck }] : []),
  ];

  return (
    <>
      {/* Top Heritage Notice Bar */}
      <div className="bg-paradise-maroon-950 text-paradise-gold-200 text-xs py-1.5 px-4 text-center border-b border-paradise-gold-900/40 tracking-wider flex items-center justify-between font-sans">
        <div className="hidden md:flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-paradise-gold-400" />
          <span>Delivering Hot & Fresh across Hyderabad (11 AM - 11:30 PM)</span>
        </div>
        <div className="mx-auto md:mx-0 flex items-center gap-1.5 font-semibold text-paradise-gold-300">
          <span>✨ World Famous Hyderabadi Dum Biryani Since 1953 ✨</span>
        </div>
        <div className="flex items-center gap-3 text-paradise-gold-400 text-xs">
          <span className="hidden md:inline">Toll Free: 1800-PARADISE</span>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 bg-paradise-maroon-900/95 backdrop-blur-md border-b-2 border-paradise-gold-600/30 text-white shadow-royal-md transition-colors">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-3 sm:gap-4">
            {/* Left Side: Brand Logo + Line-wise Navigation Buttons */}
            <div className="flex items-center gap-3 sm:gap-5 flex-1 min-w-0">
              {/* Brand Logo & Royal Insignia */}
              <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group flex-shrink-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-paradise-gold-400 via-paradise-gold-500 to-paradise-gold-700 p-0.5 shadow-gold-glow flex items-center justify-center transform group-hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-paradise-maroon-900 rounded-full flex flex-col items-center justify-center border border-paradise-gold-300/40">
                    <span className="font-serif font-black text-paradise-gold-400 text-sm sm:text-base leading-none">P</span>
                    <span className="text-[5.5px] sm:text-[6.5px] text-paradise-gold-300 uppercase tracking-tighter">1953</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-paradise-gold-300 drop-shadow-sm group-hover:text-paradise-gold-200 transition-colors">
                    PARADISE
                  </span>
                  <span className="text-[7.5px] sm:text-[8.5px] uppercase tracking-[0.2em] text-paradise-gold-400/90 font-sans">
                    HYDERABAD
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation Royal Buttons - Line Wise on Left */}
              <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2 overflow-x-auto py-1 scrollbar-none">
                {navButtons.map((btn) => {
                  const IconComponent = btn.icon;
                  const isActive = pathname === btn.href;
                  return (
                    <Link
                      key={btn.name}
                      href={btn.href}
                      className={`inline-flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-xl text-[11px] xl:text-xs font-bold whitespace-nowrap transition-all transform active:scale-95 border flex-shrink-0 ${
                        isActive
                          ? 'bg-gradient-to-r from-paradise-gold-400 via-paradise-gold-500 to-paradise-gold-600 text-paradise-maroon-950 border-paradise-gold-300 shadow-gold-glow font-black'
                          : 'bg-paradise-maroon-950/70 hover:bg-paradise-maroon-800 text-paradise-cream-200 hover:text-paradise-gold-300 border-paradise-gold-700/40 hover:border-paradise-gold-400 shadow-sm'
                      }`}
                    >
                      <IconComponent
                        className={`w-3.5 h-3.5 flex-shrink-0 ${
                          isActive ? 'text-paradise-maroon-950' : 'text-paradise-gold-400'
                        }`}
                      />
                      <span>{btn.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Right Action Icons (Location Selector + Cart Button + Mobile Toggle) */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {/* Location Selector */}
              <div className="hidden 2xl:flex items-center gap-1.5 bg-paradise-maroon-950/80 border border-paradise-gold-600/40 rounded-xl px-2.5 py-1.5 text-xs text-paradise-cream-200">
                <MapPin className="w-3.5 h-3.5 text-paradise-gold-400 flex-shrink-0 animate-bounce" />
                <select
                  value={selectedOutlet}
                  onChange={(e) => setSelectedOutlet(e.target.value)}
                  aria-label="Select Paradise outlet location"
                  className="bg-transparent text-white font-medium focus:outline-none cursor-pointer text-[11px]"
                >
                  <option value="Secunderabad (Flagship)" className="bg-paradise-maroon-900 text-white">
                    Secunderabad (Flagship)
                  </option>
                  <option value="Hitec City" className="bg-paradise-maroon-900 text-white">
                    Hitec City / Madhapur
                  </option>
                  <option value="Gachibowli" className="bg-paradise-maroon-900 text-white">
                    Gachibowli
                  </option>
                  <option value="Begumpet" className="bg-paradise-maroon-900 text-white">
                    Begumpet
                  </option>
                  <option value="Kukatpally" className="bg-paradise-maroon-900 text-white">
                    Kukatpally
                  </option>
                </select>
              </div>

              {/* Cart Drawer Trigger Button - Always Prominently Visible */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-paradise-gold-400 via-paradise-gold-500 to-paradise-gold-600 hover:from-paradise-gold-300 hover:to-paradise-gold-500 text-paradise-maroon-950 font-black px-3.5 sm:px-4 py-2 rounded-xl shadow-gold-glow hover:shadow-gold-glow-lg transition-all transform active:scale-95 flex-shrink-0 cursor-pointer border border-paradise-gold-300"
              >
                <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-paradise-maroon-950" />
                <span className="text-xs font-black uppercase tracking-wide">
                  Cart
                </span>
                {totalItems > 0 ? (
                  <span className="bg-paradise-maroon-950 text-paradise-gold-300 text-[11px] font-black rounded-full w-5 h-5 flex items-center justify-center border border-paradise-gold-400 ml-0.5">
                    {totalItems}
                  </span>
                ) : (
                  <span className="bg-paradise-maroon-950/20 text-paradise-maroon-950 text-[10px] font-bold rounded-full px-1.5 py-0.5 ml-0.5">
                    0
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
                className="lg:hidden text-paradise-gold-300 p-2 rounded-xl bg-paradise-maroon-950/80 border border-paradise-gold-600/40 hover:bg-paradise-maroon-800 flex-shrink-0"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu with Styled Buttons */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-paradise-maroon-950 border-t-2 border-paradise-gold-700/50 px-4 pt-3 pb-6 space-y-3">
            <div className="flex items-center gap-2 text-xs text-paradise-gold-300 pb-2 border-b border-paradise-maroon-800">
              <MapPin className="w-4 h-4 text-paradise-gold-400" />
              <span>Current Outlet: {selectedOutlet}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {navButtons.map((btn) => {
                const IconComponent = btn.icon;
                const isActive = pathname === btn.href;
                return (
                  <Link
                    key={btn.name}
                    href={btn.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all border ${
                      isActive
                        ? 'bg-gradient-to-r from-paradise-gold-400 to-paradise-gold-600 text-paradise-maroon-950 border-paradise-gold-300 shadow-gold-glow'
                        : 'bg-paradise-maroon-900 text-paradise-cream-200 hover:text-paradise-gold-300 border-paradise-maroon-800'
                    }`}
                  >
                    <IconComponent
                      className={`w-4 h-4 ${
                        isActive ? 'text-paradise-maroon-950' : 'text-paradise-gold-400'
                      }`}
                    />
                    <span>{btn.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
