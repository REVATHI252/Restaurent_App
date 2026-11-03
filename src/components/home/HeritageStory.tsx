import React from 'react';
import Image from 'next/image';
import { History, Flame, Award, HeartHandshake } from 'lucide-react';

export default function HeritageStory() {
  return (
    <section className="py-20 bg-paradise-maroon-900 text-white relative overflow-hidden border-b-2 border-paradise-gold-600/40">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Heritage Collages */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden border-2 border-paradise-gold-500/40 shadow-royal-lg">
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000&auto=format&fit=crop&q=80"
                alt="Paradise 1953 Heritage Food Court Secunderabad"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-paradise-maroon-950 via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-paradise-maroon-950/90 backdrop-blur-md border border-paradise-gold-400/40 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-paradise-gold-400 tracking-wider">
                    Historic Secunderabad
                  </span>
                  <h4 className="font-serif text-base font-bold text-white">
                    The Original Paradise Theatre & Café (1953)
                  </h4>
                </div>
                <div className="w-10 h-10 rounded-full bg-paradise-gold-500/20 border border-paradise-gold-400 flex items-center justify-center text-paradise-gold-300 font-serif font-black">
                  70
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Royal Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paradise-maroon-950 border border-paradise-gold-400/40 text-paradise-gold-300 text-xs uppercase tracking-widest font-semibold">
              <History className="w-3.5 h-3.5 text-paradise-gold-400" />
              <span>The Taste of Hyderabad Since 1953</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-black text-white leading-tight">
              From a Small 100-Seat Café to a{' '}
              <span className="gold-gradient-text">Global Culinary Phenomenon</span>
            </h2>

            <p className="text-sm sm:text-base text-paradise-cream-200/90 leading-relaxed font-sans">
              Founded in 1953 as a modest café alongside the iconic Paradise Theatre in Secunderabad, Paradise began its journey serving traditional Irani chai and snacks. Soon, the Nizami royal chefs introduced their prized secret Dum Biryani recipe.
            </p>

            <p className="text-sm sm:text-base text-paradise-cream-200/90 leading-relaxed font-sans">
              Today, the cooking methodology remains untouched: every single handi is sealed with dough (Dum pukht) and slow-cooked over burning charcoal embers, ensuring the spices infuse deep into every grain of rice and succulent cut of meat.
            </p>

            {/* Heritage Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-paradise-maroon-950/60 border border-paradise-gold-700/30">
                <Flame className="w-5 h-5 text-paradise-gold-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-sm font-bold text-paradise-gold-200">
                    Kachhi Dum Technique
                  </h4>
                  <p className="text-xs text-paradise-cream-300/80">
                    Raw marinated meat cooked simultaneously with spiced basmati under steam pressure.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-paradise-maroon-950/60 border border-paradise-gold-700/30">
                <HeartHandshake className="w-5 h-5 text-paradise-gold-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-sm font-bold text-paradise-gold-200">
                    100% Halal & Pure Ghee
                  </h4>
                  <p className="text-xs text-paradise-cream-300/80">
                    Fresh premium ingredients sourced daily with authentic royal saffron.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
