'use client';

import React, { Suspense, useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { MenuItemData } from '@/types';
import FoodCard from '@/components/menu/FoodCard';
import { VegBadge } from '@/components/common/VegBadge';
import { INITIAL_MENU_ITEMS, INITIAL_CATEGORIES } from '@/lib/mockData';
import {
  Crown,
  Leaf,
  Flame,
  UtensilsCrossed,
  Sparkles,
  ChefHat,
  Layers,
  Coffee,
  Check,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

interface CategoryMeta {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
}

const CATEGORY_DEFINITIONS: CategoryMeta[] = [
  {
    slug: 'all',
    name: 'All Royal Categories',
    shortName: 'All Specialties',
    tagline: 'Complete Grand Feast',
    description: 'The entire Nizami banquet featuring world-famous dum biryanis, succulent kebabs, slow-simmered curries, and heritage sweets.',
    icon: Crown,
  },
  {
    slug: 'dum-biryani',
    name: 'Hyderabadi Dum Biryani',
    shortName: 'Dum Biryani',
    tagline: 'Clay Handi Charcoal Dum',
    description: 'World-renowned royal dum biryani slow-cooked with aged basmati, whole nizami spices, saffron, and tender meat or fresh paneer.',
    icon: Flame,
  },
  {
    slug: 'starters-kebabs',
    name: 'Starters & Kebabs',
    shortName: 'Starters & Kebabs',
    tagline: 'Smoky Charcoal Skewers',
    description: 'Charcoal-grilled Nizami kebabs and crispy appetisers marinated in shahi spices, hung curd, and aromatic herbs.',
    icon: UtensilsCrossed,
  },
  {
    slug: 'curries-breads',
    name: 'Curries & Breads',
    shortName: 'Curries & Breads',
    tagline: 'Rich Gravies & Naans',
    description: 'Authentic Mirchi Ka Salan, Dal Makhani, Murgh Butter Masala, and tandoor-baked Nizami breads.',
    icon: Layers,
  },
  {
    slug: 'heritage-desserts',
    name: 'Heritage Desserts & Drinks',
    shortName: 'Desserts & Drinks',
    tagline: 'Qubani, Meetha & Chai',
    description: 'Centuries-old royal Hyderabadi sweetmeats crafted with dried apricots, pure desi ghee, rabri, and Irani beverages.',
    icon: Sparkles,
  },
];

function MenuContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [items, setItems] = useState<MenuItemData[]>(INITIAL_MENU_ITEMS as any);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');
  const [isVegFilter, setIsVegFilter] = useState<'all' | 'veg' | 'non-veg'>('all');

  // Sync category param from URL if it changes
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  // Load latest menu from API on mount
  useEffect(() => {
    async function loadApiMenu() {
      try {
        const res = await fetch('/api/menu');
        const data = await res.json();
        if (data.success && data.items?.length > 0) {
          setItems(data.items);
        }
      } catch (e) {
        // Fallback to INITIAL_MENU_ITEMS
      }
    }
    loadApiMenu();
  }, []);

  // Helper to extract category slug from an item safely
  const getItemCatSlug = (item: MenuItemData): string => {
    if (typeof item.category === 'object' && item.category !== null) {
      return (item.category as any).slug || '';
    }
    if (typeof item.category === 'string') {
      return item.category;
    }
    return '';
  };

  // 1. Dietary filtered items (Veg / Non-Veg / All)
  const dietaryFilteredItems = useMemo(() => {
    if (isVegFilter === 'veg') {
      return items.filter((i) => i.isVeg);
    }
    if (isVegFilter === 'non-veg') {
      return items.filter((i) => !i.isVeg);
    }
    return items;
  }, [items, isVegFilter]);

  // 2. Active items based on dietary filter + category filter
  const activeItems = useMemo(() => {
    if (selectedCategory === 'all') {
      return dietaryFilteredItems;
    }
    return dietaryFilteredItems.filter((i) => getItemCatSlug(i) === selectedCategory);
  }, [dietaryFilteredItems, selectedCategory]);

  // Counts for Dietary Switcher
  const totalAllCount = items.length;
  const totalNonVegCount = useMemo(() => items.filter((i) => !i.isVeg).length, [items]);
  const totalVegCount = useMemo(() => items.filter((i) => i.isVeg).length, [items]);

  // Dynamic counts for each category based on current dietary filter
  const getCategoryCount = (slug: string) => {
    if (slug === 'all') {
      return dietaryFilteredItems.length;
    }
    return dietaryFilteredItems.filter((i) => getItemCatSlug(i) === slug).length;
  };

  // Specific Category list (excluding 'all') for categorized section view
  const specificCategories = useMemo(() => {
    return CATEGORY_DEFINITIONS.filter((c) => c.slug !== 'all');
  }, []);

  // Active Category Meta
  const activeCategoryMeta = useMemo(() => {
    return (
      CATEGORY_DEFINITIONS.find((c) => c.slug === selectedCategory) ||
      CATEGORY_DEFINITIONS[0]
    );
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-paradise-cream-100 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* ================================================================= */}
        {/* 1. ROYAL HEADER & NIZAMI BADGE */}
        {/* ================================================================= */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-paradise-maroon-900 text-paradise-gold-300 border border-paradise-gold-500/40 text-xs font-bold uppercase tracking-widest shadow-royal-sm">
            <Sparkles className="w-3.5 h-3.5 text-paradise-gold-400" />
            <span>Nizami Culinary Masterpieces Since 1953</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-paradise-charcoal-900 tracking-tight">
            Menu
          </h1>
          <p className="text-sm sm:text-base text-paradise-charcoal-600 font-sans max-w-2xl mx-auto leading-relaxed">
            Select your preferred dietary choice and explore Hyderabad’s legendary slow-cooked royal delicacies.
          </p>
        </div>

        {/* ================================================================= */}
        {/* 2. PRIMARY DIETARY MASTER SELECTOR (VEG / NON-VEG / ALL) */}
        {/* ================================================================= */}
        <div className="bg-white/80 backdrop-blur-sm p-3 sm:p-4 rounded-3xl border border-paradise-cream-300 shadow-royal-sm max-w-4xl mx-auto">
          <div className="text-center mb-2.5">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-paradise-charcoal-500">
              Step 1: Choose Dietary Preference
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* ALL DISHES */}
            <button
              type="button"
              onClick={() => setIsVegFilter('all')}
              className={`p-4 rounded-2xl flex items-center justify-between border-2 transition-all text-left group transform active:scale-[0.98] ${
                isVegFilter === 'all'
                  ? 'bg-paradise-maroon-900 text-white border-paradise-gold-400 shadow-royal-md ring-2 ring-paradise-gold-400/20'
                  : 'bg-paradise-cream-50 text-paradise-charcoal-800 border-paradise-cream-300 hover:border-paradise-maroon-800 hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                    isVegFilter === 'all'
                      ? 'bg-gradient-to-br from-paradise-gold-400 to-paradise-gold-600 text-paradise-maroon-950 font-black shadow-gold-glow'
                      : 'bg-paradise-cream-200 text-paradise-charcoal-700 group-hover:bg-paradise-maroon-100 group-hover:text-paradise-maroon-900'
                  }`}
                >
                  <Crown className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                      All Offerings
                    </span>
                    {isVegFilter === 'all' && (
                      <Check className="w-4 h-4 text-paradise-gold-400" />
                    )}
                  </div>
                  <span className="text-[11px] opacity-80 block font-medium">
                    Full Grand Nizami Spread
                  </span>
                </div>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-black transition-colors ${
                  isVegFilter === 'all'
                    ? 'bg-paradise-gold-400 text-paradise-maroon-950'
                    : 'bg-paradise-cream-200 text-paradise-charcoal-800'
                }`}
              >
                {totalAllCount}
              </span>
            </button>

            {/* NON-VEG DISHES */}
            <button
              type="button"
              onClick={() => setIsVegFilter('non-veg')}
              className={`p-4 rounded-2xl flex items-center justify-between border-2 transition-all text-left group transform active:scale-[0.98] ${
                isVegFilter === 'non-veg'
                  ? 'bg-rose-950 text-white border-rose-500 shadow-royal-md ring-2 ring-rose-500/20'
                  : 'bg-paradise-cream-50 text-paradise-charcoal-800 border-paradise-cream-300 hover:border-rose-700 hover:bg-rose-50/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                    isVegFilter === 'non-veg'
                      ? 'bg-gradient-to-br from-rose-500 to-rose-600 text-white font-black shadow-lg shadow-rose-900/40'
                      : 'bg-rose-100 text-rose-700 group-hover:bg-rose-200'
                  }`}
                >
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <VegBadge isVeg={false} size="sm" />
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-rose-950 dark:text-white">
                      Royal Non-Veg
                    </span>
                    {isVegFilter === 'non-veg' && (
                      <Check className="w-4 h-4 text-rose-400" />
                    )}
                  </div>
                  <span className="text-[11px] opacity-80 block font-medium">
                    Mutton, Chicken & Kebabs
                  </span>
                </div>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-black transition-colors ${
                  isVegFilter === 'non-veg'
                    ? 'bg-rose-500 text-white'
                    : 'bg-rose-100 text-rose-900'
                }`}
              >
                {totalNonVegCount}
              </span>
            </button>

            {/* PURE VEG DISHES */}
            <button
              type="button"
              onClick={() => setIsVegFilter('veg')}
              className={`p-4 rounded-2xl flex items-center justify-between border-2 transition-all text-left group transform active:scale-[0.98] ${
                isVegFilter === 'veg'
                  ? 'bg-emerald-950 text-white border-emerald-500 shadow-royal-md ring-2 ring-emerald-500/20'
                  : 'bg-paradise-cream-50 text-paradise-charcoal-800 border-paradise-cream-300 hover:border-emerald-700 hover:bg-emerald-50/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                    isVegFilter === 'veg'
                      ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white font-black shadow-lg shadow-emerald-900/40'
                      : 'bg-emerald-100 text-emerald-700 group-hover:bg-emerald-200'
                  }`}
                >
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <VegBadge isVeg={true} size="sm" />
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-950 dark:text-white">
                      Pure Veg
                    </span>
                    {isVegFilter === 'veg' && (
                      <Check className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>
                  <span className="text-[11px] opacity-80 block font-medium">
                    Paneer, Curries & Sweets
                  </span>
                </div>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-black transition-colors ${
                  isVegFilter === 'veg'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-emerald-100 text-emerald-900'
                }`}
              >
                {totalVegCount}
              </span>
            </button>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 3. LUXURY CATEGORY SHOWCASE DECK (PATTERN PATTERN) */}
        {/* ================================================================= */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <ChefHat className="w-4 h-4 text-paradise-maroon-800" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-paradise-charcoal-700">
                Step 2: Select Royal Category
              </span>
            </div>
            <span className="text-xs font-bold text-paradise-charcoal-500">
              Showing {activeItems.length} delicacies in view
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {CATEGORY_DEFINITIONS.map((cat) => {
              const IconComp = cat.icon;
              const isSelected = selectedCategory === cat.slug;
              const categoryDishCount = getCategoryCount(cat.slug);

              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`p-4 rounded-2xl flex flex-col justify-between text-left border-2 transition-all relative overflow-hidden group transform active:scale-95 ${
                    isSelected
                      ? 'bg-gradient-to-br from-paradise-maroon-900 via-paradise-maroon-950 to-paradise-charcoal-900 text-white border-paradise-gold-400 shadow-royal-md ring-2 ring-paradise-gold-400/20'
                      : 'bg-white text-paradise-charcoal-800 border-paradise-cream-300 hover:border-paradise-gold-500 hover:shadow-royal-sm'
                  }`}
                >
                  {/* Subtle Gold Accent Corner for Selected */}
                  {isSelected && (
                    <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-paradise-gold-400/30 to-transparent pointer-events-none" />
                  )}

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-paradise-gold-400 text-paradise-maroon-950 shadow-gold-glow font-bold'
                            : 'bg-paradise-cream-100 text-paradise-maroon-900 group-hover:bg-paradise-maroon-900 group-hover:text-paradise-gold-300'
                        }`}
                      >
                        <IconComp className="w-5 h-5" />
                      </div>

                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-colors ${
                          isSelected
                            ? 'bg-paradise-gold-400/20 text-paradise-gold-300 border border-paradise-gold-400/40'
                            : 'bg-paradise-cream-200 text-paradise-charcoal-700'
                        }`}
                      >
                        {categoryDishCount} Items
                      </span>
                    </div>

                    <div>
                      <h3
                        className={`font-serif text-sm sm:text-base font-bold leading-snug transition-colors ${
                          isSelected
                            ? 'text-paradise-gold-300'
                            : 'text-paradise-charcoal-900 group-hover:text-paradise-maroon-900'
                        }`}
                      >
                        {cat.shortName}
                      </h3>
                      <p
                        className={`text-[11px] line-clamp-1 mt-0.5 font-medium transition-colors ${
                          isSelected
                            ? 'text-paradise-cream-300'
                            : 'text-paradise-charcoal-500'
                        }`}
                      >
                        {cat.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-dashed mt-3 border-paradise-cream-300/40 flex items-center justify-between text-[10px] font-bold">
                    <span
                      className={
                        isSelected ? 'text-paradise-gold-400' : 'text-paradise-charcoal-400'
                      }
                    >
                      {isSelected ? 'Active Selection' : 'Click to View'}
                    </span>
                    <ChevronRight
                      className={`w-3.5 h-3.5 transform transition-transform ${
                        isSelected
                          ? 'text-paradise-gold-400 translate-x-0.5'
                          : 'text-paradise-charcoal-400 group-hover:translate-x-1'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================================================================= */}
        {/* 4. DIETARY CERTIFICATION STRIP */}
        {/* ================================================================= */}
        {isVegFilter === 'veg' && (
          <div className="bg-emerald-950 text-white rounded-3xl p-5 sm:p-6 border-2 border-emerald-500/40 shadow-royal-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 flex items-center justify-center flex-shrink-0">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <VegBadge isVeg={true} size="md" />
                  <h2 className="font-serif text-xl sm:text-2xl font-black text-white">
                    100% Pure Vegetarian Nizami Specialties
                  </h2>
                </div>
                <p className="text-xs text-emerald-200/80 font-sans mt-0.5">
                  Prepared in dedicated vegetarian sections with pure desi ghee, fresh garden veggies, malai paneer, and authentic royal spices.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="px-4 py-2 rounded-2xl bg-emerald-900 text-emerald-200 border border-emerald-400/40 text-xs font-black uppercase tracking-wider">
                {activeItems.length} Pure Veg Delicacies
              </span>
            </div>
          </div>
        )}

        {isVegFilter === 'non-veg' && (
          <div className="bg-rose-950 text-white rounded-3xl p-5 sm:p-6 border-2 border-rose-500/40 shadow-royal-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-400 text-rose-300 flex items-center justify-center flex-shrink-0">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <VegBadge isVeg={false} size="md" />
                  <h2 className="font-serif text-xl sm:text-2xl font-black text-white">
                    Royal Non-Veg Nizam's Table Specialties
                  </h2>
                </div>
                <p className="text-xs text-rose-200/80 font-sans mt-0.5">
                  100% Halal certified meat, slow-cooked in charcoal-sealed handis with our secret 1953 royal Nizami recipe.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="px-4 py-2 rounded-2xl bg-rose-900 text-rose-200 border border-rose-400/40 text-xs font-black uppercase tracking-wider">
                {activeItems.length} Non-Veg Delicacies
              </span>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* 5. MENU DISHES PRESENTATION PATTERN */}
        {/* ================================================================= */}
        {selectedCategory === 'all' ? (
          /* SECTIONED VIEW BY CATEGORY FOR ALL CATEGORIES */
          <div className="space-y-12">
            {specificCategories.map((category) => {
              const categoryDishes = dietaryFilteredItems.filter(
                (i) => getItemCatSlug(i) === category.slug
              );

              if (categoryDishes.length === 0) return null;

              const IconC = category.icon;

              return (
                <section
                  key={category.slug}
                  id={category.slug}
                  className="space-y-6 pt-4 first:pt-0"
                >
                  {/* Category Section Header Banner */}
                  <div className="bg-gradient-to-r from-paradise-maroon-950 via-paradise-maroon-900 to-paradise-maroon-950 text-white rounded-2xl p-4 sm:p-5 border-2 border-paradise-gold-600/40 shadow-royal-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-paradise-gold-400 text-paradise-maroon-950 flex items-center justify-center font-bold shadow-gold-glow flex-shrink-0">
                        <IconC className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                            {category.name}
                          </h2>
                        </div>
                        <p className="text-xs text-paradise-cream-300 font-sans mt-0.5 max-w-xl">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
                      <span className="px-3.5 py-1.5 rounded-xl bg-paradise-gold-400/20 text-paradise-gold-300 border border-paradise-gold-400/40 text-xs font-black">
                        {categoryDishes.length} Delicacies
                      </span>
                    </div>
                  </div>

                  {/* Food Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categoryDishes.map((dish) => (
                      <FoodCard key={dish._id} item={dish} />
                    ))}
                  </div>
                </section>
              );
            })}

            {dietaryFilteredItems.length === 0 && (
              <NoItemsAvailable
                message="No dishes available for this dietary preference."
                onReset={() => {
                  setIsVegFilter('all');
                  setSelectedCategory('all');
                }}
              />
            )}
          </div>
        ) : (
          /* SINGLE CATEGORY SPOTLIGHT VIEW */
          <div className="space-y-6">
            {/* Category Spotlight Header */}
            <div className="bg-gradient-to-r from-paradise-maroon-950 via-paradise-maroon-900 to-paradise-maroon-950 text-white rounded-3xl p-6 border-2 border-paradise-gold-600/40 shadow-royal-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-paradise-gold-400 text-paradise-maroon-950 flex items-center justify-center font-black shadow-gold-glow flex-shrink-0">
                  {React.createElement(activeCategoryMeta.icon, {
                    className: 'w-7 h-7',
                  })}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-serif text-2xl sm:text-3xl font-black text-white">
                      {activeCategoryMeta.name}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-paradise-cream-300 font-sans mt-1 max-w-2xl">
                    {activeCategoryMeta.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1 flex-shrink-0 self-start sm:self-center">
                <span className="px-4 py-2 rounded-2xl bg-paradise-gold-400 text-paradise-maroon-950 text-xs font-black uppercase tracking-wider shadow-gold-glow">
                  {activeItems.length} Dishes
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className="text-[11px] text-paradise-gold-300 hover:text-white underline mt-1"
                >
                  View All Categories
                </button>
              </div>
            </div>

            {/* Food Cards Grid */}
            {activeItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {activeItems.map((dish) => (
                  <FoodCard key={dish._id} item={dish} />
                ))}
              </div>
            ) : (
              <NoItemsAvailable
                message={`No ${isVegFilter === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'} dishes found in ${activeCategoryMeta.name}.`}
                onReset={() => {
                  setIsVegFilter('all');
                  setSelectedCategory('all');
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function NoItemsAvailable({
  message,
  onReset,
}: {
  message: string;
  onReset: () => void;
}) {
  return (
    <div className="text-center py-16 bg-white rounded-3xl border border-paradise-cream-300 space-y-4 p-8">
      <div className="w-16 h-16 rounded-full bg-paradise-maroon-50 flex items-center justify-center mx-auto text-paradise-maroon-800">
        <UtensilsCrossed className="w-8 h-8" />
      </div>
      <h3 className="font-serif text-2xl font-bold text-paradise-charcoal-900">
        No Delicacies Available
      </h3>
      <p className="text-xs text-paradise-charcoal-500 max-w-sm mx-auto font-sans leading-relaxed">
        {message}
      </p>
      <button
        onClick={onReset}
        className="px-6 py-2.5 rounded-full bg-paradise-maroon-900 text-paradise-gold-300 text-xs font-bold shadow-royal-sm hover:bg-paradise-maroon-800 transition-colors"
      >
        Reset to All Offerings
      </button>
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-paradise-cream-100 flex items-center justify-center py-20">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-4 border-paradise-maroon-800 border-t-paradise-gold-400 rounded-full animate-spin mx-auto" />
            <p className="text-xs font-bold text-paradise-maroon-900 uppercase tracking-widest">
              Loading Royal Menu...
            </p>
          </div>
        </div>
      }
    >
      <MenuContent />
    </Suspense>
  );
}
