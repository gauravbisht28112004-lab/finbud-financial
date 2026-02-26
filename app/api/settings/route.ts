import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import Settings from '@/models/Settings';
import { getAuthUser } from '@/lib/auth';
import { apiError, apiOk } from '@/lib/utils';

export async function GET() {
  try {
    await connectDB();
    let settings = await Settings.findOne();
    if (!settings) settings = await Settings.create({});
    return apiOk(settings);
  } catch (err) {
    return apiError('Server error', 500);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = getAuthUser(req);
    if (!user) return apiError('Unauthorized', 401);
    const body = await req.json();
    await connectDB();
    let settings = await Settings.findOne();
    if (!settings) settings = await Settings.create({});
    Object.assign(settings, body);
    await settings.save();
    return apiOk(settings);
  } catch (err) {
    return apiError('Server error', 500);
  }
}
