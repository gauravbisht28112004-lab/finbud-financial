import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import Staff from '@/models/Staff';
import { getAuthUser } from '@/lib/auth';
import { apiError, apiOk } from '@/lib/utils';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const type = req.nextUrl.searchParams.get('type');
    const filter: Record<string, unknown> = { isActive: true };
    if (type) filter.type = type;
    const staff = await Staff.find(filter).sort({ order: 1 });
    return apiOk(staff);
  } catch (err) {
    console.error('[TEAM GET]', err);
    return apiError('Server error', 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = getAuthUser(req);
    if (!user) return apiError('Unauthorized', 401);
    const body = await req.json();
    await connectDB();
    const staff = await Staff.create(body);
    return apiOk(staff, 201);
  } catch (err) {
    console.error('[TEAM POST]', err);
    return apiError('Server error', 500);
  }
}
