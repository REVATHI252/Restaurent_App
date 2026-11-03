export interface MockOrderItem {
  menuItem: string;
  name: string;
  quantity: number;
  unitPrice: number;
  portionType: 'Single' | 'Regular' | 'Jumbo';
  totalPrice: number;
  imageUrl: string;
}

export interface MockOrder {
  _id: string;
  orderNumber: string;
  user: string;
  items: MockOrderItem[];
  totalAmount: number;
  discountAmount: number;
  taxAmount: number;
  deliveryFee: number;
  finalAmount: number;
  deliveryAddress: {
    recipientName: string;
    recipientPhone: string;
    street: string;
    landmark?: string;
    area: string;
    city: string;
    pincode: string;
    label: 'Home' | 'Work' | 'Other';
  };
  paymentMethod: 'cod' | 'upi' | 'card' | 'netbanking';
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderStatus: 'received' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  specialInstructions?: string;
  createdAt: string;
  statusHistory: Array<{
    status: string;
    timestamp: string;
    note: string;
  }>;
}

export interface MockReservation {
  _id: string;
  bookingNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  outletName: string;
  reservationDate: string;
  timeSlot: string;
  guestsCount: number;
  seatingPreference: 'Royal AC Dining' | 'Heritage Family Lounge' | 'VIP Private Dining' | 'Terrace View';
  occasion?: string;
  specialRequests?: string;
  status: 'confirmed' | 'seated' | 'cancelled' | 'completed';
  createdAt: string;
}

// Global in-memory storage (preserved during server session)
declare global {
  var __PARADISE_ORDERS__: MockOrder[] | undefined;
  var __PARADISE_RESERVATIONS__: MockReservation[] | undefined;
}

