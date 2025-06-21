import { authenticateAdmin } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/utils/prisma";


export async function PUT(req: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const admin = await authenticateAdmin()

    if (!admin) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
    }

    try {
        const id = params.id;
        const body = await req.json();

        const {
            modeOfPayment,
            paymentStatus,
            deliveryStatus,
            deliveryDate,
        } = body;

        const update = await prisma.order.update({
            where: { order_id: id },
            data: {
                modeOfPayment,
                paymentStatus,
                deliveryStatus,
                deliveryDate: new Date(deliveryDate)
            }
        })

        return NextResponse.json( update, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Internal Server Error"}, {status: 500})
    }
}