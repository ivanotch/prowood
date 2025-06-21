import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'ivanpogi';
const COOKIE_NAME = 'auth_token';
//uses in route api
export async function authenticate() {
  const cookieStore = await cookies();
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
  const cookieStore =  await cookies();
  const token =  (await cookieStore).get('adminToken')?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { adminId?: string; name?: string; contact?: string; role?: string; email?: string };
    
    if (decoded.role === 'ADMIN' || decoded.role === 'SUPER_ADMIN') {
      return decoded;
    }

    return null;
  } catch (error) {
    return null;
  }
}
