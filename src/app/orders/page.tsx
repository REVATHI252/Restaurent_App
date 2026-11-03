'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { formatINR } from '@/lib/utils';
import {
  Package,
  Clock,
  CheckCircle2,
  Truck,
  Sparkles,
  ArrowRight,
  Flame,
  ShoppingBag,
  User,
  Lock,
  Mail,
  Phone,
  AlertCircle,
  RotateCcw,
  UtensilsCrossed,
  ShieldCheck,
  Crown,
  LogOut,
} from 'lucide-react';

export default function OrdersPage() {
  const { user, token, isAuthenticated, login, register, logout } = useAuth();
  const { addToCart, setIsCartOpen } = useCart();

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Auth form states for inline sign-in
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [reorderSuccess, setReorderSuccess] = useState<string | null>(null);

  const loadOrders = async () => {
    setLoading(true);
    // 1. First check localStorage for locally placed orders
    let localOrders: any[] = [];
    try {
      const saved = localStorage.getItem('paradise_customer_orders');
      if (saved) {
        localOrders = JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error reading local orders:', e);
    }

    // 2. Fetch server orders if token exists or available
    try {
      const headers: any = {};
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await fetch('/api/orders', { headers });
      const data = await res.json();
      if (data.success && data.orders?.length > 0) {
        // Merge local and server orders without duplicates
        const orderIds = new Set(data.orders.map((o: any) => o._id || o.orderNumber));
        const filteredLocal = localOrders.filter(
          (o: any) => !orderIds.has(o._id || o.orderNumber)
        );
        setOrders([...data.orders, ...filteredLocal]);
      } else {
        setOrders(localOrders);
      }
    } catch (err) {
      setOrders(localOrders);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [token, isAuthenticated]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    const res = await login(loginEmail, loginPassword);
    if (!res.success) {
      setAuthError(res.error || 'Failed to sign in. Please verify credentials.');
    }
    setAuthLoading(false);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    const res = await register(regName, regEmail, regPassword, regPhone);
    if (!res.success) {
      setAuthError(res.error || 'Registration failed. Please try again.');
    }
    setAuthLoading(false);
  };

  const handleDemoUser = () => {
    setLoginEmail('nizam@paradisefoodcourt.in');
    setLoginPassword('Nizam@1953');
  };

  const handleReorder = (order: any) => {
    if (!order.items || order.items.length === 0) return;

    order.items.forEach((it: any) => {
      addToCart({
        id: it.id || it.menuItemId || 'reorder-item',
        name: it.name,
        price: it.unitPrice || (it.totalPrice ? it.totalPrice / (it.quantity || 1) : 350),
        quantity: it.quantity || 1,
        portionType: it.portionType || 'Regular',
        imageUrl: it.imageUrl || 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
        isVeg: !!it.isVeg,
      });
    });

    setReorderSuccess(order.orderNumber);
    setTimeout(() => {
      setReorderSuccess(null);
      setIsCartOpen(true);
    }, 800);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'received':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
            <Clock className="w-3.5 h-3.5 text-amber-700" />
            Order Received
          </span>
        );
      case 'preparing':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-900 border border-orange-300 animate-pulse">
            <Flame className="w-3.5 h-3.5 text-orange-600" />
            Clay Handi Dum Cooking
          </span>
        );
      case 'out_for_delivery':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-900 border border-purple-300">
            <Truck className="w-3.5 h-3.5 text-purple-700" />
            Out for Delivery
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            Delivered Hot & Fresh
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-900 border border-rose-300">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-paradise-cream-100 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-paradise-cream-300">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-paradise-maroon-900">
              <Sparkles className="w-3.5 h-3.5 text-paradise-gold-600" />
              <span>Live Order Tracker & History</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-black text-paradise-charcoal-900 mt-1">
              Orders
            </h1>
            <p className="text-xs text-paradise-charcoal-500 mt-0.5">
              Track your authentic slow-cooked Dum Biryani orders in real-time.
            </p>
          </div>

          <Link
            href="/menu"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-paradise-gold-500 via-paradise-gold-600 to-paradise-gold-700 text-paradise-maroon-950 font-extrabold text-xs uppercase tracking-wider shadow-gold-glow hover:shadow-gold-glow-lg transition-all transform active:scale-95 self-start sm:self-center"
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Explore Menu</span>
          </Link>
        </div>

        {/* ================================================================= */}
        {/* SIGN IN EXPERIENCE WHEN USER IS NOT LOGGED IN */}
        {/* ================================================================= */}
        {!isAuthenticated ? (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-paradise-cream-300 p-6 sm:p-8 shadow-royal-md space-y-6">
              <div className="text-center space-y-2 max-w-lg mx-auto">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-paradise-gold-400 to-paradise-gold-700 p-0.5 mx-auto flex items-center justify-center shadow-gold-glow">
                  <div className="w-full h-full bg-paradise-maroon-900 rounded-2xl flex items-center justify-center">
                    <Crown className="w-7 h-7 text-paradise-gold-400" />
                  </div>
                </div>
                <h2 className="font-serif text-2xl font-black text-paradise-charcoal-900">
                  Sign In to Access Your Orders & Fast Ordering
                </h2>
                <p className="text-xs text-paradise-charcoal-600 font-sans leading-relaxed">
                  Sign in to track active orders in real-time, view your Nizami feast invoices, and reorder with a single click.
                </p>
              </div>

              {/* Tab Selector for Sign In vs Register */}
              <div className="flex rounded-2xl bg-paradise-cream-100 p-1 max-w-sm mx-auto border border-paradise-cream-300">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setAuthError('');
                  }}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                    authMode === 'login'
                      ? 'bg-paradise-maroon-900 text-paradise-gold-300 shadow-sm font-black'
                      : 'text-paradise-charcoal-600 hover:text-paradise-charcoal-900'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('register');
                    setAuthError('');
                  }}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                    authMode === 'register'
                      ? 'bg-paradise-maroon-900 text-paradise-gold-300 shadow-sm font-black'
                      : 'text-paradise-charcoal-600 hover:text-paradise-charcoal-900'
                  }`}
                >
                  New Member Register
                </button>
              </div>

              {authError && (
                <div className="max-w-md mx-auto p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              {/* Login Form */}
              {authMode === 'login' && (
                <form onSubmit={handleLoginSubmit} className="max-w-md mx-auto space-y-4">
                  <div>
                    <label className="text-[11px] font-semibold text-paradise-charcoal-600 block mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="nizam@paradisefoodcourt.in"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-paradise-cream-50 border border-paradise-cream-300 text-xs text-paradise-charcoal-900 focus:outline-none focus:border-paradise-gold-500 font-medium"
                      />
                      <Mail className="w-4 h-4 text-paradise-charcoal-400 absolute left-3.5 top-3.5" />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-paradise-charcoal-600 block mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-paradise-cream-50 border border-paradise-cream-300 text-xs text-paradise-charcoal-900 focus:outline-none focus:border-paradise-gold-500 font-medium"
                      />
                      <Lock className="w-4 h-4 text-paradise-charcoal-400 absolute left-3.5 top-3.5" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-paradise-gold-500 via-paradise-gold-600 to-paradise-gold-700 text-paradise-maroon-950 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-gold-glow hover:shadow-gold-glow-lg transition-all disabled:opacity-50"
                  >
                    {authLoading ? 'Authenticating...' : 'Sign In to View Orders'}
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={handleDemoUser}
                      className="text-[11px] font-bold text-paradise-maroon-800 hover:text-paradise-gold-700 underline"
                    >
                      ⚡ 1-Click Fill Demo Guest Account
                    </button>
                  </div>
                </form>
              )}

              {/* Register Form */}
              {authMode === 'register' && (
                <form onSubmit={handleRegisterSubmit} className="max-w-md mx-auto space-y-4">
                  <div>
                    <label className="text-[11px] font-semibold text-paradise-charcoal-600 block mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="Nawab Ali Khan"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-paradise-cream-50 border border-paradise-cream-300 text-xs text-paradise-charcoal-900 focus:outline-none focus:border-paradise-gold-500 font-medium"
                      />
                      <User className="w-4 h-4 text-paradise-charcoal-400 absolute left-3.5 top-3.5" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-paradise-charcoal-600 block mb-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          value={regPhone}
                          onChange={(e) => setRegPhone(e.target.value)}
                          placeholder="9876543210"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-paradise-cream-50 border border-paradise-cream-300 text-xs text-paradise-charcoal-900 focus:outline-none focus:border-paradise-gold-500 font-medium"
                        />
                        <Phone className="w-4 h-4 text-paradise-charcoal-400 absolute left-3.5 top-3.5" />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-paradise-charcoal-600 block mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          placeholder="nawab@paradise.in"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-paradise-cream-50 border border-paradise-cream-300 text-xs text-paradise-charcoal-900 focus:outline-none focus:border-paradise-gold-500 font-medium"
                        />
                        <Mail className="w-4 h-4 text-paradise-charcoal-400 absolute left-3.5 top-3.5" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-paradise-charcoal-600 block mb-1">
                      Create Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-paradise-cream-50 border border-paradise-cream-300 text-xs text-paradise-charcoal-900 focus:outline-none focus:border-paradise-gold-500 font-medium"
                      />
                      <Lock className="w-4 h-4 text-paradise-charcoal-400 absolute left-3.5 top-3.5" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-paradise-gold-500 via-paradise-gold-600 to-paradise-gold-700 text-paradise-maroon-950 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-gold-glow hover:shadow-gold-glow-lg transition-all disabled:opacity-50"
                  >
                    {authLoading ? 'Creating Account...' : 'Create Account & View Orders'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* Sign In Privileges */}
              <div className="pt-4 border-t border-paradise-cream-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs">
                <div className="p-3 rounded-xl bg-paradise-cream-50 border border-paradise-cream-200">
                  <span className="font-bold text-paradise-maroon-900 block mb-0.5">⚡ 1-Click Reorder</span>
                  <span className="text-[11px] text-paradise-charcoal-500">Re-order favorite Nizami spreads instantly</span>
                </div>
                <div className="p-3 rounded-xl bg-paradise-cream-50 border border-paradise-cream-200">
                  <span className="font-bold text-paradise-maroon-900 block mb-0.5">🍲 Live Dum Tracking</span>
                  <span className="text-[11px] text-paradise-charcoal-500">Live charcoal handi preparation updates</span>
                </div>
                <div className="p-3 rounded-xl bg-paradise-cream-50 border border-paradise-cream-200">
                  <span className="font-bold text-paradise-maroon-900 block mb-0.5">👑 Member Privileges</span>
                  <span className="text-[11px] text-paradise-charcoal-500">Exclusive discounts and table priority</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ================================================================= */
          /* LOGGED IN USER STATUS BANNER */
          /* ================================================================= */
          <div className="bg-paradise-maroon-900 text-white rounded-2xl p-4 border border-paradise-gold-600/40 shadow-royal-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-paradise-gold-400 text-paradise-maroon-950 flex items-center justify-center font-bold shadow-gold-glow">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-paradise-gold-300 font-bold uppercase tracking-wider block">
                  Logged In Account
                </span>
                <span className="font-serif text-sm sm:text-base font-bold text-white">
                  {user?.name} ({user?.email})
                </span>
              </div>
            </div>

            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-paradise-maroon-950/80 hover:bg-paradise-maroon-800 text-paradise-cream-300 hover:text-rose-300 text-xs font-semibold border border-paradise-gold-700/40 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        )}

        {/* ================================================================= */}
        {/* ORDERS LIST OR EMPTY STATE (WHEN LOGGED IN OR LOCAL ORDERS EXIST) */}
        {/* ================================================================= */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-40 bg-white rounded-2xl border border-paradise-cream-300 animate-pulse p-6"
              />
            ))}
          </div>
        ) : orders.length === 0 ? (
          isAuthenticated && (
            <div className="text-center py-16 bg-white rounded-3xl border border-paradise-cream-300 shadow-sm space-y-5 p-8">
              <div className="w-20 h-20 rounded-full bg-paradise-maroon-50 border-2 border-dashed border-paradise-gold-400 flex items-center justify-center mx-auto text-paradise-maroon-800">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-paradise-charcoal-900">
                  No Active Orders Yet
                </h3>
                <p className="text-xs text-paradise-charcoal-500 max-w-md mx-auto mt-1.5 font-sans leading-relaxed">
                  Your order history is currently empty. Explore our authentic slow-cooked Nizami dum biryanis, charcoal kebabs, and heritage desserts.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/menu"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-paradise-maroon-900 text-paradise-gold-300 font-extrabold text-xs uppercase tracking-wider hover:bg-paradise-maroon-800 shadow-royal-md transition-all"
                >
                  <UtensilsCrossed className="w-4 h-4" />
                  <span>Browse Menu</span>
                </Link>
              </div>
            </div>
          )
        ) : (
          <div className="space-y-5">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold uppercase tracking-widest text-paradise-charcoal-600">
                Your Order History ({orders.length})
              </span>
              <button
                onClick={loadOrders}
                className="text-xs text-paradise-maroon-800 hover:underline font-bold flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Refresh Status</span>
              </button>
            </div>

            {orders.map((order) => (
              <div
                key={order._id || order.orderNumber}
                className="bg-white rounded-3xl border border-paradise-cream-300 p-6 shadow-sm hover:shadow-royal-md transition-all space-y-5"
              >
                {/* Order Header Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-paradise-cream-200">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-paradise-charcoal-400 uppercase tracking-wider font-semibold block">
                      Order Reference
                    </span>
                    <h3 className="font-mono text-lg font-black text-paradise-charcoal-900">
                      {order.orderNumber}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-paradise-charcoal-500 font-medium">
                      {new Date(order.createdAt || Date.now()).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    {getStatusBadge(order.orderStatus || 'received')}
                  </div>
                </div>

                {/* Ordered Items List */}
                <div className="space-y-2.5 text-xs text-paradise-charcoal-700 bg-paradise-cream-50 p-4 rounded-2xl border border-paradise-cream-200">
                  <span className="text-[10px] uppercase font-bold text-paradise-charcoal-400 tracking-wider block mb-1">
                    Delicacies in Handi
                  </span>
                  {order.items?.map((it: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center py-0.5">
                      <span>
                        <strong className="text-paradise-charcoal-900">{it.quantity}x</strong>{' '}
                        {it.name} ({it.portionType || 'Regular'})
                      </span>
                      <span className="font-bold text-paradise-charcoal-900">
                        {formatINR(it.totalPrice || (it.unitPrice || 0) * (it.quantity || 1))}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Delivery Locality & Payment & Re-order Action */}
                <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-paradise-charcoal-600 gap-4">
                  <div className="max-w-md space-y-0.5">
                    <span className="font-bold text-paradise-charcoal-800 block">
                      Delivering to:
                    </span>
                    <span className="text-[11px] text-paradise-charcoal-600">
                      {order.deliveryAddress?.recipientName && `${order.deliveryAddress.recipientName} • `}
                      {order.deliveryAddress?.street}, {order.deliveryAddress?.area},{' '}
                      {order.deliveryAddress?.city} ({order.deliveryAddress?.pincode})
                    </span>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] text-paradise-charcoal-400 uppercase tracking-wider block">
                        Total ({order.paymentMethod?.toUpperCase() || 'UPI'})
                      </span>
                      <span className="font-serif text-lg font-black text-paradise-maroon-900">
                        {formatINR(order.finalAmount || order.totalAmount || 0)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleReorder(order)}
                      className="px-4 py-2.5 rounded-xl bg-paradise-maroon-900 text-paradise-gold-300 text-xs font-bold hover:bg-paradise-maroon-800 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{reorderSuccess === order.orderNumber ? 'Added to Cart!' : 'Re-Order'}</span>
                    </button>
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
