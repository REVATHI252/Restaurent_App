'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import {
  ShieldCheck,
  Lock,
  Package,
  CalendarDays,
  RefreshCw,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  Phone,
  MapPin,
  Users,
  CreditCard,
  ChefHat,
  ArrowRight,
  LogOut,
  Sparkles,
  DollarSign,
  AlertCircle,
  Eye,
  Check,
  ChevronDown,
} from 'lucide-react';

type OrderStatus = 'received' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
type ReservationStatus = 'confirmed' | 'seated' | 'completed' | 'cancelled';

export default function AdminPage() {
  const { user, token, isAuthenticated, isAdmin, login, logout, isLoading: isAuthLoading } = useAuth();

  // Login form state for unauthenticated admin access
  const [emailInput, setEmailInput] = useState('admin@paradisefoodcourt.in');
  const [passwordInput, setPasswordInput] = useState('Admin@1953');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Admin View Tabs: 'orders' | 'reservations'
  const [activeTab, setActiveTab] = useState<'orders' | 'reservations'>('orders');

  // Orders State
  const [orders, setOrders] = useState<any[]>([]);
  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [orderSearch, setOrderSearch] = useState<string>('');
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  // Reservations State
  const [reservations, setReservations] = useState<any[]>([]);
  const [reservationFilter, setReservationFilter] = useState<string>('all');
  const [reservationSearch, setReservationSearch] = useState<string>('');
  const [isLoadingReservations, setIsLoadingReservations] = useState(false);
  const [updatingResId, setUpdatingResId] = useState<string | null>(null);

  // Success toast / notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Fetch orders
  const fetchOrders = async () => {
    setIsLoadingOrders(true);
    try {
      const res = await fetch('/api/orders?admin=true', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.orders)) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error('Failed to load admin orders:', err);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  // Fetch reservations
  const fetchReservations = async () => {
    setIsLoadingReservations(true);
    try {
      const res = await fetch('/api/reservation?admin=true', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.reservations)) {
        setReservations(data.reservations);
      }
    } catch (err) {
      console.error('Failed to load admin reservations:', err);
    } finally {
      setIsLoadingReservations(false);
    }
  };

  // Load data when authenticated as admin
  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      fetchOrders();
      fetchReservations();
    }
  }, [isAuthenticated, isAdmin, token]);

  // Handle Admin Login submission
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    try {
      const res = await login(emailInput, passwordInput);
      if (!res.success) {
        setLoginError(res.error || 'Authentication failed. Please verify credentials.');
      } else {
        showToast('Welcome, Administrator. Paradise Command Center active.');
      }
    } catch (err: any) {
      setLoginError(err.message || 'Login error occurred');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Quick 1-click admin login
  const handleQuickDemoLogin = async () => {
    setEmailInput('admin@paradisefoodcourt.in');
    setPasswordInput('Admin@1953');
    setIsLoggingIn(true);
    setLoginError('');
    const res = await login('admin@paradisefoodcourt.in', 'Admin@1953');
    if (!res.success) {
      setLoginError(res.error || 'Login failed');
    } else {
      showToast('Logged in as Paradise Royal Admin.');
    }
    setIsLoggingIn(false);
  };

  // Update Order Status
  const handleUpdateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    setUpdatingOrderId(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          status: newStatus,
          note: `Status set to ${newStatus.replace('_', ' ')} by admin console`,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((o) =>
            o._id === orderId || o.orderNumber === orderId
              ? { ...o, orderStatus: newStatus }
              : o
          )
        );
        showToast(`Order updated to "${newStatus.replace('_', ' ').toUpperCase()}".`);
      } else {
        showToast(`Failed to update order: ${data.error || 'Unknown error'}`);
      }
    } catch (err) {
      showToast('Network error while updating order status.');
    } finally {
      setUpdatingOrderId(null);
    }
  };

  // Update Reservation Status
  const handleUpdateReservationStatus = async (resId: string, newStatus: ReservationStatus) => {
    setUpdatingResId(resId);
    try {
      const res = await fetch(`/api/reservation/${resId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (data.success) {
        setReservations((prev) =>
          prev.map((r) =>
            r._id === resId || r.bookingNumber === resId
              ? { ...r, status: newStatus }
              : r
          )
        );
        showToast(`Reservation updated to "${newStatus.toUpperCase()}".`);
      } else {
        showToast(`Failed to update reservation: ${data.error || 'Unknown error'}`);
      }
    } catch (err) {
      showToast('Network error while updating reservation.');
    } finally {
      setUpdatingResId(null);
    }
  };

  // -------------------------------------------------------------
  // Filtered Orders
  // -------------------------------------------------------------
  const filteredOrders = orders.filter((order) => {
    const matchesFilter = orderFilter === 'all' || order.orderStatus === orderFilter;
    const query = orderSearch.toLowerCase().trim();
    const matchesSearch =
      !query ||
      order.orderNumber?.toLowerCase().includes(query) ||
      order.deliveryAddress?.recipientName?.toLowerCase().includes(query) ||
      order.deliveryAddress?.recipientPhone?.includes(query) ||
      order.deliveryAddress?.area?.toLowerCase().includes(query);

    return matchesFilter && matchesSearch;
  });

  // -------------------------------------------------------------
  // Filtered Reservations
  // -------------------------------------------------------------
  const filteredReservations = reservations.filter((res) => {
    const matchesFilter = reservationFilter === 'all' || res.status === reservationFilter;
    const query = reservationSearch.toLowerCase().trim();
    const matchesSearch =
      !query ||
      res.bookingNumber?.toLowerCase().includes(query) ||
      res.customerName?.toLowerCase().includes(query) ||
      res.customerPhone?.includes(query) ||
      res.outletName?.toLowerCase().includes(query);

    return matchesFilter && matchesSearch;
  });

  // Calculate high-level stats
  const totalOrdersCount = orders.length;
  const activeOrdersCount = orders.filter((o) =>
    ['received', 'preparing', 'out_for_delivery'].includes(o.orderStatus)
  ).length;
  const totalRevenue = orders
    .filter((o) => o.orderStatus !== 'cancelled')
    .reduce((sum, o) => sum + (o.finalAmount || o.totalAmount || 0), 0);

  const totalReservationsCount = reservations.length;
  const confirmedReservationsCount = reservations.filter((r) => r.status === 'confirmed').length;
  const totalGuestsExpected = reservations
    .filter((r) => ['confirmed', 'seated'].includes(r.status))
    .reduce((sum, r) => sum + (r.guestsCount || 0), 0);

  // -------------------------------------------------------------
  // 1. Loading screen
  // -------------------------------------------------------------
  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-paradise-maroon-950 flex flex-col items-center justify-center p-6 text-white">
        <div className="w-14 h-14 border-4 border-paradise-gold-400 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-serif text-paradise-gold-300 tracking-wider text-lg">
          Securing Paradise Operations Console...
        </p>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. Unauthenticated or Non-Admin: Security Gateway
  // -------------------------------------------------------------
  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-[85vh] bg-gradient-to-b from-paradise-maroon-950 via-paradise-maroon-900 to-paradise-maroon-950 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="w-full max-w-md bg-paradise-maroon-900/90 border-2 border-paradise-gold-600/40 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
          {/* Decorative Corner Ornaments */}
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-paradise-gold-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-paradise-gold-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Portal Insignia */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-paradise-gold-400 to-paradise-gold-700 text-paradise-maroon-950 shadow-gold-glow mb-3">
              <ShieldCheck className="w-9 h-9" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-paradise-gold-300">
              Admin Portal
            </h1>
            <p className="text-xs uppercase tracking-[0.2em] text-paradise-gold-400/80 mt-1 font-sans">
              Restricted Operations Center
            </p>
            {isAuthenticated && !isAdmin && (
              <div className="mt-4 p-3 bg-red-950/80 border border-red-500/50 rounded-xl text-red-200 text-xs">
                <AlertCircle className="w-4 h-4 inline-block mr-1.5 text-red-400" />
                Logged in as <strong>{user?.email}</strong> (Customer). Administrator authorization is required to access this portal.
              </div>
            )}
          </div>

          {loginError && (
            <div className="mb-4 p-3 bg-red-900/60 border border-red-500/60 rounded-xl text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Admin Credentials Login Form */}
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-paradise-gold-200 mb-1">
                Admin Email Address
              </label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="admin@paradisefoodcourt.in"
                className="w-full bg-paradise-maroon-950/90 border border-paradise-gold-700/60 rounded-xl px-4 py-2.5 text-sm text-white placeholder-paradise-gold-900/60 focus:outline-none focus:border-paradise-gold-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-paradise-gold-200 mb-1">
                Secret Access Password
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-paradise-maroon-950/90 border border-paradise-gold-700/60 rounded-xl px-4 py-2.5 text-sm text-white placeholder-paradise-gold-900/60 focus:outline-none focus:border-paradise-gold-400 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-gradient-to-r from-paradise-gold-400 via-paradise-gold-500 to-paradise-gold-600 text-paradise-maroon-950 font-black py-3 rounded-xl shadow-gold-glow hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Clearance...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Authorize & Access Admin Console</span>
                </>
              )}
            </button>
          </form>

          {/* 1-Click Quick Demo Admin Login Button */}
          <div className="mt-6 pt-4 border-t border-paradise-gold-800/40 text-center">
            <p className="text-[11px] text-paradise-gold-300/70 mb-2">
              Instant Demo Access for Testing:
            </p>
            <button
              onClick={handleQuickDemoLogin}
              disabled={isLoggingIn}
              className="w-full bg-paradise-maroon-950 hover:bg-paradise-maroon-800 border border-paradise-gold-600/50 text-paradise-gold-300 hover:text-paradise-gold-200 text-xs font-bold py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-paradise-gold-400" />
              <span>One-Click Demo Admin Login (admin@paradisefoodcourt.in)</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 3. Authenticated Admin: Full Operations Command Portal
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-paradise-maroon-950 text-paradise-cream-100 font-sans pb-16">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-paradise-maroon-900 to-paradise-maroon-950 border-2 border-paradise-gold-400 text-paradise-gold-200 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in text-sm font-semibold">
          <CheckCircle2 className="w-5 h-5 text-paradise-gold-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Status Header */}
      <div className="bg-gradient-to-r from-paradise-maroon-900 via-paradise-maroon-950 to-paradise-maroon-900 border-b border-paradise-gold-700/50 py-6 px-4 sm:px-6 lg:px-8 shadow-royal-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-paradise-gold-400 via-paradise-gold-500 to-paradise-gold-700 p-0.5 shadow-gold-glow flex items-center justify-center flex-shrink-0">
              <div className="w-full h-full bg-paradise-maroon-950 rounded-2xl flex items-center justify-center">
                <ChefHat className="w-7 h-7 text-paradise-gold-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-paradise-gold-500/20 text-paradise-gold-300 border border-paradise-gold-500/40 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  👑 Royal Master Console
                </span>
                <span className="text-xs text-paradise-gold-400/80 font-mono">
                  Live Dispatch
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-paradise-gold-300">
                Paradise Operations & Dispatch
              </h1>
            </div>
          </div>

          {/* Admin Profile & Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                fetchOrders();
                fetchReservations();
                showToast('Refreshed orders & reservations.');
              }}
              disabled={isLoadingOrders || isLoadingReservations}
              className="flex items-center gap-2 bg-paradise-maroon-900 hover:bg-paradise-maroon-800 border border-paradise-gold-600/50 text-paradise-gold-300 hover:text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95"
            >
              <RefreshCw
                className={`w-4 h-4 text-paradise-gold-400 ${
                  isLoadingOrders || isLoadingReservations ? 'animate-spin' : ''
                }`}
              />
              <span>Refresh Data</span>
            </button>

            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-bold text-white">{user?.name || 'Administrator'}</span>
              <span className="text-[11px] text-paradise-gold-400/80">{user?.email}</span>
            </div>

            <button
              onClick={logout}
              className="flex items-center gap-1.5 bg-red-950/80 hover:bg-red-900 border border-red-600/40 text-red-200 px-3 py-2 rounded-xl text-xs font-bold transition-all"
              title="Sign out from Admin console"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Executive Metrics Overview Bar */}
        <section aria-label="Operational Metrics" className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
          <div className="bg-paradise-maroon-900/80 border border-paradise-gold-700/40 rounded-2xl p-4 shadow-royal-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-paradise-gold-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Orders</span>
              <Package className="w-4 h-4 text-paradise-gold-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">{totalOrdersCount}</div>
            <span className="text-[11px] text-paradise-gold-300/70 mt-1">Lifetime recorded</span>
          </div>

          <div className="bg-paradise-maroon-900/80 border border-paradise-gold-500/50 rounded-2xl p-4 shadow-gold-glow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-amber-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Active Kitchen</span>
              <ChefHat className="w-4 h-4 text-amber-400 animate-pulse" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-300">{activeOrdersCount}</div>
            <span className="text-[11px] text-amber-300/70 mt-1">In kitchen / Out for delivery</span>
          </div>

          <div className="bg-paradise-maroon-900/80 border border-paradise-gold-700/40 rounded-2xl p-4 shadow-royal-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-emerald-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Sales</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-300">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-emerald-300/70 mt-1">Gross volume</span>
          </div>

          <div className="bg-paradise-maroon-900/80 border border-paradise-gold-700/40 rounded-2xl p-4 shadow-royal-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-paradise-gold-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Reservations</span>
              <CalendarDays className="w-4 h-4 text-paradise-gold-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">{totalReservationsCount}</div>
            <span className="text-[11px] text-paradise-gold-300/70 mt-1">
              {confirmedReservationsCount} Confirmed
            </span>
          </div>

          <div className="bg-paradise-maroon-900/80 border border-paradise-gold-700/40 rounded-2xl p-4 shadow-royal-sm flex flex-col justify-between col-span-2 md:col-span-1">
            <div className="flex items-center justify-between text-sky-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Expected Guests</span>
              <Users className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-sky-300">{totalGuestsExpected}</div>
            <span className="text-[11px] text-sky-300/70 mt-1">Dining covers</span>
          </div>
        </section>

        {/* Primary Tab Navigation */}
        <div className="flex items-center gap-3 border-b-2 border-paradise-gold-800/60 pb-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl font-bold text-sm transition-all border ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-paradise-gold-400 via-paradise-gold-500 to-paradise-gold-600 text-paradise-maroon-950 border-paradise-gold-300 shadow-gold-glow font-black'
                : 'bg-paradise-maroon-900/80 text-paradise-cream-200 hover:text-paradise-gold-300 border-paradise-gold-700/40 hover:border-paradise-gold-400'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>🍛 Food Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reservations')}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl font-bold text-sm transition-all border ${
              activeTab === 'reservations'
                ? 'bg-gradient-to-r from-paradise-gold-400 via-paradise-gold-500 to-paradise-gold-600 text-paradise-maroon-950 border-paradise-gold-300 shadow-gold-glow font-black'
                : 'bg-paradise-maroon-900/80 text-paradise-cream-200 hover:text-paradise-gold-300 border-paradise-gold-700/40 hover:border-paradise-gold-400'
            }`}
          >
            <CalendarDays className="w-4 h-4" />
            <span>🏛️ Table Reservations ({reservations.length})</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: FOOD ORDERS DISPATCH & STATUS MANAGEMENT                           */}
        {/* ========================================================================= */}
        {activeTab === 'orders' && (
          <section className="space-y-6">
            {/* Filter Pills & Search */}
            <div className="bg-paradise-maroon-900/80 border border-paradise-gold-700/40 rounded-2xl p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Status Filter Buttons */}
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { key: 'all', label: 'All Orders' },
                  { key: 'received', label: 'Received 📥' },
                  { key: 'preparing', label: 'Preparing 👨‍🍳' },
                  { key: 'out_for_delivery', label: 'Out for Delivery 🛵' },
                  { key: 'delivered', label: 'Delivered ✅' },
                  { key: 'cancelled', label: 'Cancelled ❌' },
                ].map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setOrderFilter(f.key)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                      orderFilter === f.key
                        ? 'bg-paradise-gold-400 text-paradise-maroon-950 border-paradise-gold-300 shadow-sm'
                        : 'bg-paradise-maroon-950/70 text-paradise-cream-200 hover:text-white border-paradise-maroon-800'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Order Search */}
              <div className="relative w-full lg:w-72">
                <Search className="w-4 h-4 text-paradise-gold-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="Search order #, customer, phone..."
                  className="w-full bg-paradise-maroon-950 border border-paradise-gold-700/50 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-paradise-gold-400/50 focus:outline-none focus:border-paradise-gold-400"
                />
              </div>
            </div>

            {/* Orders Listing */}
            {isLoadingOrders ? (
              <div className="py-16 text-center text-paradise-gold-300">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-paradise-gold-400" />
                <p>Loading live kitchen orders...</p>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="bg-paradise-maroon-900/40 border border-dashed border-paradise-gold-700/40 rounded-3xl p-12 text-center">
                <Package className="w-12 h-12 text-paradise-gold-400/50 mx-auto mb-3" />
                <h3 className="font-serif text-lg font-bold text-paradise-gold-300">
                  No orders found matching the criteria
                </h3>
                <p className="text-xs text-paradise-cream-200/60 mt-1">
                  Try changing the filter or search query.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5">
                {filteredOrders.map((order) => {
                  const statusColors: Record<string, { bg: string; text: string; border: string }> = {
                    received: {
                      bg: 'bg-blue-950/70',
                      text: 'text-blue-300',
                      border: 'border-blue-500/50',
                    },
                    preparing: {
                      bg: 'bg-amber-950/70',
                      text: 'text-amber-300',
                      border: 'border-amber-500/50',
                    },
                    out_for_delivery: {
                      bg: 'bg-purple-950/70',
                      text: 'text-purple-300',
                      border: 'border-purple-500/50',
                    },
                    delivered: {
                      bg: 'bg-emerald-950/70',
                      text: 'text-emerald-300',
                      border: 'border-emerald-500/50',
                    },
                    cancelled: {
                      bg: 'bg-red-950/70',
                      text: 'text-red-300',
                      border: 'border-red-500/50',
                    },
                  };

                  const currentStyle = statusColors[order.orderStatus] || statusColors.received;
                  const isUpdating = updatingOrderId === order._id || updatingOrderId === order.orderNumber;

                  return (
                    <div
                      key={order._id || order.orderNumber}
                      className="bg-paradise-maroon-900/90 border border-paradise-gold-700/40 rounded-3xl p-5 sm:p-6 shadow-royal-md hover:border-paradise-gold-500/60 transition-all space-y-4"
                    >
                      {/* Order Card Top Bar */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-paradise-gold-800/40 gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-paradise-maroon-950 border border-paradise-gold-600/40 flex items-center justify-center font-mono font-bold text-paradise-gold-300 text-sm">
                            📦
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-sm font-bold text-paradise-gold-300">
                                {order.orderNumber}
                              </span>
                              <span
                                className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${currentStyle.bg} ${currentStyle.text} ${currentStyle.border}`}
                              >
                                {order.orderStatus?.replace('_', ' ')}
                              </span>
                            </div>
                            <span className="text-[11px] text-paradise-cream-200/60 flex items-center gap-1 mt-0.5">
                              <Clock className="w-3 h-3 text-paradise-gold-400" />
                              {new Date(order.createdAt).toLocaleString('en-IN', {
                                dateStyle: 'medium',
                                timeStyle: 'short',
                              })}
                            </span>
                          </div>
                        </div>

                        {/* Customer Quick Summary */}
                        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 bg-paradise-maroon-950/70 border border-paradise-gold-800/50 px-3.5 py-2 rounded-xl text-xs">
                          <div className="flex items-center gap-1 text-white font-medium">
                            <span className="text-paradise-gold-400 font-bold">Customer:</span>
                            <span>{order.deliveryAddress?.recipientName}</span>
                          </div>
                          <a
                            href={`tel:${order.deliveryAddress?.recipientPhone}`}
                            className="flex items-center gap-1 text-paradise-gold-300 hover:text-paradise-gold-200 underline"
                          >
                            <Phone className="w-3 h-3" />
                            <span>{order.deliveryAddress?.recipientPhone}</span>
                          </a>
                        </div>
                      </div>

                      {/* Middle: Items breakdown & Address */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Items Column */}
                        <div className="md:col-span-2 space-y-2">
                          <h4 className="text-xs font-bold text-paradise-gold-400 uppercase tracking-wider">
                            Ordered Dishes ({order.items?.length || 0})
                          </h4>
                          <div className="space-y-2 bg-paradise-maroon-950/60 border border-paradise-gold-900/50 p-3 rounded-2xl">
                            {order.items?.map((item: any, idx: number) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between text-xs py-1 border-b border-paradise-maroon-900/80 last:border-0"
                              >
                                <div className="flex items-center gap-2.5">
                                  {item.imageUrl && (
                                    <div className="w-8 h-8 rounded-lg overflow-hidden relative flex-shrink-0 border border-paradise-gold-800/60">
                                      <Image
                                        src={item.imageUrl}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                      />
                                    </div>
                                  )}
                                  <div>
                                    <span className="font-semibold text-white">{item.name}</span>
                                    <span className="text-[10px] text-paradise-gold-400/80 ml-1.5">
                                      ({item.portionType}) x {item.quantity}
                                    </span>
                                  </div>
                                </div>
                                <span className="font-bold text-paradise-gold-300">
                                  ₹{item.totalPrice || item.unitPrice * item.quantity}
                                </span>
                              </div>
                            ))}
                          </div>

                          {order.specialInstructions && (
                            <div className="text-[11px] text-amber-200 bg-amber-950/40 border border-amber-600/30 p-2 rounded-xl">
                              <strong>Chef Note:</strong> {order.specialInstructions}
                            </div>
                          )}
                        </div>

                        {/* Financials & Address Column */}
                        <div className="space-y-3 bg-paradise-maroon-950/60 border border-paradise-gold-900/50 p-3.5 rounded-2xl flex flex-col justify-between text-xs">
                          <div>
                            <h4 className="font-bold text-paradise-gold-400 uppercase tracking-wider mb-1.5">
                              Delivery Location
                            </h4>
                            <p className="text-white text-xs leading-relaxed">
                              {order.deliveryAddress?.street}
                              {order.deliveryAddress?.landmark ? `, ${order.deliveryAddress?.landmark}` : ''}
                              <br />
                              <span className="text-paradise-gold-300 font-semibold">
                                {order.deliveryAddress?.area}, {order.deliveryAddress?.city} - {order.deliveryAddress?.pincode}
                              </span>
                            </p>
                          </div>

                          <div className="pt-2 border-t border-paradise-maroon-900 space-y-1">
                            <div className="flex justify-between text-paradise-cream-200/70">
                              <span>Subtotal:</span>
                              <span>₹{order.totalAmount}</span>
                            </div>
                            <div className="flex justify-between text-paradise-cream-200/70">
                              <span>GST & Taxes:</span>
                              <span>₹{order.taxAmount || 0}</span>
                            </div>
                            <div className="flex justify-between text-paradise-cream-200/70">
                              <span>Delivery Fee:</span>
                              <span>{order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}</span>
                            </div>
                            <div className="flex justify-between font-black text-sm text-paradise-gold-300 pt-1 border-t border-paradise-gold-800/40">
                              <span>Total Amount:</span>
                              <span>₹{order.finalAmount || order.totalAmount}</span>
                            </div>
                            <div className="flex items-center justify-between text-[11px] pt-1">
                              <span className="text-paradise-gold-400/80 uppercase tracking-wider">
                                Payment:
                              </span>
                              <span className="font-bold uppercase text-white">
                                {order.paymentMethod} ({order.paymentStatus})
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Status Action Buttons Bar */}
                      <div className="pt-3 border-t border-paradise-gold-800/40 flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-bold text-paradise-gold-400">
                          Update Order Dispatch:
                        </span>

                        <div className="flex flex-wrap items-center gap-1.5">
                          <button
                            onClick={() =>
                              handleUpdateOrderStatus(order._id || order.orderNumber, 'preparing')
                            }
                            disabled={isUpdating || order.orderStatus === 'preparing'}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                              order.orderStatus === 'preparing'
                                ? 'bg-amber-500 text-paradise-maroon-950 border-amber-300 font-black shadow-sm'
                                : 'bg-paradise-maroon-950 hover:bg-amber-950/60 text-amber-300 border-amber-600/40'
                            }`}
                          >
                            👨‍🍳 Preparing
                          </button>

                          <button
                            onClick={() =>
                              handleUpdateOrderStatus(order._id || order.orderNumber, 'out_for_delivery')
                            }
                            disabled={isUpdating || order.orderStatus === 'out_for_delivery'}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                              order.orderStatus === 'out_for_delivery'
                                ? 'bg-purple-500 text-white border-purple-300 font-black shadow-sm'
                                : 'bg-paradise-maroon-950 hover:bg-purple-950/60 text-purple-300 border-purple-600/40'
                            }`}
                          >
                            🛵 Out for Delivery
                          </button>

                          <button
                            onClick={() =>
                              handleUpdateOrderStatus(order._id || order.orderNumber, 'delivered')
                            }
                            disabled={isUpdating || order.orderStatus === 'delivered'}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                              order.orderStatus === 'delivered'
                                ? 'bg-emerald-500 text-paradise-maroon-950 border-emerald-300 font-black shadow-sm'
                                : 'bg-paradise-maroon-950 hover:bg-emerald-950/60 text-emerald-300 border-emerald-600/40'
                            }`}
                          >
                            ✅ Delivered
                          </button>

                          <button
                            onClick={() =>
                              handleUpdateOrderStatus(order._id || order.orderNumber, 'cancelled')
                            }
                            disabled={isUpdating || order.orderStatus === 'cancelled'}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                              order.orderStatus === 'cancelled'
                                ? 'bg-red-500 text-white border-red-300 font-black'
                                : 'bg-paradise-maroon-950 hover:bg-red-950/60 text-red-300 border-red-600/40'
                            }`}
                          >
                            ❌ Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: TABLE RESERVATIONS MANAGEMENT                                      */}
        {/* ========================================================================= */}
        {activeTab === 'reservations' && (
          <section className="space-y-6">
            {/* Filter Pills & Search */}
            <div className="bg-paradise-maroon-900/80 border border-paradise-gold-700/40 rounded-2xl p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { key: 'all', label: 'All Reservations' },
                  { key: 'confirmed', label: 'Confirmed 📋' },
                  { key: 'seated', label: 'Seated 🪑' },
                  { key: 'completed', label: 'Completed ✅' },
                  { key: 'cancelled', label: 'Cancelled ❌' },
                ].map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setReservationFilter(f.key)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                      reservationFilter === f.key
                        ? 'bg-paradise-gold-400 text-paradise-maroon-950 border-paradise-gold-300 shadow-sm'
                        : 'bg-paradise-maroon-950/70 text-paradise-cream-200 hover:text-white border-paradise-maroon-800'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Reservation Search */}
              <div className="relative w-full lg:w-72">
                <Search className="w-4 h-4 text-paradise-gold-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={reservationSearch}
                  onChange={(e) => setReservationSearch(e.target.value)}
                  placeholder="Search booking #, guest name, phone..."
                  className="w-full bg-paradise-maroon-950 border border-paradise-gold-700/50 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-paradise-gold-400/50 focus:outline-none focus:border-paradise-gold-400"
                />
              </div>
            </div>

            {/* Reservations Listing */}
            {isLoadingReservations ? (
              <div className="py-16 text-center text-paradise-gold-300">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-paradise-gold-400" />
                <p>Loading table reservations...</p>
              </div>
            ) : filteredReservations.length === 0 ? (
              <div className="bg-paradise-maroon-900/40 border border-dashed border-paradise-gold-700/40 rounded-3xl p-12 text-center">
                <CalendarDays className="w-12 h-12 text-paradise-gold-400/50 mx-auto mb-3" />
                <h3 className="font-serif text-lg font-bold text-paradise-gold-300">
                  No table reservations found
                </h3>
                <p className="text-xs text-paradise-cream-200/60 mt-1">
                  Try adjusting the filter or search query.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredReservations.map((res) => {
                  const statusBadges: Record<string, { bg: string; text: string; border: string }> = {
                    confirmed: {
                      bg: 'bg-emerald-950/70',
                      text: 'text-emerald-300',
                      border: 'border-emerald-500/50',
                    },
                    seated: {
                      bg: 'bg-blue-950/70',
                      text: 'text-blue-300',
                      border: 'border-blue-500/50',
                    },
                    completed: {
                      bg: 'bg-paradise-gold-950/70',
                      text: 'text-paradise-gold-300',
                      border: 'border-paradise-gold-500/50',
                    },
                    cancelled: {
                      bg: 'bg-red-950/70',
                      text: 'text-red-300',
                      border: 'border-red-500/50',
                    },
                  };

                  const currentStyle = statusBadges[res.status] || statusBadges.confirmed;
                  const isUpdating = updatingResId === res._id || updatingResId === res.bookingNumber;

                  return (
                    <div
                      key={res._id || res.bookingNumber}
                      className="bg-paradise-maroon-900/90 border border-paradise-gold-700/40 rounded-3xl p-5 sm:p-6 shadow-royal-md hover:border-paradise-gold-500/60 transition-all flex flex-col justify-between space-y-4"
                    >
                      {/* Booking Card Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-paradise-gold-800/40">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm font-bold text-paradise-gold-300">
                              {res.bookingNumber}
                            </span>
                            <span
                              className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${currentStyle.bg} ${currentStyle.text} ${currentStyle.border}`}
                            >
                              {res.status}
                            </span>
                          </div>
                          <span className="text-[11px] text-paradise-cream-200/60">
                            Booked on {new Date(res.createdAt).toLocaleDateString('en-IN')}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 bg-paradise-gold-500/10 border border-paradise-gold-500/30 text-paradise-gold-300 px-3 py-1 rounded-xl text-xs font-bold">
                          <Users className="w-3.5 h-3.5" />
                          <span>{res.guestsCount} Guests</span>
                        </div>
                      </div>

                      {/* Guest and Venue Info */}
                      <div className="space-y-2 text-xs">
                        <div className="grid grid-cols-2 gap-2 bg-paradise-maroon-950/60 p-3 rounded-2xl border border-paradise-gold-900/50">
                          <div>
                            <span className="text-paradise-gold-400 font-semibold block text-[10px] uppercase">
                              Guest Name
                            </span>
                            <span className="font-bold text-white text-sm">{res.customerName}</span>
                          </div>
                          <div>
                            <span className="text-paradise-gold-400 font-semibold block text-[10px] uppercase">
                              Contact Phone
                            </span>
                            <a
                              href={`tel:${res.customerPhone}`}
                              className="font-bold text-paradise-gold-300 hover:underline flex items-center gap-1"
                            >
                              <Phone className="w-3 h-3" />
                              <span>{res.customerPhone}</span>
                            </a>
                          </div>
                        </div>

                        <div className="space-y-1.5 bg-paradise-maroon-950/40 p-3 rounded-2xl border border-paradise-maroon-800 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-paradise-cream-200/70">Outlet Location:</span>
                            <span className="font-bold text-paradise-gold-200">{res.outletName}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-paradise-cream-200/70">Date & Slot:</span>
                            <span className="font-bold text-white">
                              {res.reservationDate} at {res.timeSlot}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-paradise-cream-200/70">Seating Area:</span>
                            <span className="font-semibold text-paradise-gold-300">
                              {res.seatingPreference}
                            </span>
                          </div>
                          {res.occasion && (
                            <div className="flex items-center justify-between">
                              <span className="text-paradise-cream-200/70">Occasion:</span>
                              <span className="font-semibold text-amber-300">{res.occasion}</span>
                            </div>
                          )}
                        </div>

                        {res.specialRequests && (
                          <div className="text-[11px] text-amber-200 bg-amber-950/30 border border-amber-700/30 p-2.5 rounded-xl">
                            <strong>Special Request:</strong> {res.specialRequests}
                          </div>
                        )}
                      </div>

                      {/* Status Action Buttons */}
                      <div className="pt-3 border-t border-paradise-gold-800/40 flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-bold text-paradise-gold-400">
                          Table Action:
                        </span>

                        <div className="flex flex-wrap items-center gap-1.5">
                          <button
                            onClick={() =>
                              handleUpdateReservationStatus(res._id || res.bookingNumber, 'seated')
                            }
                            disabled={isUpdating || res.status === 'seated'}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                              res.status === 'seated'
                                ? 'bg-blue-500 text-white border-blue-300 font-black shadow-sm'
                                : 'bg-paradise-maroon-950 hover:bg-blue-950/60 text-blue-300 border-blue-600/40'
                            }`}
                          >
                            🪑 Seated
                          </button>

                          <button
                            onClick={() =>
                              handleUpdateReservationStatus(res._id || res.bookingNumber, 'completed')
                            }
                            disabled={isUpdating || res.status === 'completed'}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                              res.status === 'completed'
                                ? 'bg-emerald-500 text-paradise-maroon-950 border-emerald-300 font-black shadow-sm'
                                : 'bg-paradise-maroon-950 hover:bg-emerald-950/60 text-emerald-300 border-emerald-600/40'
                            }`}
                          >
                            ✅ Completed
                          </button>

                          <button
                            onClick={() =>
                              handleUpdateReservationStatus(res._id || res.bookingNumber, 'cancelled')
                            }
                            disabled={isUpdating || res.status === 'cancelled'}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                              res.status === 'cancelled'
                                ? 'bg-red-500 text-white border-red-300 font-black'
                                : 'bg-paradise-maroon-950 hover:bg-red-950/60 text-red-300 border-red-600/40'
                            }`}
                          >
                            ❌ Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
