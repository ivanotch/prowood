import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'ivanpogi';
const COOKIE_NAME = 'auth_token';

export async function authenticate() {
  const cookieStore = cookies();
  const token =  (await cookieStore).get(COOKIE_NAME)?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { userId: string; email: string; name: string };
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function authenticateAdmin() {
  const cookieStore = cookies();
  const token = (await cookieStore).get(COOKIE_NAME)?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { adminId?: string; role?: string };
    
    if (decoded.role === 'ADMIN' || decoded.role === 'SUPERADMIN') {
      return decoded;
    }

    return null;
  } catch (error) {
    return null;
  }
}
