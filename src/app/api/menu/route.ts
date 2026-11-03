import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import MenuItem from '@/models/MenuItem';
import Category from '@/models/Category';
import { verifyToken } from '@/lib/auth';
import { INITIAL_MENU_ITEMS } from '@/lib/mockData';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const categorySlug = searchParams.get('category');
  const isVeg = searchParams.get('isVeg');
  const isBestseller = searchParams.get('isBestseller');
  const query = searchParams.get('q');

  try {
    await connectToDatabase();

    const filter: any = { isAvailable: true };

    if (categorySlug && categorySlug !== 'all') {
      const categoryDoc = await Category.findOne({ slug: categorySlug });
      if (categoryDoc) {
        filter.category = categoryDoc._id;
      }
    }

    if (isVeg !== null && isVeg !== undefined && isVeg !== '') {
      filter.isVeg = isVeg === 'true';
    }

    if (isBestseller === 'true') {
      filter.isBestseller = true;
    }

    if (query) {
      const terms = query.trim().split(/\s+/);
      const regexArray = terms.map((t) => new RegExp(t, 'i'));

      filter.$or = [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { tags: { $in: regexArray } },
      ];
    }

    const items = await MenuItem.find(filter)
      .populate('category', 'name slug')
      .sort({ isBestseller: -1, price: 1 });

    if (items && items.length > 0) {
      return NextResponse.json({ success: true, count: items.length, items });
    }
  } catch (error: any) {
    // Fallback gracefully
  }

  // Graceful in-memory fallback with multi-word token search
  let filtered = [...INITIAL_MENU_ITEMS];

  if (categorySlug && categorySlug !== 'all') {
    filtered = filtered.filter(
      (i) => typeof i.category === 'object' && (i.category as any).slug === categorySlug
    );
  }

  if (isVeg !== null && isVeg !== undefined && isVeg !== '') {
    const isVegBool = isVeg === 'true';
    filtered = filtered.filter((i) => i.isVeg === isVegBool);
  }

  if (isBestseller === 'true') {
    filtered = filtered.filter((i) => i.isBestseller);
  }

  if (query && query.trim()) {
    const qLower = query.toLowerCase().trim();
    const queryTokens = qLower.split(/\s+/).filter(Boolean);

    filtered = filtered.filter((item) => {
      const name = item.name.toLowerCase();
      const desc = item.description.toLowerCase();
      const tags = (item.tags || []).join(' ').toLowerCase();
      const catName = typeof item.category === 'object' ? (item.category as any).name?.toLowerCase() : '';
      const combined = `${name} ${desc} ${tags} ${catName}`;

      // Item matches if ANY of the search words match or whole phrase matches
      return queryTokens.some((token) => combined.includes(token));
    });
  }

  return NextResponse.json({ success: true, count: filtered.length, items: filtered });
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Forbidden: Admin access required' },
        { status: 403 }
      );
    }

    const body = await req.json();
    await connectToDatabase();

    const newItem = await MenuItem.create(body);
    return NextResponse.json({ success: true, item: newItem }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create menu item' },
      { status: 500 }
    );
  }
}