export function getGlobalOrders(): MockOrder[] {
  if (!global.__PARADISE_ORDERS__ || global.__PARADISE_ORDERS__.length === 0) {
    global.__PARADISE_ORDERS__ = [
      {
        _id: 'order-live-101',
        orderNumber: 'PAR-202610-8891',
        user: 'user-vikram-1',
        items: [
          {
            menuItem: 'item-nv-3',
            name: 'Grand Shahi Mutton Dum Biryani (Prime Shanks)',
            quantity: 1,
            unitPrice: 490,
            portionType: 'Regular',
            totalPrice: 490,
            imageUrl: '/images/shahi-mutton-biryani.jpg',
          },
          {
            menuItem: 'item-nv-1',
            name: 'Nizami Stuffed Tangdi Kebab (3 Pcs)',
            quantity: 1,
            unitPrice: 380,
            portionType: 'Regular',
            totalPrice: 380,
            imageUrl: '/images/tangdi-kebab.jpg',
          },
          {
            menuItem: 'item-8d',
            name: 'Royal Hyderabadi Shahi Gulab Falooda',
            quantity: 2,
            unitPrice: 160,
            portionType: 'Regular',
            totalPrice: 320,
            imageUrl: '/images/shahi-falooda.jpg',
          },
        ],
        totalAmount: 1190,
        discountAmount: 0,
        taxAmount: 59.5,
        deliveryFee: 0,
        finalAmount: 1249.5,
        deliveryAddress: {
          recipientName: 'Vikramaditya Rao',
          recipientPhone: '9849012345',
          street: 'Villa 14, Rd No 36',
          landmark: 'Near Jubilee Hills Checkpost',
          area: 'Jubilee Hills',
          city: 'Hyderabad',
          pincode: '500033',
          label: 'Home',
        },
        paymentMethod: 'upi',
        paymentStatus: 'paid',
        orderStatus: 'preparing',
        specialInstructions: 'Extra spicy salan and double fried onions please.',
        createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
        statusHistory: [
          {
            status: 'received',
            timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
            note: 'Order confirmed and verified via UPI.',
          },
          {
            status: 'preparing',
            timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
            note: 'Head Chef is preparing fresh dum handi in Secunderabad kitchen.',
          },
        ],
      },
      {
        _id: 'order-live-102',
        orderNumber: 'PAR-202610-8892',
        user: 'user-ayesha-2',
        items: [
          {
            menuItem: 'item-nv-4',
            name: 'Royal Murgh Malai Tikka Dum Biryani',
            quantity: 1,
            unitPrice: 890,
            portionType: 'Jumbo',
            totalPrice: 890,
            imageUrl: '/images/murgh-malai-biryani.jpg',
          },
          {
            menuItem: 'item-v-3',
            name: 'Shahi Malai Kofta (Nizami White Gravy)',
            quantity: 1,
            unitPrice: 320,
            portionType: 'Regular',
            totalPrice: 320,
            imageUrl: '/images/shahi-malai-kofta.png',
          },
          {
            menuItem: 'item-7e',
            name: 'Butter Garlic Naan (2 Pcs)',
            quantity: 2,
            unitPrice: 90,
            portionType: 'Regular',
            totalPrice: 180,
            imageUrl: '/images/garlic-naan.jpg',
          },
          {
            menuItem: 'item-8c',
            name: 'Warm Gulab Jamun with Kesar Rabri (2 Pcs)',
            quantity: 2,
            unitPrice: 150,
            portionType: 'Regular',
            totalPrice: 300,
            imageUrl: '/images/gulab-jamun-rabri.png',
          },
        ],
        totalAmount: 1690,
        discountAmount: 0,
        taxAmount: 84.5,
        deliveryFee: 0,
        finalAmount: 1774.5,
        deliveryAddress: {
          recipientName: 'Ayesha Khan',
          recipientPhone: '9988776655',
          street: 'Flat 402, Royal Palms',
          landmark: 'Opposite City Center Mall',
          area: 'Banjara Hills Rd 10',
          city: 'Hyderabad',
          pincode: '500034',
          label: 'Home',
        },
        paymentMethod: 'card',
        paymentStatus: 'paid',
        orderStatus: 'out_for_delivery',
        specialInstructions: 'Please ring the doorbell softly.',
        createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        statusHistory: [
          {
            status: 'received',
            timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
            note: 'Payment received via credit card.',
          },
          {
            status: 'preparing',
            timestamp: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
            note: 'Kitchen dispatched food to royal packing unit.',
          },
          {
            status: 'out_for_delivery',
            timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
            note: 'Rider Mohammed is out for delivery on insulated bike.',
          },
        ],
      },
      {
        _id: 'order-live-103',
        orderNumber: 'PAR-202610-8893',
        user: 'user-suresh-3',
        items: [
          {
            menuItem: 'item-7g',
            name: 'Kadai Murgh Lazeez (Boneless)',
            quantity: 1,
            unitPrice: 350,
            portionType: 'Regular',
            totalPrice: 350,
            imageUrl: '/images/kadai-murgh-lazeez.jpg',
          },
          {
            menuItem: 'item-7j',
            name: 'Tandoori Butter Roti (3 Pcs)',
            quantity: 2,
            unitPrice: 60,
            portionType: 'Regular',
            totalPrice: 120,
            imageUrl: '/images/tandoori-roti.jpg',
          },
          {
            menuItem: 'item-v-5',
            name: 'Royal Zafrani Badam Milk Shake (Chilled Saffron)',
            quantity: 2,
            unitPrice: 140,
            portionType: 'Regular',
            totalPrice: 280,
            imageUrl: '/images/zafrani-badam-shake.jpg',
          },
        ],
        totalAmount: 750,
        discountAmount: 0,
        taxAmount: 37.5,
        deliveryFee: 0,
        finalAmount: 787.5,
        deliveryAddress: {
          recipientName: 'Suresh Reddy',
          recipientPhone: '9876543210',
          street: 'Plot 89, Tech Enclave',
          landmark: 'Near Inorbit Mall',
          area: 'Madhapur / Hitec City',
          city: 'Hyderabad',
          pincode: '500081',
          label: 'Work',
        },
        paymentMethod: 'cod',
        paymentStatus: 'pending',
        orderStatus: 'received',
        specialInstructions: 'Keep extra paper napkins and cutlery.',
        createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        statusHistory: [
          {
            status: 'received',
            timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
            note: 'Cash on delivery order received and pending kitchen acceptance.',
          },
        ],
      },
      {
        _id: 'order-live-104',
        orderNumber: 'PAR-202610-8894',
        user: 'user-priya-4',
        items: [
          {
            menuItem: 'item-3e',
            name: 'Royal Shahi Paneer Dum Biryani',
            quantity: 1,
            unitPrice: 350,
            portionType: 'Regular',
            totalPrice: 350,
            imageUrl: '/images/paneer-biryani.jpg',
          },
          {
            menuItem: 'item-7i',
            name: 'Dal Makhani (Slow Dum Bukhara Style)',
            quantity: 1,
            unitPrice: 270,
            portionType: 'Regular',
            totalPrice: 270,
            imageUrl: '/images/dal-makhani.jpg',
          },
          {
            menuItem: 'item-8b',
            name: 'Double-ka-Meetha (Shahi Tukda with Rabri)',
            quantity: 2,
            unitPrice: 170,
            portionType: 'Regular',
            totalPrice: 340,
            imageUrl: '/images/double-ka-meetha.jpg',
          },
        ],
        totalAmount: 960,
        discountAmount: 0,
        taxAmount: 48,
        deliveryFee: 0,
        finalAmount: 1008,
        deliveryAddress: {
          recipientName: 'Priya Sharma',
          recipientPhone: '9123456780',
          street: 'Tower B, Cyber Gateway',
          landmark: 'Financial District',
          area: 'Gachibowli',
          city: 'Hyderabad',
          pincode: '500032',
          label: 'Home',
        },
        paymentMethod: 'upi',
        paymentStatus: 'paid',
        orderStatus: 'delivered',
        createdAt: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
        statusHistory: [
          {
            status: 'received',
            timestamp: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
            note: 'Order confirmed.',
          },
          {
            status: 'preparing',
            timestamp: new Date(Date.now() - 100 * 60 * 1000).toISOString(),
            note: 'Food cooked in dum pot.',
          },
          {
            status: 'out_for_delivery',
            timestamp: new Date(Date.now() - 75 * 60 * 1000).toISOString(),
            note: 'Rider dispatched.',
          },
          {
            status: 'delivered',
            timestamp: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
            note: 'Delivered hot to customer.',
          },
        ],
      },
    ];
  }
  return global.__PARADISE_ORDERS__;
}

