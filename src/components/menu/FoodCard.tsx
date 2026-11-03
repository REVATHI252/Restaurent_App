'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MenuItemData } from '@/types';
import { VegBadge } from '@/components/common/VegBadge';
import { SpiceBadge } from '@/components/common/SpiceBadge';
import { useCart } from '@/context/CartContext';
import { formatINR } from '@/lib/utils';
import {
  Plus,
  Minus,
  Check,
  Flame,
  Award,
  Zap,
  ShoppingBag,
  X,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export function FoodCard({ item }: { item: MenuItemData }) {
  const router = useRouter();
  const { addToCart, setIsCartOpen } = useCart();
  const [selectedPortion, setSelectedPortion] = useState<'Single' | 'Regular' | 'Jumbo'>(
    item.portionType || 'Regular'
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Determine current price based on selected portion
  const currentPrice = React.useMemo(() => {
    if (item.portionOptions && item.portionOptions.length > 0) {
      const option = item.portionOptions.find((p) => p.type === selectedPortion);
      if (option) return option.price;
    }
    return item.price;
  }, [item, selectedPortion]);

  const handleAddToCart = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    addToCart({
      id: item._id,
      name: item.name,
      price: currentPrice,
      quantity,
      portionType: selectedPortion,
      imageUrl: item.imageUrl,
      isVeg: item.isVeg,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleOrderNow = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    addToCart({
      id: item._id,
      name: item.name,
      price: currentPrice,
      quantity,
      portionType: selectedPortion,
      imageUrl: item.imageUrl,
      isVeg: item.isVeg,
    });

    setIsModalOpen(false);
    router.push('/checkout');
  };

  return (
    <>
      {/* Main Food Card */}
      <div
        onClick={() => setIsModalOpen(true)}
        className="bg-white rounded-2xl overflow-hidden border border-paradise-cream-300 hover:border-paradise-gold-400 shadow-sm hover:shadow-royal-md transition-all duration-300 flex flex-col group cursor-pointer focus:outline-none focus:ring-2 focus:ring-paradise-gold-500"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsModalOpen(true);
          }
        }}
      >
        {/* Food Image & Badges Container */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-paradise-charcoal-100">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <VegBadge isVeg={item.isVeg} size="md" />
            {item.isBestseller && (
              <span className="inline-flex items-center gap-1 bg-gradient-to-r from-paradise-gold-500 to-paradise-gold-600 text-paradise-maroon-950 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-md tracking-wider">
                <Award className="w-3 h-3" />
                Bestseller
              </span>
            )}
          </div>

          {/* Spice Level */}
          <div className="absolute bottom-3 left-3">
            <SpiceBadge level={item.spicyLevel} />
          </div>

          {/* Serving Portion Indicator */}
          {item.portionOptions && item.portionOptions.length > 0 && (
            <div className="absolute bottom-3 right-3 text-[10px] bg-black/60 backdrop-blur-md text-white px-2 py-0.5 rounded font-medium">
              {item.portionOptions.find((p) => p.type === selectedPortion)?.serves || '1 person'}
            </div>
          )}

          {/* Quick View Hover Tag */}
          <div className="absolute inset-0 bg-paradise-maroon-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="px-4 py-2 rounded-full bg-white/95 text-paradise-maroon-950 text-xs font-bold uppercase tracking-wider shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
              ⚡ Click to Quick Order
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-paradise-charcoal-900 group-hover:text-paradise-maroon-800 transition-colors line-clamp-1">
              {item.name}
            </h3>
            <p className="text-xs text-paradise-charcoal-600 line-clamp-2 mt-1.5 leading-relaxed font-sans">
              {item.description}
            </p>
          </div>

          {/* Portion Selector Pills */}
          {item.portionOptions && item.portionOptions.length > 0 && (
            <div className="space-y-1.5" onClick={(e) => e.stopPropagation()}>
              <span className="text-[11px] font-semibold text-paradise-charcoal-500 uppercase tracking-wider">
                Portion Size
              </span>
              <div className="grid grid-cols-3 gap-1.5 bg-paradise-cream-200 p-1 rounded-xl">
                {item.portionOptions.map((portion) => (
                  <button
                    key={portion.type}
                    type="button"
                    onClick={() => setSelectedPortion(portion.type)}
                    className={`py-1 text-xs font-semibold rounded-lg transition-all ${
                      selectedPortion === portion.type
                        ? 'bg-paradise-maroon-900 text-paradise-gold-300 shadow-sm'
                        : 'text-paradise-charcoal-700 hover:text-paradise-charcoal-950'
                    }`}
                  >
                    {portion.type}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price & Dual Actions (Order Now + Add to Cart) */}
          <div className="pt-3 border-t border-paradise-cream-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-paradise-charcoal-400 uppercase tracking-wider block">
                  Price
                </span>
                <span className="font-serif text-xl font-extrabold text-paradise-maroon-900">
                  {formatINR(currentPrice)}
                </span>
              </div>

              {/* Direct Order Now Action */}
              <button
                type="button"
                onClick={handleOrderNow}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-paradise-gold-500 via-paradise-gold-600 to-paradise-gold-700 text-paradise-maroon-950 font-extrabold text-xs flex items-center gap-1.5 shadow-gold-glow hover:shadow-gold-glow-lg transition-all transform active:scale-95"
              >
                <Zap className="w-3.5 h-3.5 fill-paradise-maroon-950" />
                <span>Order Now</span>
              </button>
            </div>

            {/* Secondary Add to Cart Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className={`w-full py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all border ${
                isAdded
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-paradise-cream-100 hover:bg-paradise-cream-200 text-paradise-maroon-900 border-paradise-maroon-200'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added to Handi Cart</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5 text-paradise-maroon-800" />
                  <span>+ Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Quick Order Modal (Opens on Card Click) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-paradise-charcoal-950/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Card */}
          <div className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border-2 border-paradise-gold-400 z-10 animate-pulse-subtle">
            {/* Modal Image Header */}
            <div className="relative h-60 w-full bg-paradise-charcoal-900">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 500px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-paradise-maroon-950 via-transparent to-black/40" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-paradise-maroon-950/80 text-white flex items-center justify-center hover:bg-paradise-maroon-900 transition-colors border border-paradise-gold-400"
              >
                <X className="w-5 h-5 text-paradise-gold-300" />
              </button>

              <div className="absolute bottom-4 left-5 right-5 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <VegBadge isVeg={item.isVeg} size="md" />
                  <SpiceBadge level={item.spicyLevel} />
                  {item.isBestseller && (
                    <span className="bg-paradise-gold-500 text-paradise-maroon-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                      Bestseller
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-2xl font-black text-white leading-tight">
                  {item.name}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              <p className="text-xs text-paradise-charcoal-600 leading-relaxed font-sans">
                {item.description}
              </p>

              {/* Portion Options */}
              {item.portionOptions && item.portionOptions.length > 0 && (
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-paradise-charcoal-700 uppercase tracking-wider block">
                    Select Royal Portion Size:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {item.portionOptions.map((portion) => (
                      <button
                        key={portion.type}
                        type="button"
                        onClick={() => setSelectedPortion(portion.type)}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          selectedPortion === portion.type
                            ? 'border-paradise-gold-500 bg-paradise-maroon-900 text-paradise-gold-300 font-bold shadow-md'
                            : 'border-paradise-cream-300 text-paradise-charcoal-700 hover:bg-paradise-cream-100'
                        }`}
                      >
                        <span className="block text-xs font-extrabold">{portion.type}</span>
                        <span className="block text-[10px] text-paradise-gold-400 font-serif font-bold mt-0.5">
                          {formatINR(portion.price)}
                        </span>
                        <span className="block text-[9px] text-paradise-charcoal-400 mt-0.5">
                          {portion.serves}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector & Price */}
              <div className="flex items-center justify-between pt-2 border-t border-paradise-cream-200">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-paradise-charcoal-400 uppercase tracking-wider font-semibold block">
                    Total Amount
                  </span>
                  <span className="font-serif text-2xl font-black text-paradise-maroon-900">
                    {formatINR(currentPrice * quantity)}
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-paradise-cream-200 px-3 py-1.5 rounded-xl border border-paradise-cream-300">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded-lg bg-white flex items-center justify-center font-bold text-paradise-maroon-900 shadow-sm hover:bg-paradise-maroon-100 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-serif font-bold text-sm text-paradise-charcoal-900 w-4 text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 rounded-lg bg-white flex items-center justify-center font-bold text-paradise-maroon-900 shadow-sm hover:bg-paradise-maroon-100 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Modal Direct Actions */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="py-3.5 px-4 rounded-xl bg-paradise-cream-200 hover:bg-paradise-cream-300 text-paradise-maroon-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all border border-paradise-cream-400"
                >
                  <ShoppingBag className="w-4 h-4 text-paradise-maroon-800" />
                  <span>+ Add to Cart</span>
                </button>

                <button
                  type="button"
                  onClick={handleOrderNow}
                  className="py-3.5 px-4 rounded-xl bg-gradient-to-r from-paradise-gold-500 via-paradise-gold-600 to-paradise-gold-700 text-paradise-maroon-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-gold-glow hover:shadow-gold-glow-lg transition-all transform active:scale-95"
                >
                  <Zap className="w-4 h-4 fill-paradise-maroon-950" />
                  <span>⚡ Order Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-paradise-charcoal-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Direct Express Dispatch • Clay Handi Sealed</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FoodCard;
