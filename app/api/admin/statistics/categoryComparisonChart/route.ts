import { NextRequest, NextResponse } from "next/server";
import { authenticateAdmin } from "@/utils/auth";
import { subDays, format } from "date-fns";
import prisma from "@/utils/prisma";

export async function GET(req: NextRequest) {
    const admin = await authenticateAdmin();

    if (!admin) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();
    const startDate = subDays(now, 90);

    try {
        const orders = await prisma.order.findMany({
            where: {
                paymentStatus: "PAYED",
                createdAt: {
                    gte: startDate,
                    lte: now,
                },
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        const dailyMap: Record<string, { SPC: number; WPC: number }> = {};

        for (let i = 0; i <= 90; i++) {
            const date = format(subDays(now, i), "yyyy-MM-dd");
            dailyMap[date] = { SPC: 0, WPC: 0 };
        }

        for (const order of orders) {
            const date = format(order.createdAt, "yyyy-MM-dd");

            for (const item of order.items) {
                const category = item.product.category ?? "";
                const amount = item.quantity * item.product.pricePerUnit;

                if (category.includes("Stone Plastic Composite")) {
                    dailyMap[date].SPC += amount;
                } else if (category.includes("Wood Plastic Composite")) {
                    dailyMap[date].WPC += amount;
                }
            }
        }

        // Format to chart data
        const chartData = Object.entries(dailyMap)
            .map(([date, { SPC, WPC }]) => ({
                date,
                SPC: Math.round(SPC),
                WPC: Math.round(WPC),
            }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        return NextResponse.json({chartData}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: 'Internal Server Error'}, {status: 500});
    }
}