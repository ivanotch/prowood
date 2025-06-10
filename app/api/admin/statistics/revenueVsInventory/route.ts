import { NextRequest, NextResponse } from "next/server";
import { authenticateAdmin } from "@/utils/auth";
import prisma from "@/utils/prisma";
import { subDays, format } from "date-fns";

export async function GET(req: NextRequest) {
    const admin = await authenticateAdmin();
    if (!admin) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const now = new Date();
    const start = subDays(now, 90);

    try {
        const orders = await prisma.order.findMany({
            where: { paymentStatus: "PAYED", createdAt: { gte: start } },
            include: { items: { include: { product: true } } },
        });

        const products = await prisma.product.findMany({
            select: { stock: true, pricePerUnit: true },
        });

        const dailyMap: Record<string, { revenue: number; inventoryCost: number }> = {};
        for (let i = 0; i <= 90; i++) {
            const date = format(subDays(now, i), "yyyy-MM-dd");
            dailyMap[date] = { revenue: 0, inventoryCost: 0 };
        }

        orders.forEach(order => {
            const date = format(order.createdAt, "yyyy-MM-dd");

            // Ensure the date is valid and in map
            if (!dailyMap[date]) {
                console.warn("Unexpected date not in dailyMap:", date);
                return;
            }

            order.items.forEach(i => {
                if (!i?.product || typeof i.product.pricePerUnit !== "number") {
                    console.warn("Missing or invalid product in order item:", i);
                    return;
                }

                dailyMap[date].revenue += i.quantity * i.product.pricePerUnit;
            });
        });

        const currentInventoryCost = products.reduce(
            (sum, p) => sum + p.stock * p.pricePerUnit,
            0
        );

        Object.keys(dailyMap).forEach(date => {
            dailyMap[date].inventoryCost = currentInventoryCost;
        });

        const chartData = Object.entries(dailyMap)
            .map(([date, { revenue, inventoryCost }]) => ({
                date,
                revenue: Math.round(revenue),
                inventoryCost: Math.round(inventoryCost),
            }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        return NextResponse.json({ chartData }, { status: 200 });
    } catch (error) {
        console.error("Failed to load sales vs inventory:", error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}
