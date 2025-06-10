import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { subDays } from "date-fns";
import { authenticateAdmin } from "@/utils/auth";

export async function GET(req: NextRequest) {
    const admin = authenticateAdmin();
    if (!admin) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
    }
    const thirtyDaysAgo = subDays(new Date(), 30);

    try {
        // Fetch OrderItems from paid orders in the last 30 days, including product name
        const orderItems = await prisma.orderItem.findMany({
            where: {
                createdAt: { gte: thirtyDaysAgo },
                order: {
                    paymentStatus: "PAYED",
                },
            },
            include: {
                product: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        // Map: { productName: totalQuantity }
        const salesMap: Record<string, number> = {};

        orderItems.forEach(item => {
            const productName = item.product?.name ?? "Unknown";
            salesMap[productName] = (salesMap[productName] || 0) + item.quantity;
        });

        // Convert to chartData format
        const chartData = Object.entries(salesMap).map(([product, Sales]) => ({
            product,
            Sales,
        }));

        return NextResponse.json({ chartData }, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch product sales:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
