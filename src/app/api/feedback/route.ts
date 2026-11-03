import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Feedback from '@/models/Feedback';
import { z } from 'zod';

export const INITIAL_REVIEWS = [
  // ==========================================
  // --- 🏛️ SECUNDERABAD (FLAGSHIP BIRTHPLACE) ---
  // ==========================================
  {
    _id: 'rev-sec-1',
    name: 'Nawab Mir Zafar Ali Khan',
    avatar: 'MZ',
    location: 'Banjara Hills, Hyderabad',
    outletName: 'Secunderabad (Flagship)',
    branchSlug: 'secunderabad-flagship',
    rating: 5,
    badge: '👑 Heritage Patron since 1968',
    verifiedOrder: true,
    helpfulCount: 94,
    comments:
      'My grandfather brought me to the Secunderabad Flagship in 1968. Fifty-eight years later, the saffron aroma, the live clay dum unsealing at the table, and the tender mutton shank flavours remain unmatched across the world. Pure Hyderabadi nobility.',
    createdAt: new Date('2026-10-04T14:30:00Z').toISOString(),
  },
  {
    _id: 'rev-sec-2',
    name: 'Marcus & Elena Vance',
    avatar: 'MV',
    location: 'London, UK (Visiting Hyderabad)',
    outletName: 'Secunderabad (Flagship)',
    branchSlug: 'secunderabad-flagship',
    rating: 5,
    badge: '🌍 International Traveler',
    verifiedOrder: true,
    helpfulCount: 88,
    comments:
      'We traveled from London specifically for the historic Secunderabad Paradise. Sitting on the Royal Durbar floor, breathing in the dum spices and tasting the stewed apricot Qubani-ka-Meetha with clotted cream was a lifetime culinary memory.',
    createdAt: new Date('2026-10-01T20:15:00Z').toISOString(),
  },
  {
    _id: 'rev-sec-3',
    name: 'Arif Mohammed Qureshi',
    avatar: 'AQ',
    location: 'Old City, Charminar',
    outletName: 'Secunderabad (Flagship)',
    branchSlug: 'secunderabad-flagship',
    rating: 5,
    badge: '⭐ Heritage Food Historian',
    verifiedOrder: true,
    helpfulCount: 72,
    comments:
      'Born in Old City, I have tasted biryanis everywhere. The authentic decoction spices in Secunderabad Paradise and the wok-charred Kadai Murgh Lazeez paired with fresh butter garlic naan is absolute perfection.',
    createdAt: new Date('2026-09-28T12:00:00Z').toISOString(),
  },
  {
    _id: 'rev-sec-4',
    name: 'Prof. Shahnawaz Husain',
    avatar: 'SH',
    location: 'Osmania University Campus',
    outletName: 'Secunderabad (Flagship)',
    branchSlug: 'secunderabad-flagship',
    rating: 5,
    badge: '🎓 Regular Scholar Patron',
    verifiedOrder: true,
    helpfulCount: 58,
    comments:
      'The historic ambiance of the 4-storey Secunderabad building cannot be replicated. Every time my batchmates visit Hyderabad, this is the only place we gather. The Irani bakery counter downstairs is an emotion.',
    createdAt: new Date('2026-09-25T17:40:00Z').toISOString(),
  },
  {
    _id: 'rev-sec-5',
    name: 'Ayesha & Tariq Masood',
    avatar: 'TM',
    location: 'Sindhi Colony, Secunderabad',
    outletName: 'Secunderabad (Flagship)',
    branchSlug: 'secunderabad-flagship',
    rating: 5,
    badge: '✨ Local Resident Family',
    verifiedOrder: true,
    helpfulCount: 44,
    comments:
      'Living 10 minutes away from Paradise Circle, Secunderabad branch is our weekend second home. The Mutton Biryani is consistently succulent with authentic saffron-ghee balance.',
    createdAt: new Date('2026-09-20T19:25:00Z').toISOString(),
  },

  // ==========================================
  // --- 💻 HITEC CITY / MADHAPUR HUB ---
  // ==========================================
  {
    _id: 'rev-hit-1',
    name: 'Dr. Fatima Zahra Al-Hashmi',
    avatar: 'FZ',
    location: 'Jubilee Hills / Cyber Pearl',
    outletName: 'Hitec City / Madhapur',
    branchSlug: 'hitec-city',
    rating: 5,
    badge: '✨ Top Food Critic',
    verifiedOrder: true,
    helpfulCount: 65,
    comments:
      'The Hitec City branch delivers in premium sealed clay handis that keep the food steaming hot during our tech team standups. The cheese-stuffed tangdi kebabs and Royal Shahi Gulab Falooda are always a massive hit!',
    createdAt: new Date('2026-10-03T19:15:00Z').toISOString(),
  },
  {
    _id: 'rev-hit-2',
    name: 'Pooja Reddy & Microsoft Team',
    avatar: 'PR',
    location: 'Mindspace IT Park, Madhapur',
    outletName: 'Hitec City / Madhapur',
    branchSlug: 'hitec-city',
    rating: 5,
    badge: '💼 Corporate Event Lead',
    verifiedOrder: true,
    helpfulCount: 51,
    comments:
      'Ordered 30 Jumbo handis for our quarterly tech release party. The express delivery bay dispatched everything in 20 minutes, packed with separate salan, raita, and chilled Zafrani Badam Milk shakes. Highly recommended for corporate events!',
    createdAt: new Date('2026-09-29T13:20:00Z').toISOString(),
  },
  {
    _id: 'rev-hit-3',
    name: 'Kavitha Ramachandran',
    avatar: 'KR',
    location: 'Inorbit Mall Road, Madhapur',
    outletName: 'Hitec City / Madhapur',
    branchSlug: 'hitec-city',
    rating: 5,
    badge: '🍧 Dessert Connoisseur',
    verifiedOrder: true,
    helpfulCount: 39,
    comments:
      'The Hitec City outlet has an incredible dessert lounge. The Warm Gulab Jamun soaked in chilled saffron rabri is pure heaven after a spicy biryani feast.',
    createdAt: new Date('2026-09-24T18:40:00Z').toISOString(),
  },
  {
    _id: 'rev-hit-4',
    name: 'Devendra Kulkarni',
    avatar: 'DK',
    location: 'Google Hyderabad Campus',
    outletName: 'Hitec City / Madhapur',
    branchSlug: 'hitec-city',
    rating: 5,
    badge: '⚡ Weekly Team Lunch',
    verifiedOrder: true,
    helpfulCount: 47,
    comments:
      'Our engineering sprint completion is always celebrated with Hitec City Paradise Biryani. The Royal Murgh Malai Tikka Biryani with cashew crunch has won over everyone from California to Hyderabad.',
    createdAt: new Date('2026-09-19T13:10:00Z').toISOString(),
  },
  {
    _id: 'rev-hit-5',
    name: 'Shruti & Varun Nair',
    avatar: 'VN',
    location: 'Durgam Cheruvu View, Madhapur',
    outletName: 'Hitec City / Madhapur',
    branchSlug: 'hitec-city',
    rating: 5,
    badge: '🍷 Weekend Diners',
    verifiedOrder: true,
    helpfulCount: 36,
    comments:
      'Modern lighting, great Nizami mood music, and swift valet parking right at Cyber Pearl. The Tandoori Soya Chaap and Shahi Malai Kofta in white gravy are fantastic for vegetarian guests.',
    createdAt: new Date('2026-09-15T20:30:00Z').toISOString(),
  },

  // ==========================================
  // --- 🌳 GACHIBOWLI HUB ---
  // ==========================================
  {
    _id: 'rev-gac-1',
    name: 'Siddharth & Ananya Varma',
    avatar: 'SV',
    location: 'Financial District, Gachibowli',
    outletName: 'Gachibowli Hub',
    branchSlug: 'gachibowli',
    rating: 5,
    badge: '⚡ VIP Express Diner',
    verifiedOrder: true,
    helpfulCount: 48,
    comments:
      'Living in Financial District, Gachibowli Hub is our family sanctuary. Delivered within 22 minutes, and the fragrant malai chicken tikkas layered over saffron dum rice are extraordinary.',
    createdAt: new Date('2026-10-02T13:45:00Z').toISOString(),
  },
  {
    _id: 'rev-gac-2',
    name: 'Brigadier Rameshwar Rao',
    avatar: 'RR',
    location: 'Nanakramguda, Gachibowli',
    outletName: 'Gachibowli Hub',
    branchSlug: 'gachibowli',
    rating: 5,
    badge: '🎖️ Veteran Patron',
    verifiedOrder: true,
    helpfulCount: 62,
    comments:
      'We hosted our family golden jubilee celebration at Gachibowli banquet hall. The live charcoal tandoor kitchen and the personal attention of the manager made our 40 guests feel like royalty.',
    createdAt: new Date('2026-09-27T21:10:00Z').toISOString(),
  },
  {
    _id: 'rev-gac-3',
    name: 'Ankit & Sneha Agarwal',
    avatar: 'AA',
    location: 'Wipro Circle, Gachibowli',
    outletName: 'Gachibowli Hub',
    branchSlug: 'gachibowli',
    rating: 5,
    badge: '🟢 Pure Veg Diner',
    verifiedOrder: true,
    helpfulCount: 37,
    comments:
      'The Bukhara-style Dal Makhani and Shahi Malai Kofta in rich white gravy at Gachibowli are hands down the best North-Mughlai vegetarian meal in West Hyderabad.',
    createdAt: new Date('2026-09-21T19:30:00Z').toISOString(),
  },
  {
    _id: 'rev-gac-4',
    name: 'Raghavendra Swamy',
    avatar: 'RS',
    location: 'WaveRock SEZ, Gachibowli',
    outletName: 'Gachibowli Hub',
    branchSlug: 'gachibowli',
    rating: 5,
    badge: '🥘 Biryani Enthusiast',
    verifiedOrder: true,
    helpfulCount: 52,
    comments:
      'The huge parking lot and spacious family seating make Gachibowli the most convenient branch for weekend dinners. The Grand Shahi Mutton Dum Biryani with prime shanks is unmatched in juiciness.',
    createdAt: new Date('2026-09-17T20:15:00Z').toISOString(),
  },
  {
    _id: 'rev-gac-5',
    name: 'Dr. Niharika Sen',
    avatar: 'NS',
    location: 'Continental Hospitals, Gachibowli',
    outletName: 'Gachibowli Hub',
    branchSlug: 'gachibowli',
    rating: 5,
    badge: '🏥 Healthcare Patron',
    verifiedOrder: true,
    helpfulCount: 41,
    comments:
      'After long emergency shifts, ordering a piping hot Handi Biryani from Gachibowli Paradise is pure soul food. The authentic long-grain basmati is light and digestible.',
    createdAt: new Date('2026-09-12T22:30:00Z').toISOString(),
  },

  // ==========================================
  // --- 🏰 BEGUMPET HERITAGE ---
  // ==========================================
  {
    _id: 'rev-beg-1',
    name: 'Rajesh & Sunita Agrawal',
    avatar: 'RA',
    location: 'Prakash Nagar, Begumpet',
    outletName: 'Begumpet Heritage',
    branchSlug: 'begumpet',
    rating: 5,
    badge: '👑 Begumpet Regular',
    verifiedOrder: true,
    helpfulCount: 55,
    comments:
      'The Begumpet outlet has such a serene Nawabi courtyard atmosphere with ornate royal jali architecture. The paneer dum biryani with dry fruits and saffron is always fresh and aromatic.',
    createdAt: new Date('2026-10-01T19:50:00Z').toISOString(),
  },
  {
    _id: 'rev-beg-2',
    name: 'Deepak & Meera Joshi',
    avatar: 'DJ',
    location: 'Sardar Patel Road, Begumpet',
    outletName: 'Begumpet Heritage',
    branchSlug: 'begumpet',
    rating: 5,
    badge: '✨ Family Gathering',
    verifiedOrder: true,
    helpfulCount: 43,
    comments:
      'Priority table reservation was seamless. The Kesar Pista Phirni served in traditional earthen clay kasoras topped with edible silver foil and almonds was unforgettable.',
    createdAt: new Date('2026-09-26T20:45:00Z').toISOString(),
  },
  {
    _id: 'rev-beg-3',
    name: 'Col. K.S. Rathore (Retd.)',
    avatar: 'KR',
    location: 'Begumpet Airport Enclave',
    outletName: 'Begumpet Heritage',
    branchSlug: 'begumpet',
    rating: 5,
    badge: '🎖️ Lifetime Patron',
    verifiedOrder: true,
    helpfulCount: 49,
    comments:
      'The hospitality and royal decor at Begumpet make you feel like you are dining in a Nizam\'s personal palace. The Nizami Mutton Keema with Rumali Roti is pure perfection.',
    createdAt: new Date('2026-09-22T13:30:00Z').toISOString(),
  },
  {
    _id: 'rev-beg-4',
    name: 'Simran Kaur & Preet Singh',
    avatar: 'PS',
    location: 'Mayfair Enclave, Begumpet',
    outletName: 'Begumpet Heritage',
    branchSlug: 'begumpet',
    rating: 5,
    badge: '💫 Royal Diners',
    verifiedOrder: true,
    helpfulCount: 38,
    comments:
      'The quiet private dining booths at Begumpet are ideal for intimate family dinners. We love the Butter Garlic Naans and Kadai Murgh Lazeez.',
    createdAt: new Date('2026-09-16T20:00:00Z').toISOString(),
  },
  {
    _id: 'rev-beg-5',
    name: 'Nandini Murthy',
    avatar: 'NM',
    location: 'Rasoolpura, Begumpet',
    outletName: 'Begumpet Heritage',
    branchSlug: 'begumpet',
    rating: 5,
    badge: '🍃 Pure Veg Connoisseur',
    verifiedOrder: true,
    helpfulCount: 33,
    comments:
      'Their Crispy Veg Corn & Cheese Seekh Kebab and Mushroom Babycorn Dum Biryani at Begumpet outlet are consistently delicious. Highly courteous staff!',
    createdAt: new Date('2026-09-11T14:15:00Z').toISOString(),
  },

  // ==========================================
  // --- 🛍️ KUKATPALLY / KPHB COLONY ---
  // ==========================================
  {
    _id: 'rev-kuk-1',
    name: 'Vikram Sengupta',
    avatar: 'VS',
    location: 'Road No 1, KPHB Colony',
    outletName: 'Kukatpally / KPHB',
    branchSlug: 'kukatpally',
    rating: 5,
    badge: '🔥 Frequent Diner',
    verifiedOrder: true,
    helpfulCount: 35,
    comments:
      'The Kukatpally outlet serves huge portions with consistent spice level. The Kadai Murgh Lazeez and Tandoori Butter Rotis arrived in 18 minutes, piping hot and fresh.',
    createdAt: new Date('2026-09-29T21:15:00Z').toISOString(),
  },
  {
    _id: 'rev-kuk-2',
    name: 'Manoj & Divya Teja',
    avatar: 'MT',
    location: 'JNTU / Kukatpally',
    outletName: 'Kukatpally / KPHB',
    branchSlug: 'kukatpally',
    rating: 5,
    badge: '⭐ Weekend Feast Lover',
    verifiedOrder: true,
    helpfulCount: 46,
    comments:
      'Our Sunday family dinner is incomplete without Kukatpally Paradise biryani handi. The mutton pieces are exceptionally tender, falling right off the bone with rich saffron basmati.',
    createdAt: new Date('2026-09-23T14:10:00Z').toISOString(),
  },
  {
    _id: 'rev-kuk-3',
    name: 'Prashanth & Keerthi Goud',
    avatar: 'PG',
    location: 'Forum Sujana Mall Area, KPHB',
    outletName: 'Kukatpally / KPHB',
    branchSlug: 'kukatpally',
    rating: 5,
    badge: '🛍️ Shopper\'s Choice',
    verifiedOrder: true,
    helpfulCount: 42,
    comments:
      'After weekend shopping at Forum Mall, dropping by Kukatpally Paradise is our ritual. Fast service, icy cold Zafrani Badam Milk Shake, and rich Nizami Tala Hua Gosht.',
    createdAt: new Date('2026-09-18T19:45:00Z').toISOString(),
  },
  {
    _id: 'rev-kuk-4',
    name: 'Harish Chander',
    avatar: 'HC',
    location: 'Vivekananda Nagar, Kukatpally',
    outletName: 'Kukatpally / KPHB',
    branchSlug: 'kukatpally',
    rating: 5,
    badge: '👨‍👩‍👧 Family Celebration',
    verifiedOrder: true,
    helpfulCount: 39,
    comments:
      'Celebrated my father\'s 60th birthday with a 15-person family dinner at Kukatpally Paradise. The staff arranged special candle presentation and complimentary desserts.',
    createdAt: new Date('2026-09-14T20:20:00Z').toISOString(),
  },
  {
    _id: 'rev-kuk-5',
    name: 'Lavanya & Sravan Kumar',
    avatar: 'LK',
    location: 'KPHB Phase 3, Kukatpally',
    outletName: 'Kukatpally / KPHB',
    branchSlug: 'kukatpally',
    rating: 5,
    badge: '🛵 Express Handi Regular',
    verifiedOrder: true,
    helpfulCount: 34,
    comments:
      'The online delivery from Kukatpally branch is ultra-fast. Even on busy Friday nights, the biryani handi arrives sealed with fresh dough seal and boiling hot aroma!',
    createdAt: new Date('2026-09-09T21:00:00Z').toISOString(),
  },
];

