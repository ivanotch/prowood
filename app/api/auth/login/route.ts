import prisma from '@/utils/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const SECRET_KEY = process.env.JWT_SECRET || "ivanpogi";

export async function POST(req: Request) {
    const { email, password } = await req.json();

    if (!email || !password) {
        return NextResponse.json({ message: "Email and Password are required." }, { status: 400 })
    }

    try {
        const user = await prisma.customer.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({ message: "User Does not Exist." }, { status: 400 })
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return NextResponse.json({ message: "Invalid Credentials." }, { status: 400 })
        }

        //if password and email is correct, generate a token that expires in 1d
        const token = jwt.sign({ userId: user.customerId, email: user.email }, SECRET_KEY, { expiresIn: '1d' });

        return NextResponse.json({ message: "Login Successful.", token, user: { id: user.customerId, name: user.name, email: user.email } }, { status: 200, })

    } catch (error) {
        return NextResponse.json({ message: "Server Error" }, { status: 500 })
    }
}