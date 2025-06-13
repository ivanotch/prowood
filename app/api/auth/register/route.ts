import bcrypt from 'bcrypt';
import prisma from '@/utils/prisma';
import { NextResponse } from 'next/server';
import { sendVerificationEmail } from '@/lib/resend';

export async function POST(req: Request) {
    const {name, email, password, contact, address} = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 })
        }

        try {
            const existingUser = await prisma.customer.findUnique({
                where: {email}
            })

            if (existingUser && existingUser.isVerified) {
                return NextResponse.json({ message: "User already Exist" }, { status: 400 })
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await prisma.customer.upsert({
                where: {email},
                update: {name, email, password: hashedPassword, isVerified: false},
                create: {name, email, password: hashedPassword, isVerified: false}
            })

            const code = Math.floor(100000 + Math.random() * 900000).toString();
            const expiresAt = new Date(Date.now() + 1000 * 60 * 10)

            const saveOTP = await prisma.verificationCode.upsert({
                where: {email},
                update: {code, expiresAt},
                create: {email, code, expiresAt}
            })

            await sendVerificationEmail(email, code)

            return NextResponse.json({ message: "User Created", user: newUser}, { status: 200 })
        } catch (error) {
            return NextResponse.json({ message: "Server Error", error}, { status: 500 })
        }
}