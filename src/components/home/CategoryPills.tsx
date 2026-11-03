'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

const categories = [
  {
    name: 'Hyderabadi Dum Biryani',
    slug: 'dum-biryani',
    subtitle: 'Mutton, Chicken & Veg Royal Pots',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
    itemCount: '6 Delicacies',
  },
  {
    name: 'Starters & Kebabs',
    slug: 'starters-kebabs',
    subtitle: 'Kalmi, Reshmi & Paneer Tikka',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
    itemCount: '8 Kebabs',
  },
  {
    name: 'Curries & Breads',
    slug: 'curries-breads',
    subtitle: 'Mirchi ka Salan, Butter Chicken & Naans',
    imageUrl: '/images/category-curries-breads.jpg',
    itemCount: '10 Curries',
  },
  {
    name: 'Heritage Desserts',
    slug: 'heritage-desserts',
    subtitle: 'Qubani ka Meetha & Double ka Meetha',
    imageUrl: '/images/category-heritage-desserts.png',
    itemCount: '4 Royal Sweets',
  },
];

export default function CategoryPills() {
  return (
    <section className="py-16 bg-paradise-cream-100 border-b border-paradise-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-paradise-gold-700">
            <Sparkles className="w-3.5 h-3.5 text-paradise-gold-600" />
            <span>Nizami Culinary Masterpieces</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-paradise-charcoal-900">
            Explore Royal Categories
          </h2>
          <p className="text-sm text-paradise-charcoal-600 font-sans">
            Every dish is handcrafted using authentic centuries-old Nawabi techniques and pure ingredients.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/menu?category=${cat.slug}`}
              className="group relative h-72 rounded-2xl overflow-hidden shadow-sm hover:shadow-royal-md border border-paradise-cream-300 transition-all duration-300 flex flex-col justify-end p-6"
            >
              {/* Background Image */}
              <Image
                src={cat.imageUrl}
                alt={cat.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-paradise-maroon-950 via-paradise-maroon-900/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

              {/* Content */}
              <div className="relative z-10 space-y-2">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-paradise-gold-500 text-paradise-maroon-950 text-[10px] font-extrabold uppercase tracking-wider">
                  {cat.itemCount}
                </span>
                <h3 className="font-serif text-xl font-bold text-white group-hover:text-paradise-gold-300 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-paradise-cream-300 line-clamp-1 font-sans">
                  {cat.subtitle}
                </p>

                <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-paradise-gold-400 group-hover:text-paradise-gold-300 transition-colors">
                  <span>Explore Dishes</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
