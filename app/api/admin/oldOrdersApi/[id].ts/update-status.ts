import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { authenticateAdmin } from "@/utils/auth";


// to edit, should set the date accomplished if delivery status is being updated to DELIVERED
export async function PATCH(req: Request, {params}: {params: {orderId: string}}) {
    const admin = await authenticateAdmin(req);
    if (!admin) {
        return NextResponse.json({message: "Unauthorized Access"}, {status: 403})
    }

    const {orderId} = params;
    const { deliveryStatus } = await req.json();


    try {

        const order = await prisma.order.findUnique({
            where: {order_id: orderId}
        })

        if (!order) {
            return NextResponse.json({messahe: "Order does not exist"}, {status: 404})
        }

        const updateOrder = await prisma.order.update({
            where: {
                order_id: orderId
            },
            data: {
                deliveryStatus: deliveryStatus ? deliveryStatus : order.deliveryStatus
            }
        })

        return NextResponse.json({message: "Delivery Status updated Successfullt"}, {status: 200})

    } catch (error) {
        return NextResponse.json({message: "Server Error"}, {status: 500})
    }
}