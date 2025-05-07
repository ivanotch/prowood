import { cookies } from 'next/headers';
import jwt, { JwtPayload } from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || "ivanpogi";

interface DecodedUser extends JwtPayload {
    userId: string;
    email: string;
    name: string;
}

export default async function getUserFromServer() {
    const cookieStore = cookies();
    const token = (await cookieStore).get('auth_token')?.value;

    if (!token) return null;

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        if (typeof decoded === 'object' && 'userId' in decoded) {
            return decoded as DecodedUser;
        }
        return null;
    } catch {
        return null;
    }

}