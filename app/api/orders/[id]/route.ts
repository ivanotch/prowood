import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { authenticate } from "@/utils/auth";

//get a specific order only for user
export async function GET(req: Request, { params }: { params: { orderId: string } }) {
  const user = await authenticate();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const order = await prisma.order.findUnique({
      where: { order_id: params.orderId, customerId: user.userId },
      include: { items: true },
    });

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ order });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

//delete specific order
export async function DELETE(req: Request, { params }: { params: { orderId: string } }) {
  const user = await authenticate();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.order.delete({
      where: { order_id: params.orderId, customerId: user.userId },
    });

    return NextResponse.json({ message: "Order deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
