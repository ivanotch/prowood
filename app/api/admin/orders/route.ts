import { authenticateAdmin } from "@/utils/auth";
import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

//get all orders
export async function GET(req: Request) {
    const admin = await authenticateAdmin(req);  // Check if admin is authenticated
    if (!admin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  
    try {
      const orders = await prisma.order.findMany({
        include: {
          customer: { select: { name: true, email: true } }, // Include customer details
          items: { include: { product: true } } // Include ordered products
        }
      });
  
      return NextResponse.json({ orders }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
  }

//create order
export async function POST(req: Request) {

    try {
        const admin = await authenticateAdmin(req);
        if (!admin) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
        }

        const { address, modeOfPayment, items, userId } = await req.json();
        if (!userId || !address || !modeOfPayment || !items || !Array.isArray(items) || items.length === 0) {
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
                customerId: userId,
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

