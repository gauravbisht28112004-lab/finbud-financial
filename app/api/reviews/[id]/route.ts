import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import Review from '@/models/Review';
import { getAuthUser } from '@/lib/auth';
import { apiError, apiOk, cleanUpdate } from '@/lib/utils';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = getAuthUser(req);
    if (!user) return apiError('Unauthorized', 401);
    const body = await req.json();
    await connectDB();
    const updated = await Review.findByIdAndUpdate(params.id, cleanUpdate(body), { new: true });
    if (!updated) return apiError('Not found', 404);
    return apiOk(updated);
  } catch (err) {
    console.error('[REVIEWS PATCH]', err);
    return apiError('Server error', 500);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = getAuthUser(req);
    if (!user) return apiError('Unauthorized', 401);
    await connectDB();
    await Review.findByIdAndDelete(params.id);
    return apiOk({ deleted: true });
  } catch (err) {
    console.error('[REVIEWS DELETE]', err);
    return apiError('Server error', 500);
  }
}
