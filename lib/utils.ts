import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function apiError(message: string, status = 400) {
  return Response.json({ success: false, message }, { status });
}

export function apiOk(data: unknown, status = 200) {
  return Response.json({ success: true, data }, { status });
}

/** Strip undefined keys from an object (useful for partial updates) */
export function cleanUpdate<T extends Record<string, unknown>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined && v !== '')
  ) as Partial<T>;
}
