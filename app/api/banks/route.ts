import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import Bank from '@/models/Bank';
import { getAuthUser } from '@/lib/auth';
import { apiError, apiOk } from '@/lib/utils';

export async function GET() {
  try {
    await connectDB();
    const banks = await Bank.find({ isActive: true }).sort({ order: 1 });
    return apiOk(banks);
  } catch (err) {
    console.error('[BANKS GET]', err);
    return apiError('Server error', 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = getAuthUser(req);
    if (!user) return apiError('Unauthorized', 401);
    const body = await req.json();
    await connectDB();
    const bank = await Bank.create(body);
    return apiOk(bank, 201);
  } catch (err) {
    console.error('[BANKS POST]', err);
    return apiError('Server error', 500);
  }
}
