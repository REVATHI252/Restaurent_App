import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Reservation from '@/models/Reservation';
import { getGlobalReservations, MockReservation } from '@/lib/adminData';
import { verifyToken } from '@/lib/auth';
import { z } from 'zod';

const reservationSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerEmail: z.string().email('Valid email is required').optional().or(z.literal('')),
  customerPhone: z.string().regex(/^[6-9]\d{9}$/, 'Valid 10-digit Indian phone number is required'),
  outletName: z.string().default('Secunderabad (Flagship)'),
  reservationDate: z.string().min(1, 'Date is required'),
  timeSlot: z.string().min(1, 'Time slot is required'),
  guestsCount: z.number().int().min(1).max(50),
  seatingPreference: z.enum(['Royal AC Dining', 'Heritage Family Lounge', 'VIP Private Dining', 'Terrace View']).default('Royal AC Dining'),
  occasion: z.string().optional(),
  specialRequests: z.string().optional(),
});

function generateBookingNumber(): string {
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `PAR-RES-${rand}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = reservationSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, error: parseResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const data = parseResult.data;
    const bookingNumber = generateBookingNumber();

    const reservationData: any = {
      _id: 'res-' + Date.now(),
      bookingNumber,
      ...data,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    getGlobalReservations().unshift(reservationData);

    try {
      await connectToDatabase();
      const dbReservation = await Reservation.create(reservationData);
      return NextResponse.json(
        {
          success: true,
          message: 'Table reserved successfully at Paradise Food Court!',
          reservation: dbReservation,
        },
        { status: 201 }
      );
    } catch (dbErr) {
      return NextResponse.json(
        {
          success: true,
          message: 'Table reserved successfully at Paradise Food Court!',
          reservation: reservationData,
        },
        { status: 201 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to book reservation' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const phone = searchParams.get('phone');
  const isAdmin = searchParams.get('admin') === 'true';

  const authHeader = req.headers.get('authorization');
  let isAuthAdmin = false;
  if (authHeader?.startsWith('Bearer ')) {
    const decoded = verifyToken(authHeader.split(' ')[1]);
    if (decoded?.role === 'admin') isAuthAdmin = true;
  }

  try {
    try {
      await connectToDatabase();
      const filter: any = {};
      if (phone) filter.customerPhone = phone;
      const reservations = await Reservation.find(filter).sort({ createdAt: -1 }).limit(50);
      if (reservations && reservations.length > 0) {
        return NextResponse.json({ success: true, count: reservations.length, reservations });
      }
    } catch (dbErr) {
      // Fallback
    }

    let result = getGlobalReservations();
    if (phone) {
      result = result.filter((r) => r.customerPhone === phone);
    }
    return NextResponse.json({ success: true, count: result.length, reservations: result });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to retrieve reservations' },
      { status: 500 }
    );
  }
}
