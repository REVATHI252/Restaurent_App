import React from 'react';
import HeroBanner from '@/components/home/HeroBanner';
import CategoryPills from '@/components/home/CategoryPills';
import BestsellerGrid from '@/components/home/BestsellerGrid';
import HeritageStory from '@/components/home/HeritageStory';
import Link from 'next/link';
import { MapPin, Phone, Star, ShieldCheck, Truck, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-0">
      {/* 1. Royal Hero Banner */}
      <HeroBanner />

      {/* 2. Key Highlights Strip */}
      <section className="bg-paradise-maroon-950 py-6 border-b border-paradise-gold-700/40 text-paradise-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center gap-1.5">
              <Sparkles className="w-5 h-5 text-paradise-gold-400" />
              <h3 className="font-serif text-sm font-bold text-paradise-gold-200">Royal Nizami Recipe</h3>
              <p className="text-[11px] text-paradise-cream-400">Preserved unchanged since 1953</p>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <ShieldCheck className="w-5 h-5 text-paradise-gold-400" />
              <h3 className="font-serif text-sm font-bold text-paradise-gold-200">100% Halal & Fresh</h3>
              <p className="text-[11px] text-paradise-cream-400">Strict hygiene & quality audits</p>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Truck className="w-5 h-5 text-paradise-gold-400" />
              <h3 className="font-serif text-sm font-bold text-paradise-gold-200">Hot Clay Dum Delivery</h3>
              <p className="text-[11px] text-paradise-cream-400">Delivered sealed & piping hot</p>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Star className="w-5 h-5 text-paradise-gold-400 fill-paradise-gold-400" />
              <h3 className="font-serif text-sm font-bold text-paradise-gold-200">4.8★ Across 500K+ Reviews</h3>
              <p className="text-[11px] text-paradise-cream-400">Hyderabad's undisputed favourite</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Royal Categories */}
      <CategoryPills />

      {/* 4. Legendary Bestsellers Carousel / Grid */}
      <BestsellerGrid />

      {/* 5. Heritage Story of 1953 */}
      <HeritageStory />

      {/* 6. Quick Outlet Finder Banner */}
      <section className="py-16 bg-paradise-cream-100 border-t border-paradise-cream-300">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-paradise-maroon-900 text-paradise-gold-400 mx-auto flex items-center justify-center shadow-gold-glow">
            <MapPin className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-3xl font-black text-paradise-charcoal-900">
            Craving Authentic Dum Biryani? Visit Us Today
          </h2>
          <p className="text-sm text-paradise-charcoal-600 max-w-xl mx-auto font-sans">
            From our historic Secunderabad Flagship to modern hubs in Hitec City, Gachibowli, and Begumpet — our doors are open for Royal Dine-in, Takeaway, and Home Delivery.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/locations"
              className="px-8 py-3.5 rounded-full bg-paradise-maroon-900 text-paradise-gold-300 font-bold text-xs uppercase tracking-wider hover:bg-paradise-maroon-800 shadow-royal-md transition-all"
            >
              Locate All Outlets & Timings
            </Link>
            <a
              href="tel:+914066665555"
              className="px-8 py-3.5 rounded-full bg-white border border-paradise-gold-500 text-paradise-maroon-900 font-bold text-xs uppercase tracking-wider hover:bg-paradise-cream-200 flex items-center gap-2 transition-all shadow-sm"
            >
              <Phone className="w-4 h-4 text-paradise-gold-600" />
              <span>Call 040-6666-5555</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
