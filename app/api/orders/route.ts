import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { authenticate } from "@/utils/auth";

// Get all orders for the authenticated user....working
export async function GET(req: Request) {
  // Authenticate the request
  const user = await authenticate(req);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch orders for the authenticated user
    const orders = await prisma.order.findMany({
      where: { customerId: user.userId },
      include: { items: { include: { product: true } } }, // Include product details
    });

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// Create an order working
export async function POST(req: Request) {
  try {
    // Authenticate the request
    const user = await authenticate(req);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Parse request body
    const { address, modeOfPayment, items } = await req.json();

    // Validate request data
    if (!address || !modeOfPayment || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ message: "Invalid request data" }, { status: 400 });
    }

    // Validate product existence
    const productIds = items.map((item: { productId: string }) => item.productId);
    const existingProducts = await prisma.product.findMany({
      where: { product_id: { in: productIds } },
    });

    if (existingProducts.length !== items.length) {
      return NextResponse.json({ message: "One or more products do not exist." }, { status: 400 });
    }

    // Create the order with order items
    const order = await prisma.order.create({
      data: {
        customerId: user.userId,
        address,
        paymentStatus: "UNPAID",
        modeOfPayment,
        deliveryStatus: "NOT_SHIPPED",
        items: {
          create: items.map((item: { productId: string; quantity: number }) => ({
            product: { connect: { product_id: item.productId } }, // Connect to existing product
            quantity: item.quantity,
          })),
        },
      },
      include: { items: { include: { product: true } } }, // Include product details
    });

    return NextResponse.json({ message: "Order created successfully!", order }, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }

}

export async function DELETE(req: Request) {
    
}
