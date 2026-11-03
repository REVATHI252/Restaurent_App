'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { VegBadge } from '@/components/common/VegBadge';
import { formatINR } from '@/lib/utils';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    deliveryFee,
    tax,
    grandTotal,
    clearCart,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-paradise-charcoal-950/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-over Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-paradise-gold-300">
          {/* Header */}
          <div className="bg-paradise-maroon-900 px-6 py-5 flex items-center justify-between border-b border-paradise-gold-500/30">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-paradise-gold-400" />
              <h2 className="font-serif text-lg font-bold text-white tracking-wide">
                Your Royal Order ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-paradise-gold-300 hover:text-white p-1 rounded-lg hover:bg-paradise-maroon-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 divide-y divide-paradise-cream-200">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-20 h-20 rounded-full bg-paradise-maroon-50 flex items-center justify-center border-2 border-dashed border-paradise-gold-400">
                  <ShoppingBag className="w-10 h-10 text-paradise-maroon-700/60" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-paradise-charcoal-900">
                    Your Dum Biryani Handi is Empty
                  </h3>
                  <p className="text-xs text-paradise-charcoal-500 mt-1 max-w-xs">
                    Indulge in authentic royal flavors. Choose from our legendary Biryanis, Kebabs, and Desserts.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-paradise-maroon-900 text-paradise-gold-300 font-semibold text-xs hover:bg-paradise-maroon-800 transition-all shadow-royal-sm"
                >
                  Explore Royal Menu
                </button>
              </div>
            ) : (
              <>
                <div className="pt-2 flex justify-between items-center text-xs text-paradise-charcoal-500">
                  <span>Selected Items</span>
                  <button
                    onClick={clearCart}
                    className="text-rose-600 hover:underline flex items-center gap-1 font-medium"
                  >
                    <Trash2 className="w-3 h-3" />
                    Clear All
                  </button>
                </div>

                {cart.map((item) => (
                  <div key={`${item.id}-${item.portionType}`} className="pt-4 flex items-start gap-3">
                    {/* Food Image */}
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-paradise-cream-300">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <VegBadge isVeg={item.isVeg} size="sm" />
                        <h4 className="text-xs font-bold text-paradise-charcoal-900 truncate">
                          {item.name}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] px-2 py-0.5 rounded bg-paradise-gold-100 text-paradise-gold-900 font-semibold border border-paradise-gold-300">
                          {item.portionType}
                        </span>
                        <span className="text-xs font-bold text-paradise-maroon-900">
                          {formatINR(item.price * item.quantity)}
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-paradise-maroon-200 rounded-lg overflow-hidden bg-paradise-maroon-50/50">
                          <button
                            onClick={() => updateQuantity(item.id, item.portionType, -1)}
                            className="p-1 hover:bg-paradise-maroon-200 text-paradise-maroon-900 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-paradise-maroon-950">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.portionType, 1)}
                            className="p-1 hover:bg-paradise-maroon-200 text-paradise-maroon-900 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id, item.portionType)}
                          className="text-rose-600 hover:text-rose-800 p-1 text-xs"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Footer Bill & Checkout */}
          {cart.length > 0 && (
            <div className="bg-paradise-cream-100 p-6 border-t border-paradise-gold-300 space-y-4">
              {/* Bill Details */}
              <div className="space-y-1.5 text-xs text-paradise-charcoal-700">
                <div className="flex justify-between">
                  <span>Item Subtotal</span>
                  <span className="font-semibold text-paradise-charcoal-900">
                    {formatINR(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5% Restaurant Service)</span>
                  <span className="font-semibold text-paradise-charcoal-900">{formatINR(tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="font-semibold">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      formatINR(deliveryFee)
                    )}
                  </span>
                </div>
                {deliveryFee > 0 && (
                  <p className="text-[10px] text-amber-700">
                    Add {formatINR(500 - subtotal)} more to get FREE Delivery!
                  </p>
                )}
                <div className="pt-2 border-t border-paradise-cream-300 flex justify-between text-sm font-bold text-paradise-maroon-950">
                  <span>Grand Total</span>
                  <span className="text-base text-paradise-maroon-900">
                    {formatINR(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-paradise-gold-500 via-paradise-gold-600 to-paradise-gold-700 text-paradise-maroon-950 font-extrabold text-sm flex items-center justify-between shadow-gold-glow hover:shadow-gold-glow-lg transition-all transform active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <div className="flex items-center gap-1">
                  <span>{formatINR(grandTotal)}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-paradise-charcoal-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Authentic Paradise Royal Quality Guaranteed</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
