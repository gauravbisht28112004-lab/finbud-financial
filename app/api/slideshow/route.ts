import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import Slideshow from '@/models/Slideshow';
import { getAuthUser } from '@/lib/auth';
import { apiError, apiOk } from '@/lib/utils';

export async function GET() {
  try {
    await connectDB();
    const slides = await Slideshow.find({ isActive: true }).sort({ order: 1 });
    return apiOk(slides);
  } catch (err) {
    return apiError('Server error', 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = getAuthUser(req);
    if (!user) return apiError('Unauthorized', 401);
    const body = await req.json();
    await connectDB();
    const slide = await Slideshow.create(body);
    return apiOk(slide, 201);
  } catch (err) {
    return apiError('Server error', 500);
  }
}