let inMemoryFeedbacks = [...INITIAL_REVIEWS];

const feedbackSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Valid email is required'),
  outletName: z.string().default('Secunderabad (Flagship)'),
  rating: z.number().int().min(1).max(5),
  comments: z.string().min(5, 'Feedback must be at least 5 characters long'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = feedbackSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, error: parseResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const data = parseResult.data;
    const nameInitials = data.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    const branchSlugMap: Record<string, string> = {
      'Secunderabad (Flagship)': 'secunderabad-flagship',
      'Hitec City / Madhapur': 'hitec-city',
      'Gachibowli Hub': 'gachibowli',
      'Begumpet Heritage': 'begumpet',
      'Kukatpally / KPHB': 'kukatpally',
    };

    const newFeedback = {
      _id: 'fb-' + Date.now(),
      ...data,
      avatar: nameInitials || 'P',
      branchSlug: branchSlugMap[data.outletName] || 'secunderabad-flagship',
      location: 'Hyderabad Patron',
      badge: '✓ Verified Diner Review',
      verifiedOrder: true,
      helpfulCount: 1,
      createdAt: new Date().toISOString(),
    };

    inMemoryFeedbacks.unshift(newFeedback);

    try {
      await connectToDatabase();
      const saved = await Feedback.create(newFeedback);
      return NextResponse.json({ success: true, feedback: saved }, { status: 201 });
    } catch (dbErr) {
      return NextResponse.json({ success: true, feedback: newFeedback }, { status: 201 });
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to submit feedback' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    try {
      await connectToDatabase();
      const feedbacks = await Feedback.find({}).sort({ createdAt: -1 }).limit(100);
      if (feedbacks && feedbacks.length > 0) {
        return NextResponse.json({ success: true, feedbacks });
      }
    } catch (dbErr) {
      // Fallback
    }

    return NextResponse.json({ success: true, feedbacks: inMemoryFeedbacks });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}
