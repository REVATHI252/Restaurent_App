import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Order from '@/models/Order';
import { verifyToken } from '@/lib/auth';
import { generateOrderNumber, calculateGST } from '@/lib/utils';
import { INITIAL_MENU_ITEMS } from '@/lib/mockData';
import { z } from 'zod';

import { getGlobalOrders, MockOrder } from '@/lib/adminData';

const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        id: z.string(),
        portionType: z.enum(['Single', 'Regular', 'Jumbo']),
        quantity: z.number().int().min(1),
      })
    )
    .min(1, 'Order must contain at least 1 item'),
  deliveryAddress: z.object({
    recipientName: z.string().min(1, 'Name is required'),
    recipientPhone: z.string().regex(/^[6-9]\d{9}$/, 'Valid 10-digit phone is required'),
    street: z.string().min(1, 'Street is required'),
    landmark: z.string().optional(),
    area: z.string().min(1, 'Area is required'),
    city: z.string().default('Hyderabad'),
    pincode: z.string().regex(/^[1-9][0-9]{5}$/, 'Valid 6-digit pincode is required'),
    label: z.enum(['Home', 'Work', 'Other']).default('Home'),
  }),
  paymentMethod: z.enum(['cod', 'upi', 'card', 'netbanking']).default('upi'),
  specialInstructions: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    let userId = 'direct-guest-' + Date.now();

    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = verifyToken(token);
      if (decoded) {
        userId = decoded.userId;
      }
    }

    const body = await req.json();
    const parseResult = createOrderSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, error: parseResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const { items: inputItems, deliveryAddress, paymentMethod, specialInstructions } = parseResult.data;

    const orderItems = [];
    let calculatedSubtotal = 0;

    for (const input of inputItems) {
      let foundName = 'Royal Dum Biryani';
      let foundPrice = 390;
      let foundImage = 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop&q=80';

      const mock = INITIAL_MENU_ITEMS.find((m) => m._id === input.id);
      if (mock) {
        foundName = mock.name;
        foundImage = mock.imageUrl;
        const opt = mock.portionOptions?.find((p) => p.type === input.portionType);
        foundPrice = opt ? opt.price : mock.price;
      }

      const itemTotal = foundPrice * input.quantity;
      calculatedSubtotal += itemTotal;

      orderItems.push({
        menuItem: input.id,
        name: foundName,
        quantity: input.quantity,
        unitPrice: foundPrice,
        portionType: input.portionType,
        totalPrice: itemTotal,
        imageUrl: foundImage,
      });
    }

    const taxAmount = calculateGST(calculatedSubtotal);
    const deliveryFee = calculatedSubtotal > 500 ? 0 : 50;
    const finalAmount = calculatedSubtotal + taxAmount + deliveryFee;
    const orderNumber = generateOrderNumber();

    const orderData: any = {
      _id: 'order-' + Date.now(),
      orderNumber,
      user: userId,
      items: orderItems,
      totalAmount: calculatedSubtotal,
      discountAmount: 0,
      taxAmount,
      deliveryFee,
      finalAmount,
      deliveryAddress,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      orderStatus: 'received',
      specialInstructions,
      createdAt: new Date().toISOString(),
      statusHistory: [
        {
          status: 'received',
          timestamp: new Date().toISOString(),
          note: 'Direct order placed successfully with Paradise Food Court.',
        },
      ],
    };

    getGlobalOrders().unshift(orderData);

    try {
      await connectToDatabase();
      const dbOrder = await Order.create(orderData);
      return NextResponse.json({ success: true, order: dbOrder }, { status: 201 });
    } catch (dbErr) {
      return NextResponse.json({ success: true, order: orderData }, { status: 201 });
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to place order' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    let userId: string | null = null;
    let isAdmin = false;

    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = verifyToken(token);
      if (decoded) {
        userId = decoded.userId;
        isAdmin = decoded.role === 'admin';
      }
    }

    const { searchParams } = new URL(req.url);
    const isAdminView = searchParams.get('admin') === 'true' || isAdmin;

    try {
      await connectToDatabase();
      let orders;
      if (isAdminView) {
        orders = await Order.find({}).sort({ createdAt: -1 }).limit(50);
      } else if (userId) {
        orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
      } else {
        orders = await Order.find({}).sort({ createdAt: -1 }).limit(10);
      }
      if (orders && orders.length > 0) {
        return NextResponse.json({ success: true, count: orders.length, orders });
      }
    } catch (dbErr) {
      // Use in-memory global orders
    }

    let result = getGlobalOrders();
    if (!isAdminView && userId) {
      result = result.filter((o) => o.user === userId);
    }
    return NextResponse.json({ success: true, count: result.length, orders: result });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
