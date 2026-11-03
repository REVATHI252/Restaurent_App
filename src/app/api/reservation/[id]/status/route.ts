import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Reservation from '@/models/Reservation';
import { verifyToken } from '@/lib/auth';
import { updateGlobalReservationStatus } from '@/lib/adminData';
import { z } from 'zod';

const statusUpdateSchema = z.object({
  status: z.enum(['confirmed', 'seated', 'completed', 'cancelled']),
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

    const { status } = parseResult.data;

    // Update memory reservation
    const memoryRes = updateGlobalReservationStatus(id, status);

    try {
      await connectToDatabase();
      const reservation = await Reservation.findById(id);
      if (reservation) {
        reservation.status = status;
        await reservation.save();
        return NextResponse.json({ success: true, reservation });
      }
    } catch (dbErr) {
      console.warn('DB reservation update fallback:', dbErr);
    }

    if (memoryRes) {
      return NextResponse.json({ success: true, reservation: memoryRes });
    }

    return NextResponse.json({ success: false, error: 'Reservation not found' }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
