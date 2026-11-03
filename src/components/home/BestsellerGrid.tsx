'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { MenuItemData } from '@/types';
import { FoodCard } from '@/components/menu/FoodCard';
import { Award, ArrowRight } from 'lucide-react';

export default function BestsellerGrid() {
  const [bestsellers, setBestsellers] = useState<MenuItemData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBestsellers() {
      try {
        const res = await fetch('/api/menu?isBestseller=true');
        const data = await res.json();
        if (data.success && data.items?.length > 0) {
          setBestsellers(data.items);
        } else {
          // Fallback trigger seed if database is empty
          await fetch('/api/seed', { method: 'POST' });
          const retryRes = await fetch('/api/menu?isBestseller=true');
          const retryData = await retryRes.json();
          if (retryData.success) {
            setBestsellers(retryData.items);
          }
        }
      } catch (err) {
        console.error('Failed to load bestsellers:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchBestsellers();
  }, []);

  return (
    <section className="py-16 bg-paradise-cream-50 border-b border-paradise-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-paradise-maroon-800 mb-1">
              <Award className="w-4 h-4 text-paradise-gold-600" />
              <span>Legendary Nizam's Table</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-paradise-charcoal-900">
              Legendary Bestsellers
            </h2>
            <p className="text-sm text-paradise-charcoal-600 mt-1">
              The dishes that built Paradise's seven-decade legacy across India and the globe.
            </p>
          </div>

          <Link
            href="/menu"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-paradise-maroon-900 hover:text-paradise-gold-600 transition-colors"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-80 rounded-2xl bg-paradise-cream-200 animate-pulse border border-paradise-cream-300"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.slice(0, 4).map((item) => (
              <FoodCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
