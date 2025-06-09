import { authenticateAdmin } from "@/utils/auth";
import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const admin = authenticateAdmin();

    if (!admin) {
        return NextResponse.json({ message: "Unauthorized access" }, { status: 400 });
    }

    try {
        const payedOrders = await prisma.order.findMany({
            where: {
                paymentStatus: 'PAYED'
            },
            orderBy: {
                createdAt: 'desc',  // newest first
            },
            include: {
                customer: { select: { name: true, email: true } },
                items: { include: { product: true } }
            }
        });

        return NextResponse.json(payedOrders, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
