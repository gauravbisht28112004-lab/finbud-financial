import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import Contact from '@/models/Contact';
import { getAuthUser } from '@/lib/auth';
import { apiError, apiOk } from '@/lib/utils';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = getAuthUser(req);
    if (!user) return apiError('Unauthorized', 401);

    await connectDB();
    const updated = await Contact.findByIdAndUpdate(params.id, { isRead: true }, { new: true });
    if (!updated) return apiError('Not found', 404);
    return apiOk(updated);
  } catch (err) {
    console.error('[CONTACT PATCH]', err);
    return apiError('Server error', 500);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = getAuthUser(req);
    if (!user) return apiError('Unauthorized', 401);

    await connectDB();
    await Contact.findByIdAndDelete(params.id);
    return apiOk({ deleted: true });
  } catch (err) {
    console.error('[CONTACT DELETE]', err);
    return apiError('Server error', 500);
  }
}
