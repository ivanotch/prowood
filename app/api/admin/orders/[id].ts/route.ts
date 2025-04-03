import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { authenticateAdmin } from "@/utils/auth";

// ✅ DELETE: Admin deletes an order by ID
export async function DELETE(req: Request, { params }: { params: { orderId: string } }) {
  const admin = await authenticateAdmin(req);  // Ensure admin authentication
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { orderId } = params; // Extract orderId from request parameters

  try {
    // 🔹 Check if the order exists
    const order = await prisma.order.findUnique({
      where: { order_id: orderId },
    });

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    // 🔹 Delete the order (Cascade will remove related items)
    await prisma.order.delete({
      where: { order_id: orderId },
    });

    return NextResponse.json({ message: "Order deleted successfully!" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

//edit order ->changing the address, name, contact, etc.
