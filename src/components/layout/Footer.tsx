import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Heart, Award, ShieldCheck, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-paradise-maroon-950 text-paradise-cream-200 border-t-2 border-paradise-gold-600/40 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-paradise-gold-400 to-paradise-gold-700 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-paradise-maroon-900 rounded-full flex flex-col items-center justify-center">
                  <span className="font-serif font-black text-paradise-gold-400 text-lg">P</span>
                </div>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-paradise-gold-300 tracking-wider">
                  PARADISE
                </h3>
                <p className="text-[10px] text-paradise-gold-400 uppercase tracking-widest">
                  Est. 1953 • Secunderabad
                </p>
              </div>
            </div>
            <p className="text-sm text-paradise-cream-300/80 leading-relaxed">
              Serving the authentic, world-famous Royal Hyderabadi Dum Biryani for over 7 decades. Slow-cooked over charcoal embers with pure ghee, saffron, and Nizami royal heritage.
            </p>
            <div className="flex items-center gap-2 pt-2 text-paradise-gold-400 text-xs">
              <Award className="w-4 h-4 text-paradise-gold-400 flex-shrink-0" />
              <span>Limca Book of Records Winner for Most Biryanis Served</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-paradise-gold-300 border-b border-paradise-gold-700/40 pb-2">
              Royal Catalog
            </h4>
            <ul className="space-y-2 text-sm text-paradise-cream-300/80">
              <li>
                <Link href="/menu?category=dum-biryani" className="hover:text-paradise-gold-300 transition-colors">
                  Hyderabadi Dum Biryani
                </Link>
              </li>
              <li>
                <Link href="/menu?category=starters-kebabs" className="hover:text-paradise-gold-300 transition-colors">
                  Kalmi & Reshmi Kebabs
                </Link>
              </li>
              <li>
                <Link href="/menu?category=curries-breads" className="hover:text-paradise-gold-300 transition-colors">
                  Mirchi Ka Salan & Curries
                </Link>
              </li>
              <li>
                <Link href="/menu?category=heritage-desserts" className="hover:text-paradise-gold-300 transition-colors">
                  Shahi Qubani & Double Ka Meetha
                </Link>
              </li>
              <li>
                <Link href="/reservation" className="hover:text-paradise-gold-300 transition-colors text-paradise-gold-300 font-bold flex items-center gap-1">
                  <span>📅 Reserve a Table (Priority Seating)</span>
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-paradise-gold-300 transition-colors flex items-center gap-1">
                  <span>📸 Restaurant Photos & Gallery</span>
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="hover:text-paradise-gold-300 transition-colors text-paradise-gold-400 font-semibold flex items-center gap-1">
                  <span>★ Patron Reviews & Feedback</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Key Outlets */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-paradise-gold-300 border-b border-paradise-gold-700/40 pb-2">
              Flagship Outlets
            </h4>
            <ul className="space-y-2.5 text-sm text-paradise-cream-300/80">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-paradise-gold-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-paradise-gold-200 block">Secunderabad Flagship</strong>
                  <span className="text-xs text-paradise-cream-400">SD Road, Paradise Circle</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-paradise-gold-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-paradise-gold-200 block">Hitec City / Madhapur</strong>
                  <span className="text-xs text-paradise-cream-400">Cyber Pearl Building</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-paradise-gold-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-paradise-gold-200 block">Gachibowli Hub</strong>
                  <span className="text-xs text-paradise-cream-400">Old Mumbai Highway</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-paradise-gold-300 border-b border-paradise-gold-700/40 pb-2">
              Contact & Hours
            </h4>
            <div className="space-y-3 text-sm text-paradise-cream-300/80">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-paradise-gold-400 flex-shrink-0" />
                <span>11:00 AM – 11:30 PM (All Days)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-paradise-gold-400 flex-shrink-0" />
                <span>+91 40 6666 5555</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-paradise-gold-400 flex-shrink-0" />
                <span>orders@paradisefoodcourt.in</span>
              </div>
              <div className="pt-2">
                <Link
                  href="/locations"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded bg-paradise-gold-500/20 border border-paradise-gold-400 text-paradise-gold-300 hover:bg-paradise-gold-500/30 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  View All Outlets & Directions
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-paradise-maroon-800 flex flex-col sm:flex-row items-center justify-between text-xs text-paradise-cream-400 gap-4">
          <p>© {new Date().getFullYear()} Paradise Food Court Pvt. Ltd. All Rights Reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with Royal Nizami Passion</span>
            <Heart className="w-3.5 h-3.5 text-paradise-gold-400 fill-paradise-gold-400 ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
}
