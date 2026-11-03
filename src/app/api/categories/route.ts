import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Category from '@/models/Category';
import { INITIAL_CATEGORIES } from '@/lib/mockData';

export async function GET() {
  try {
    await connectToDatabase();
    const categories = await Category.find({ isActive: true }).sort({ displayOrder: 1 });
    if (categories && categories.length > 0) {
      return NextResponse.json({ success: true, categories });
    }
  } catch (error: any) {
    console.warn('MongoDB categories bypassed, using fallback:', error.message);
  }

  return NextResponse.json({ success: true, categories: INITIAL_CATEGORIES });
}
