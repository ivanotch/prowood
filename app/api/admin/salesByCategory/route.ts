import { NextResponse } from "next/server"
import prisma from "@/utils/prisma"
import { subDays } from "date-fns"
import { authenticateAdmin } from "@/utils/auth";

export async function GET() {
    const admin = authenticateAdmin();
    if (!admin) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
    }
    try {
        const thirtyDaysAgo = subDays(new Date(), 30)

        // Get all orders with items and products from the last 30 days
        const orders = await prisma.order.findMany({
            where: {
                createdAt: { gte: thirtyDaysAgo },
                deliveryStatus: { in: ["DELIVERED", "SHIPPED"] },
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        })

        // Aggregate sales by category
        const categoryMap: Record<string, number> = {}

        type OrderItem = {
            quantity: number;
            product?: { category?: string | null };
        };

        type Order = {
            items: OrderItem[];
        };

        orders.forEach((order: Order) => {
            order.items.forEach((item) => {
                const category = item.product?.category?.trim()
                if (!category) return

                const sales = item.quantity
                categoryMap[category] = (categoryMap[category] || 0) + sales
            })
        })

        // Format with fill colors
        const fillColors: Record<string, string> = {
            "Stone Plastic Composite": "var(--color-SPC)",
            "Indoor Columns Wood Plastic Composite": "var(--color-ICWPC)",
            "Outdoor Wood Plastic Composite": "var(--color-OWPC)",
            "Indoor Wood Plastic Composite": "var(--color-IWPC)",
        }

        const result = Object.entries(categoryMap).map(([category, Sales]) => ({
            category,
            Sales,
            fill: fillColors[category] || "var(--color-default)",
        }))

        return NextResponse.json({ chartData: result })
    } catch (error) {
        console.error("Error in salesByCategory:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
