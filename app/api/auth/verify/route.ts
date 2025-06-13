import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { email, code } = await req.json();

    try {
        const record = await prisma.verificationCode.findUnique({
            where: { email }
        })

        if (!record || record.code !== code) {
            return NextResponse.json({ message: "Invalid Code" }, { status: 400 })
        }

        if (new Date() > record.expiresAt) {
            return NextResponse.json({ error: "Code expired" }, { status: 400 });
        }

        await prisma.customer.update({
            where: { email },
            data: { isVerified: true }
        })

        await prisma.verificationCode.delete({ where: { email } });

        return NextResponse.json({ message: "Email verified successfully!" }, {status: 200});
    } catch (error) {
        return NextResponse.json({ message: "Email verified successfully!" }, { status: 400});
    }
}

