import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export interface JWTPayload {
  id: string;
  email: string;
  role: string;
}

export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

/** Extract and verify token from request cookies or Authorization header */
export function getAuthUser(req: NextRequest): JWTPayload | null {
  // Try cookie first
  const cookieToken = req.cookies.get('finbud_token')?.value;
  if (cookieToken) return verifyToken(cookieToken);

  // Try Authorization header
  const header = req.headers.get('authorization');
  if (header?.startsWith('Bearer ')) {
    return verifyToken(header.slice(7));
  }

  return null;
}

/** Use inside Server Components to get current admin */
export function getServerAuth(): JWTPayload | null {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('finbud_token')?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch {
    return null;
  }
}