export function getGlobalReservations(): MockReservation[] {
  if (!global.__PARADISE_RESERVATIONS__ || global.__PARADISE_RESERVATIONS__.length === 0) {
    global.__PARADISE_RESERVATIONS__ = [
      {
        _id: 'res-live-201',
        bookingNumber: 'PAR-RES-87AB',
        customerName: 'Dr. Arvind Varma',
        customerEmail: 'arvind.varma@gmail.com',
        customerPhone: '9848011223',
        outletName: 'Secunderabad (Flagship)',
        reservationDate: new Date().toISOString().split('T')[0],
        timeSlot: '08:30 PM',
        guestsCount: 6,
        seatingPreference: 'VIP Private Dining',
        occasion: '25th Wedding Anniversary',
        specialRequests: 'Saffron welcome drinks and quiet corner floral table setup.',
        status: 'confirmed',
        createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
      },
      {
        _id: 'res-live-202',
        bookingNumber: 'PAR-RES-45KL',
        customerName: 'Fatima Begum',
        customerEmail: 'fatima.begum@yahoo.com',
        customerPhone: '9876123450',
        outletName: 'Hitec City / Madhapur',
        reservationDate: new Date().toISOString().split('T')[0],
        timeSlot: '07:45 PM',
        guestsCount: 4,
        seatingPreference: 'Heritage Family Lounge',
        occasion: 'Family Reunion',
        specialRequests: 'Baby high chair and mild non-spicy biryani options.',
        status: 'seated',
        createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
      },
      {
        _id: 'res-live-203',
        bookingNumber: 'PAR-RES-99ZZ',
        customerName: 'Rajesh Chandra',
        customerEmail: 'rajesh.chandra@corp.in',
        customerPhone: '9955443322',
        outletName: 'Gachibowli',
        reservationDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        timeSlot: '01:30 PM',
        guestsCount: 10,
        seatingPreference: 'VIP Private Dining',
        occasion: 'Executive Corporate Lunch',
        specialRequests: 'Full 5-course Nizami degustation menu with live kebab service.',
        status: 'confirmed',
        createdAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
      },
      {
        _id: 'res-live-204',
        bookingNumber: 'PAR-RES-12GH',
        customerName: 'Sneha Mukherjee',
        customerEmail: 'sneha.m@outlook.com',
        customerPhone: '9123498765',
        outletName: 'Begumpet',
        reservationDate: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        timeSlot: '08:00 PM',
        guestsCount: 2,
        seatingPreference: 'Terrace View',
        occasion: 'Birthday Dinner',
        specialRequests: 'Complimentary dessert candle presentation.',
        status: 'completed',
        createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
      },
    ];
  }
  return global.__PARADISE_RESERVATIONS__;
}

export function updateGlobalOrderStatus(id: string, status: MockOrder['orderStatus'], note?: string): MockOrder | null {
  const orders = getGlobalOrders();
  const order = orders.find((o) => o._id === id || o.orderNumber === id);
  if (!order) return null;

  order.orderStatus = status;
  if (status === 'delivered') {
    order.paymentStatus = 'paid';
  }
  order.statusHistory.push({
    status,
    timestamp: new Date().toISOString(),
    note: note || `Order updated to ${status.replace('_', ' ')} by Admin`,
  });
  return order;
}

export function updateGlobalReservationStatus(
  id: string,
  status: MockReservation['status']
): MockReservation | null {
  const reservations = getGlobalReservations();
  const res = reservations.find((r) => r._id === id || r.bookingNumber === id);
  if (!res) return null;

  res.status = status;
  return res;
}
