import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import Contact from '@/models/Contact';
import { getAuthUser } from '@/lib/auth';
import { apiError, apiOk } from '@/lib/utils';

// PUBLIC: Submit contact form
export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return apiError('Name, email and message are required');
    }

    await connectDB();
    const submission = await Contact.create({ name, email, phone, message });
    return apiOk({ id: submission._id }, 201);
  } catch (err) {
    console.error('[CONTACT POST]', err);
    return apiError('Server error', 500);
  }
}

// ADMIN: Get all submissions
export async function GET(req: NextRequest) {
  try {
    const user = getAuthUser(req);
    if (!user) return apiError('Unauthorized', 401);

    await connectDB();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return apiOk(contacts);
  } catch (err) {
    console.error('[CONTACT GET]', err);
    return apiError('Server error', 500);
  }
}
