import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Order from '@/models/Order';
import { verifyToken } from '@/lib/auth';
import { updateGlobalOrderStatus } from '@/lib/adminData';
import { z } from 'zod';

const statusUpdateSchema = z.object({
  status: z.enum(['received', 'preparing', 'out_for_delivery', 'delivered', 'cancelled']),
  note: z.string().optional(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Admin access required' }, { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();
    const parseResult = statusUpdateSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, error: parseResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const { status, note } = parseResult.data;

    // Update in-memory fallback first
    const memoryOrder = updateGlobalOrderStatus(id, status, note);

    try {
      await connectToDatabase();
      const order = await Order.findById(id);
      if (order) {
        order.orderStatus = status;
        order.statusHistory.push({
          status,
          timestamp: new Date(),
          note: note || `Order status updated to ${status.replace('_', ' ')}`,
        });
        if (status === 'delivered') {
          order.paymentStatus = 'paid';
        }
        await order.save();
        return NextResponse.json({ success: true, order });
      }
    } catch (dbErr) {
      console.warn('DB update failed, using in-memory order update', dbErr);
    }

    if (memoryOrder) {
      return NextResponse.json({ success: true, order: memoryOrder });
    }

    return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
