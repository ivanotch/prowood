import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { authenticateAdmin } from "@/utils/auth";

export async function PATCH(req: Request, {params}: {params: {orderId: string}}) {
    const admin = await authenticateAdmin(req);
    if (!admin) {
        return NextResponse.json({message: "Unauthorized"}, {status: 403});
    }

    const {orderId} = params; //get orderId from parameters
    const {approve} = await req.json();

    try {
        //check if the order exist
        const order = await prisma.order.findUnique({
            where: {order_id: orderId}
        })

        if (!order) {
            return NextResponse.json({message: "Order does not exist"}, {status: 404})
        }

        const updateOrder = await prisma.order.update({
            where: {order_id: orderId},
            data: {
                approvedBy: approve ? admin.adminId : order.approvedBy
            }
        })

        return NextResponse.json({message: "Approve recorded Successfully", order: updateOrder}, {status: 200})
    } catch (error) {
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}