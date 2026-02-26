import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import Review from '@/models/Review';
import { getAuthUser } from '@/lib/auth';
import { apiError, apiOk } from '@/lib/utils';

// PUBLIC
export async function GET() {
  try {
    await connectDB();
    const reviews = await Review.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    return apiOk(reviews);
  } catch (err) {
    console.error('[REVIEWS GET]', err);
    return apiError('Server error', 500);
  }
}

// ADMIN
export async function POST(req: NextRequest) {
  try {
    const user = getAuthUser(req);
    if (!user) return apiError('Unauthorized', 401);

    const body = await req.json();
    await connectDB();
    const review = await Review.create(body);
    return apiOk(review, 201);
  } catch (err) {
    console.error('[REVIEWS POST]', err);
    return apiError('Server error', 500);
  }
}
