import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { authenticateAdmin } from "@/utils/auth";

export async function GET(req: NextRequest) {
  const admin = authenticateAdmin();

  if (!admin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true, // Needed for pricePerUnit
          },
        },
        customer: true,
        address: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Add amount per order
    const ordersWithAmount = orders.map((order) => {
      const amount = order.items.reduce((sum, item) => {
        return sum + item.quantity * (item.product?.pricePerUnit || 0);
      }, 0);

      return {
        ...order,
        amount,
      };
    });

    return NextResponse.json(ordersWithAmount, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
