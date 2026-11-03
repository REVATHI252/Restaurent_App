'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Utensils, Award, ArrowRight } from 'lucide-react';

export default function HeroBanner() {
  return (
    <section className="relative bg-royal-gradient text-white overflow-hidden py-16 md:py-24 border-b-2 border-paradise-gold-600/40">
      {/* Background Decorative Motifs */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-paradise-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-paradise-maroon-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Royal Narrative */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Heritage Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paradise-maroon-950/90 border border-paradise-gold-400/70 text-paradise-gold-300 text-xs uppercase tracking-widest font-bold shadow-gold-glow">
              <Sparkles className="w-3.5 h-3.5 text-paradise-gold-400" />
              <span>The Nizam's Royal Legacy • Since 1953</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
              World Famous{' '}
              <span className="gold-gradient-text drop-shadow">
                Hyderabadi Dum Biryani
              </span>
            </h1>

            {/* Sub-description */}
            <p className="text-base sm:text-lg text-paradise-cream-200/90 leading-relaxed font-sans max-w-2xl mx-auto lg:mx-0">
              Slow-cooked in sealed clay handis over charcoal embers with aged long-grain basmati, tender halal meat, pure desi ghee, and saffron. Experience the true taste of royalty.
            </p>

            {/* Main CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/menu"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-paradise-gold-400 via-paradise-gold-500 to-paradise-gold-600 text-paradise-maroon-950 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-gold-glow-lg hover:shadow-gold-glow transition-all transform active:scale-95"
              >
                <Utensils className="w-4 h-4 text-paradise-maroon-950" />
                <span>Order Royal Biryani</span>
                <ArrowRight className="w-4 h-4 text-paradise-maroon-950" />
              </Link>

              <Link
                href="/reservation"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-paradise-gold-500/20 hover:bg-paradise-gold-500/30 border-2 border-paradise-gold-400 text-paradise-gold-300 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-royal-sm"
              >
                <span>📅 Reserve a Table</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-paradise-gold-700/30 text-center lg:text-left">
              <div>
                <p className="font-serif text-2xl font-black text-paradise-gold-300">70+ Yrs</p>
                <p className="text-[11px] text-paradise-cream-400 uppercase tracking-wider">
                  Nizami Heritage
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl font-black text-paradise-gold-300">100%</p>
                <p className="text-[11px] text-paradise-cream-400 uppercase tracking-wider">
                  Authentic Charcoal Dum
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl font-black text-paradise-gold-300">#1</p>
                <p className="text-[11px] text-paradise-cream-400 uppercase tracking-wider">
                  Hyderabad's Pride
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px]">
              {/* Outer Golden Glow Aura */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-paradise-gold-500/40 via-paradise-gold-400/20 to-transparent blur-2xl animate-pulse-subtle" />

              {/* Circular Handi Showcase Frame */}
              <div className="relative w-full h-full rounded-full p-2.5 bg-gradient-to-b from-paradise-gold-400 via-paradise-gold-600 to-paradise-maroon-950 shadow-gold-glow-lg flex items-center justify-center">
                <div className="w-full h-full rounded-full overflow-hidden relative border-4 border-paradise-maroon-900">
                  <Image
                    src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=1000&auto=format&fit=crop&q=85"
                    alt="Authentic Royal Hyderabadi Dum Biryani Handi"
                    fill
                    priority
                    className="object-cover transform hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 320px, 420px"
                  />
                </div>

                {/* Floating Stamp Badge */}
                <div className="absolute -bottom-2 -left-2 bg-paradise-maroon-950/95 border-2 border-paradise-gold-400 text-paradise-gold-300 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 backdrop-blur-md">
                  <Award className="w-6 h-6 text-paradise-gold-400 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] text-paradise-cream-300 block uppercase font-medium">
                      Limca Record Holder
                    </span>
                    <span className="text-xs font-serif font-black text-paradise-gold-300">
                      Icon of Hyderabad
                    </span>
                  </div>
                </div>

                {/* 1953 Seal */}
                <div className="absolute top-2 -right-2 bg-gradient-to-r from-paradise-gold-500 to-paradise-gold-600 text-paradise-maroon-950 px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest shadow-md">
                  Since 1953
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
