import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Outlet from '@/models/Outlet';
import { INITIAL_OUTLETS } from '@/lib/mockData';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');
  const city = searchParams.get('city') || 'Hyderabad';

  try {
    await connectToDatabase();

    const filter: any = { isActive: true, city };

    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: 'i' } },
        { area: { $regex: query, $options: 'i' } },
        { address: { $regex: query, $options: 'i' } },
      ];
    }

    const outlets = await Outlet.find(filter).sort({ isFlagship: -1, area: 1 });
    if (outlets && outlets.length > 0) {
      return NextResponse.json({ success: true, count: outlets.length, outlets });
    }
  } catch (error: any) {
    console.warn('MongoDB query bypassed or failed, using fallback outlets:', error.message);
  }

  // Fallback
  let filtered = [...INITIAL_OUTLETS];
  if (query) {
    const qLower = query.toLowerCase();
    filtered = filtered.filter(
      (o) =>
        o.name.toLowerCase().includes(qLower) ||
        o.area.toLowerCase().includes(qLower) ||
        o.address.toLowerCase().includes(qLower)
    );
  }

  return NextResponse.json({ success: true, count: filtered.length, outlets: filtered });
}
