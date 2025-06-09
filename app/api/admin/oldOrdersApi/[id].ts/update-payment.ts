import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { authenticateAdmin } from "@/utils/auth";

export async function PATCH(req: Request, {params}: {params: {orderId: string}}) {
    const admin = await authenticateAdmin();
    if (!admin) {
        return NextResponse.json({message: "Unauthorized"}, {status: 403});
    }

    const {orderId} = params;
    const {paymentStatus} = await req.json()

    try {

        const order = await prisma.order.findUnique({
            where: {order_id: orderId},
        })

        if (!order) {
            return NextResponse.json({message: "Order does not exist."}, {status: 404})
        }

        const updateOrder = await prisma.order.update({
            where: {order_id: orderId},
            data: {
                paymentStatus: paymentStatus ? paymentStatus : order.paymentStatus
            }
        })

        return NextResponse.json({message: "Payment status updated successfully", order: updateOrder}, {status: 200})

    } catch (error) {
        return NextResponse.json({message: "Server Error"}, {status: 500})
    }
}