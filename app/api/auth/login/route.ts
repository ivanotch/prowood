import prisma from '@/utils/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const SECRET_KEY = process.env.JWT_SECRET || "ivanpogi";
const COOKIE_NAME = 'auth_token';

export async function POST(req: Request) {
    const { email, password } = await req.json();

    if (!email || !password) {
        return NextResponse.json({ message: "Email and Password are required." }, { status: 400 });
    }

    try {
        const user = await prisma.customer.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({ message: "User Does not Exist." }, { status: 400 });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return NextResponse.json({ message: "Invalid Credentials." }, { status: 400 });
        }

        // If credentials are correct, generate a token
        const token = jwt.sign({ userId: user.customerId, email: user.email, name:user.name}, SECRET_KEY, { expiresIn: '1d' });

        // Set the token in an HttpOnly cookie
        const res = NextResponse.json({ message: "Login Successful.", user: { id: user.customerId, name: user.name, email: user.email } }, { status: 200 });

        // Set the HttpOnly cookie
        res.cookies.set(COOKIE_NAME, token, {
            httpOnly: true,  // Ensures JavaScript can't access the cookie
            secure: process.env.NODE_ENV === 'production', // Only set cookie over HTTPS in production
            sameSite: 'strict',  // Protects against CSRF attacks
            maxAge: 24 * 60 * 60, // 1 day (in seconds)
        });

        return res;

    } catch (error) {
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}
