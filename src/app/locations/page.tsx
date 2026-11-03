'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { OutletData } from '@/types';
import { INITIAL_OUTLETS } from '@/lib/mockData';
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  Award,
  Users,
  Car,
  Utensils,
  Sparkles,
  ShieldCheck,
  CalendarDays,
  ShoppingBag,
  Flame,
  Crown,
  Building2,
  HeartHandshake,
  CheckCircle2,
  Compass,
} from 'lucide-react';

export default function LocationsPage() {
  const [outlets, setOutlets] = useState<OutletData[]>(INITIAL_OUTLETS);
  const [selectedOutletSlug, setSelectedOutletSlug] = useState<string>('all');
  const [loading, setLoading] = useState(false);

  // Fetch from API on mount
  useEffect(() => {
    async function fetchApiOutlets() {
      try {
        const res = await fetch('/api/outlets');
        const data = await res.json();
        if (data.success && data.outlets?.length > 0) {
          setOutlets(data.outlets);
        }
      } catch (err) {
        // Fallback to INITIAL_OUTLETS
      }
    }
    fetchApiOutlets();
  }, []);

  // Displayed outlets based on selected outlet card
  const displayedOutlets = useMemo(() => {
    if (selectedOutletSlug === 'all') {
      return outlets;
    }
    return outlets.filter((o) => o.slug === selectedOutletSlug);
  }, [outlets, selectedOutletSlug]);

  return (
    <div className="min-h-screen bg-paradise-cream-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* ================================================================= */}
        {/* 1. PAGE HEADER */}
        {/* ================================================================= */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-paradise-maroon-900 text-paradise-gold-300 border border-paradise-gold-500/40 text-xs font-bold uppercase tracking-widest shadow-royal-sm">
            <MapPin className="w-3.5 h-3.5 text-paradise-gold-400" />
            <span>Nizami Dining Destinations Across Hyderabad</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-paradise-charcoal-900 tracking-tight">
            Outlets
          </h1>
          <p className="text-sm sm:text-base text-paradise-charcoal-600 font-sans max-w-2xl mx-auto leading-relaxed">
            Directly explore all 6 iconic Paradise restaurant branches in Hyderabad. View seating capacities, parking, signature delicacies, and contact details.
          </p>
        </div>

        {/* ================================================================= */}
        {/* 2. VISUAL OUTLET SELECTOR DECK (TACTILE PATTERN) */}
        {/* ================================================================= */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-paradise-charcoal-700">
              <Compass className="w-4 h-4 text-paradise-maroon-800" />
              <span>Select Branch to View</span>
            </div>
            <span className="text-xs font-bold text-paradise-charcoal-500">
              Showing {displayedOutlets.length} of {outlets.length} Outlets
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {/* All Outlets Master Tab */}
            <button
              type="button"
              onClick={() => setSelectedOutletSlug('all')}
              className={`p-3.5 rounded-2xl flex flex-col justify-between text-left border-2 transition-all group active:scale-95 ${
                selectedOutletSlug === 'all'
                  ? 'bg-paradise-maroon-900 text-white border-paradise-gold-400 shadow-royal-md ring-2 ring-paradise-gold-400/20'
                  : 'bg-white text-paradise-charcoal-800 border-paradise-cream-300 hover:border-paradise-gold-500 hover:bg-paradise-cream-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    selectedOutletSlug === 'all'
                      ? 'bg-paradise-gold-400 text-paradise-maroon-950 font-bold'
                      : 'bg-paradise-cream-100 text-paradise-maroon-900 group-hover:bg-paradise-maroon-900 group-hover:text-paradise-gold-300'
                  }`}
                >
                  <Crown className="w-4 h-4" />
                </div>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${
                    selectedOutletSlug === 'all'
                      ? 'bg-paradise-gold-400/20 text-paradise-gold-300'
                      : 'bg-paradise-cream-200 text-paradise-charcoal-700'
                  }`}
                >
                  {outlets.length}
                </span>
              </div>
              <div>
                <span className="font-serif text-xs font-bold block leading-tight">
                  All Outlets
                </span>
                <span className="text-[10px] opacity-75 block mt-0.5 truncate">
                  Full City Catalog
                </span>
              </div>
            </button>

            {/* Individual Outlets Cards */}
            {outlets.map((outlet) => {
              const isSelected = selectedOutletSlug === outlet.slug;

              return (
                <button
                  key={outlet._id}
                  type="button"
                  onClick={() => setSelectedOutletSlug(outlet.slug)}
                  className={`p-3.5 rounded-2xl flex flex-col justify-between text-left border-2 transition-all group active:scale-95 ${
                    isSelected
                      ? 'bg-gradient-to-br from-paradise-maroon-900 via-paradise-maroon-950 to-paradise-charcoal-900 text-white border-paradise-gold-400 shadow-royal-md ring-2 ring-paradise-gold-400/20'
                      : 'bg-white text-paradise-charcoal-800 border-paradise-cream-300 hover:border-paradise-gold-500 hover:bg-paradise-cream-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        isSelected
                          ? 'bg-paradise-gold-400 text-paradise-maroon-950 font-bold shadow-gold-glow'
                          : 'bg-paradise-cream-100 text-paradise-maroon-900 group-hover:bg-paradise-maroon-900 group-hover:text-paradise-gold-300'
                      }`}
                    >
                      {outlet.isFlagship ? (
                        <Award className="w-4 h-4" />
                      ) : (
                        <Building2 className="w-4 h-4" />
                      )}
                    </div>
                    {outlet.isFlagship && (
                      <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase bg-paradise-gold-400 text-paradise-maroon-950">
                        1953
                      </span>
                    )}
                  </div>
                  <div>
                    <span
                      className={`font-serif text-xs font-bold block leading-tight truncate ${
                        isSelected ? 'text-paradise-gold-300' : 'text-paradise-charcoal-900'
                      }`}
                    >
                      {outlet.area}
                    </span>
                    <span
                      className={`text-[10px] block mt-0.5 truncate ${
                        isSelected ? 'text-paradise-cream-300' : 'text-paradise-charcoal-500'
                      }`}
                    >
                      {outlet.isFlagship ? 'Flagship Dining' : 'Dine-In & Takeaway'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================================================================= */}
        {/* 3. DIRECT OUTLETS DISPLAY CARDS */}
        {/* ================================================================= */}
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-96 bg-white rounded-3xl border border-paradise-cream-300 animate-pulse p-6"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {displayedOutlets.map((outlet) => (
              <div
                key={outlet._id}
                id={outlet.slug}
                className="bg-white rounded-3xl overflow-hidden border-2 border-paradise-cream-300 hover:border-paradise-gold-500 shadow-royal-sm hover:shadow-royal-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Outlet Cover Image & Hero Banner */}
                  <div className="relative h-60 w-full bg-paradise-maroon-950 overflow-hidden">
                    <Image
                      src={
                        outlet.imageUrl ||
                        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80'
                      }
                      alt={outlet.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-paradise-maroon-950 via-paradise-maroon-950/40 to-black/20" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      {outlet.isFlagship ? (
                        <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-paradise-gold-400 via-paradise-gold-500 to-paradise-gold-600 text-paradise-maroon-950 text-xs font-black uppercase px-3 py-1 rounded-full shadow-gold-glow">
                          <Award className="w-3.5 h-3.5" />
                          <span>1953 Heritage Flagship</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 bg-paradise-maroon-900/90 text-paradise-gold-300 border border-paradise-gold-500/40 text-[11px] font-bold uppercase px-3 py-1 rounded-full backdrop-blur-sm shadow-sm">
                          <MapPin className="w-3 h-3 text-paradise-gold-400" />
                          <span>{outlet.area}</span>
                        </div>
                      )}

                      {/* Services Pills */}
                      <div className="flex items-center gap-1.5">
                        {outlet.hasDineIn && (
                          <span className="bg-emerald-950/90 text-emerald-300 border border-emerald-400/50 text-[10px] font-black px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                            Dine-In
                          </span>
                        )}
                        {outlet.hasTakeaway && (
                          <span className="bg-amber-950/90 text-amber-300 border border-amber-400/50 text-[10px] font-black px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                            Takeaway
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bottom Title on Image */}
                    <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                      <span className="text-[11px] uppercase tracking-widest font-extrabold text-paradise-gold-400 block">
                        {outlet.city} • {outlet.area}
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl font-black text-white leading-tight drop-shadow-sm group-hover:text-paradise-gold-200 transition-colors">
                        {outlet.name}
                      </h2>
                    </div>
                  </div>

                  {/* Outlet Main Info Body */}
                  <div className="p-6 space-y-5">
                    {/* Restaurant Specialty Description */}
                    {outlet.specialty && (
                      <p className="text-xs sm:text-sm text-paradise-charcoal-700 leading-relaxed font-sans border-l-2 border-paradise-gold-500 pl-3 py-0.5 bg-paradise-cream-50 rounded-r-xl">
                        {outlet.specialty}
                      </p>
                    )}

                    {/* Restaurant Detailed Specifications Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-paradise-charcoal-700 bg-paradise-cream-50 p-4 rounded-2xl border border-paradise-cream-200">
                      {/* Seating Capacity */}
                      {outlet.seatingCapacity && (
                        <div className="flex items-start gap-2.5">
                          <Users className="w-4 h-4 text-paradise-maroon-800 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[10px] text-paradise-charcoal-400 uppercase font-bold tracking-wider block">
                              Seating & Ambience
                            </span>
                            <span className="font-bold text-paradise-charcoal-900">
                              {outlet.seatingCapacity}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Cost for Two */}
                      {outlet.costForTwo && (
                        <div className="flex items-start gap-2.5">
                          <Utensils className="w-4 h-4 text-paradise-maroon-800 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[10px] text-paradise-charcoal-400 uppercase font-bold tracking-wider block">
                              Average Cost
                            </span>
                            <span className="font-bold text-paradise-charcoal-900">
                              {outlet.costForTwo}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Valet Parking */}
                      {outlet.valetParking && (
                        <div className="flex items-start gap-2.5">
                          <Car className="w-4 h-4 text-paradise-maroon-800 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="text-[10px] text-paradise-charcoal-400 uppercase font-bold tracking-wider block">
                              Parking
                            </span>
                            <span className="font-semibold text-paradise-charcoal-800">
                              {outlet.valetParking}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Hygiene / Quality */}
                      <div className="flex items-start gap-2.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] text-paradise-charcoal-400 uppercase font-bold tracking-wider block">
                            Hygiene Certification
                          </span>
                          <span className="font-semibold text-emerald-800">
                            {outlet.hygieneRating || '100% Halal • FSSAI 5-Star Certified'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Address, Timings & Contact */}
                    <div className="space-y-2.5 text-xs text-paradise-charcoal-700">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-paradise-maroon-800 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="leading-relaxed font-medium text-paradise-charcoal-800 block">
                            {outlet.address}
                          </span>
                          {outlet.landmarks && (
                            <span className="text-[11px] text-paradise-charcoal-500 font-sans block mt-0.5">
                              Landmark: {outlet.landmarks}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-paradise-maroon-800 flex-shrink-0" />
                        <span className="font-medium text-paradise-charcoal-800">
                          {outlet.timings}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Phone className="w-4 h-4 text-paradise-maroon-800 flex-shrink-0" />
                        <a
                          href={`tel:${outlet.phone}`}
                          className="font-bold text-paradise-maroon-900 hover:text-paradise-gold-700 hover:underline"
                        >
                          {outlet.phone}
                        </a>
                      </div>
                    </div>

                    {/* Signature Dishes Loved at this Branch */}
                    {outlet.signatureDishes && outlet.signatureDishes.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[11px] uppercase font-extrabold tracking-wider text-paradise-charcoal-500 flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 text-rose-600" />
                          Signature Delicacies at this Branch:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {outlet.signatureDishes.map((dish) => (
                            <span
                              key={dish}
                              className="px-2.5 py-1 rounded-lg bg-paradise-gold-50 text-paradise-maroon-950 border border-paradise-gold-300 text-[11px] font-bold"
                            >
                              {dish}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Features Tag Pills */}
                    {outlet.features && outlet.features.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1 border-t border-paradise-cream-200">
                        {outlet.features.map((feat) => (
                          <span
                            key={feat}
                            className="px-2.5 py-0.5 rounded-full bg-paradise-cream-100 text-paradise-charcoal-700 text-[10px] font-semibold border border-paradise-cream-300"
                          >
                            ✓ {feat}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Interactive Action Buttons */}
                <div className="p-5 pt-3 bg-paradise-cream-50 border-t border-paradise-cream-200 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://maps.google.com/?q=${outlet.lat},${outlet.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-paradise-cream-300 hover:border-paradise-maroon-800 text-paradise-maroon-900 text-xs font-bold shadow-sm transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5 text-paradise-maroon-800" />
                      <span>Directions</span>
                    </a>

                    <a
                      href={`tel:${outlet.phone}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-paradise-cream-300 hover:border-paradise-maroon-800 text-paradise-maroon-900 text-xs font-bold shadow-sm transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-paradise-maroon-800" />
                      <span>Call</span>
                    </a>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/reservation?outlet=${encodeURIComponent(outlet.name)}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-paradise-gold-400 to-paradise-gold-600 text-paradise-maroon-950 text-xs font-black shadow-gold-glow hover:shadow-gold-glow-lg transition-all transform active:scale-95"
                    >
                      <CalendarDays className="w-3.5 h-3.5" />
                      <span>Book Table</span>
                    </Link>

                    <Link
                      href="/menu"
                      className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-paradise-maroon-900 text-paradise-gold-300 text-xs font-bold hover:bg-paradise-maroon-800 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Order</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
