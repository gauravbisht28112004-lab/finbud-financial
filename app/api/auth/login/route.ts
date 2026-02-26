import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import Admin from '@/models/Admin';
import { signToken } from '@/lib/auth';
import { apiError, apiOk } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) return apiError('Email and password are required');

    await connectDB();
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) return apiError('Invalid credentials', 401);

    const valid = await admin.comparePassword(password);
    if (!valid) return apiError('Invalid credentials', 401);

    const token = signToken({ id: admin._id.toString(), email: admin.email, role: admin.role });

    const response = apiOk({ email: admin.email, name: admin.name, role: admin.role });

    // Set HTTP-only cookie
    const headers = new Headers(response.headers);
    headers.append(
      'Set-Cookie',
      `finbud_token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 3600}; SameSite=Strict`
    );

    return new Response(response.body, { status: 200, headers });
  } catch (err) {
    console.error('[AUTH LOGIN]', err);
    return apiError('Server error', 500);
  }
}
