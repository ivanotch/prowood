import bcrypt from 'bcrypt';
import prisma from '@/utils/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const {name, email, password, contact, address} = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 })
        }

        try {
            const existingUser = await prisma.customer.findUnique({
                where: {email}
            })

            if (existingUser) {
                return NextResponse.json({ message: "User already Exist" }, { status: 400 })
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await prisma.customer.create({
                data: {name, email, password: hashedPassword}
            })

            return NextResponse.json({ message: "User Created", user: newUser}, { status: 200 })
        } catch (error) {
            return NextResponse.json({ message: "Server Error", error}, { status: 500 })
        }
}