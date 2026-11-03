'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Camera,
  Sparkles,
  Award,
  Eye,
  X,
  Utensils,
  MapPin,
  Flame,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface PhotoItem {
  id: string;
  title: string;
  category: 'Ambience' | 'Kitchen & Dum' | 'Signature Food' | 'Heritage & Awards';
  imageUrl: string;
  location: string;
  description: string;
}

const GALLERY_PHOTOS: PhotoItem[] = [
  {
    id: 'p1',
    title: 'Historic Secunderabad Flagship Entrance (Est. 1953)',
    category: 'Ambience',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=85',
    location: 'Secunderabad Flagship',
    description: 'The world-famous landmark at Paradise Circle where the iconic culinary journey began in 1953.',
  },
  {
    id: 'p2',
    title: 'Traditional Charcoal Dum Handi Cooking',
    category: 'Kitchen & Dum',
    imageUrl: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=1200&auto=format&fit=crop&q=85',
    location: 'Royal Dum Kitchen',
    description: 'Aged long-grain basmati and tender marinated meat slow-cooked in dough-sealed clay pots over hot coals.',
  },
  {
    id: 'p3',
    title: 'Royal Nizami Fine Dining Banquet & Hall',
    category: 'Ambience',
    imageUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&auto=format&fit=crop&q=85',
    location: 'Hitec City / Madhapur Hub',
    description: 'Opulent interiors with warm golden chandeliers, traditional Nizami jaali motifs, and luxury seating.',
  },
  {
    id: 'p4',
    title: 'Signature Royal Mutton Dum Biryani Platter',
    category: 'Signature Food',
    imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=1200&auto=format&fit=crop&q=85',
    location: 'Served with Mirchi Ka Salan & Raita',
    description: 'Golden saffron-infused long rice grains garnished with fried onions (birista) and hard-boiled eggs.',
  },
  {
    id: 'p5',
    title: 'Tandoori Kalmi & Reshmi Kebabs on Sizzler',
    category: 'Signature Food',
    imageUrl: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=1200&auto=format&fit=crop&q=85',
    location: 'Live Charcoal Tandoor',
    description: 'Juicy chicken drumsticks marinated overnight in hung curd, saffron, and freshly ground royal spices.',
  },
  {
    id: 'p6',
    title: 'Executive Lounge & Family Dining Arena',
    category: 'Ambience',
    imageUrl: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1200&auto=format&fit=crop&q=85',
    location: 'Gachibowli Hub',
    description: 'Spacious air-conditioned dining designed for family gatherings, corporate lunches, and celebrations.',
  },
  {
    id: 'p7',
    title: 'Master Chefs Crafting Saffron Dum Pots',
    category: 'Kitchen & Dum',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=85',
    location: 'Central Master Kitchen',
    description: 'Preserving the uncompromised 1953 secret spice blend with pure desi ghee and handpicked herbs.',
  },
  {
    id: 'p8',
    title: 'Shahi Qubani-ka-Meetha & Gulab Jamun',
    category: 'Signature Food',
    imageUrl: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=1200&auto=format&fit=crop&q=85',
    location: 'Heritage Desserts Section',
    description: 'Centuries-old royal delicacies made of Turkish dried apricots, rich fresh malai, and warm gulab jamun.',
  },
  {
    id: 'p9',
    title: 'Limca Book of Records & National Heritage Honors',
    category: 'Heritage & Awards',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=85',
    location: 'Secunderabad Heritage Gallery',
    description: 'Recognized globally for serving the highest number of authentic Hyderabadi Dum Biryanis worldwide.',
  },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);

  const categories = ['All', 'Ambience', 'Kitchen & Dum', 'Signature Food', 'Heritage & Awards'];

  const filteredPhotos =
    selectedCategory === 'All'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.category === selectedCategory);

  const openNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activePhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === activePhoto.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setActivePhoto(filteredPhotos[nextIndex]);
  };

  const openPrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activePhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === activePhoto.id);
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setActivePhoto(filteredPhotos[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-paradise-cream-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-paradise-maroon-100 text-paradise-maroon-900 text-xs font-bold uppercase tracking-widest">
            <Camera className="w-3.5 h-3.5 text-paradise-gold-600" />
            <span>Visual Grandeur & Heritage</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-black text-paradise-charcoal-900">
            Restaurant & Kitchen Gallery
          </h1>
          <p className="text-sm text-paradise-charcoal-600 font-sans">
            Take a visual tour through our iconic 1953 dining halls, charcoal Dum kitchens, and world-famous dishes.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-paradise-maroon-900 text-paradise-gold-300 shadow-royal-sm border border-paradise-gold-500/50'
                  : 'bg-white text-paradise-charcoal-700 hover:bg-paradise-cream-200 border border-paradise-cream-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="group relative h-80 rounded-3xl overflow-hidden bg-paradise-charcoal-900 border border-paradise-cream-300 hover:border-paradise-gold-400 shadow-sm hover:shadow-royal-lg transition-all duration-300 cursor-pointer flex flex-col justify-end p-6"
            >
              {/* Photo Image */}
              <Image
                src={photo.imageUrl}
                alt={photo.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-paradise-maroon-950 via-paradise-maroon-950/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              {/* Hover Zoom Icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-paradise-maroon-950/80 border border-paradise-gold-400 text-paradise-gold-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                <Eye className="w-4 h-4" />
              </div>

              {/* Photo Caption Details */}
              <div className="relative z-10 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-paradise-gold-500 text-paradise-maroon-950 text-[10px] font-black uppercase tracking-wider">
                    {photo.category}
                  </span>
                  <span className="text-[11px] text-paradise-gold-300 font-medium flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-paradise-gold-400" />
                    {photo.location}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-white group-hover:text-paradise-gold-200 transition-colors leading-snug">
                  {photo.title}
                </h3>
                <p className="text-xs text-paradise-cream-300/80 line-clamp-2 font-sans">
                  {photo.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-paradise-maroon-900 rounded-3xl p-8 text-white border-2 border-paradise-gold-500/40 shadow-royal-lg flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold text-paradise-gold-300">
              Impressed by the Royal Experience?
            </h3>
            <p className="text-xs text-paradise-cream-200 font-sans max-w-xl">
              Visit any of our Hyderabad branches for Royal Dine-in or order your authentic clay Dum Biryani handis online right now.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/menu"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-paradise-gold-400 via-paradise-gold-500 to-paradise-gold-600 text-paradise-maroon-950 font-extrabold text-xs uppercase tracking-wider shadow-gold-glow hover:shadow-gold-glow-lg transition-all"
            >
              Order Online Now
            </Link>
            <Link
              href="/locations"
              className="px-6 py-3.5 rounded-2xl bg-paradise-maroon-950 border border-paradise-gold-500/50 text-paradise-gold-200 font-bold text-xs hover:bg-paradise-maroon-800 transition-colors"
            >
              Find Outlets
            </Link>
          </div>
        </div>
      </div>

      {/* Full-screen Lightbox Zoom Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-paradise-charcoal-950/90 backdrop-blur-md transition-opacity"
            onClick={() => setActivePhoto(null)}
          />

          <div className="relative max-w-4xl w-full bg-paradise-maroon-950 rounded-3xl overflow-hidden border-2 border-paradise-gold-400 shadow-2xl z-10 animate-pulse-subtle">
            {/* Close Button */}
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-paradise-maroon-900/90 text-paradise-gold-300 hover:text-white flex items-center justify-center border border-paradise-gold-400 shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev / Next Arrows */}
            <button
              onClick={openPrevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-paradise-maroon-900/80 text-paradise-gold-300 hover:text-white flex items-center justify-center border border-paradise-gold-400 shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={openNextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-paradise-maroon-900/80 text-paradise-gold-300 hover:text-white flex items-center justify-center border border-paradise-gold-400 shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* High-res Photo */}
            <div className="relative h-96 sm:h-[480px] w-full bg-black">
              <Image
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 900px"
              />
            </div>

            {/* Caption & Details Footer */}
            <div className="p-6 bg-paradise-maroon-950 border-t border-paradise-gold-600/40 text-white space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-paradise-gold-500 text-paradise-maroon-950 text-[10px] font-black uppercase tracking-wider">
                  {activePhoto.category}
                </span>
                <span className="text-xs text-paradise-gold-300 font-semibold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-paradise-gold-400" />
                  {activePhoto.location}
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-white">
                {activePhoto.title}
              </h3>
              <p className="text-xs text-paradise-cream-300 leading-relaxed font-sans">
                {activePhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
