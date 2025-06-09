import { authenticateAdmin } from "@/utils/auth";
import prisma from "@/utils/prisma";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const admin = await authenticateAdmin();

    if (!admin) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {

        const { searchParams } = new URL(req.url);
        let startDateParam = searchParams.get("startDate");
        let endDateParam = searchParams.get("endDate");

        if (!startDateParam && !endDateParam) {
            const now = new Date();
            const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
            const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

            // Format as YYYY-MM-DD
            startDateParam = firstDay.toISOString().slice(0, 10); // '2025-06-01'
            endDateParam = lastDay.toISOString().slice(0, 10);    // '2025-06-30'
        }

        const startDate = startDateParam
            ? new Date(`${startDateParam}T00:00:00.000Z`)
            : undefined;

        const endDate = endDateParam
            ? new Date(`${endDateParam}T23:59:59.999Z`)
            : undefined;


        const dateFilterSQL = startDate && endDate
            ? `AND o."createdAt" BETWEEN '${startDate.toISOString()}' AND '${endDate.toISOString()}'`
            : startDate
                ? `AND o."createdAt" >= '${startDate.toISOString()}'`
                : endDate
                    ? `AND o."createdAt" <= '${endDate.toISOString()}'`
                    : ``;

        const totalRevenueResult = await prisma.$queryRawUnsafe<
            { total: number | null }[]
        >(`SELECT SUM(oi.quantity * p."pricePerUnit") AS total
            FROM "OrderItem" oi
            JOIN "Order" o ON o."order_id" = oi."order_id"
            JOIN "Product" p ON p."product_id" = oi."productId"
            WHERE o."paymentStatus" = 'PAYED' ${dateFilterSQL}
        `);

        const totalRevenue = totalRevenueResult[0]?.total ?? 0;

        const totalUnitsSold = await prisma.orderItem.aggregate({
            _sum: {
                quantity: true,
            },
            where: {
                order: {
                    paymentStatus: 'PAYED',
                    ...(startDate || endDate
                        ? {
                            createdAt: {
                                ...(startDate && { gte: startDate }),
                                ...(endDate && { lte: endDate }),
                            },
                        }
                        : {}),
                },
            },
        });


        const numberOfOrders = await prisma.order.count({
            where: {
                paymentStatus: 'PAYED',
                ...(startDate || endDate
                    ? {
                        createdAt: {
                            ...(startDate && { gte: startDate }),
                            ...(endDate && { lte: endDate }),
                        },
                    }
                    : {}),
            }, 
        });


        const categoryRevenue = await prisma.$queryRawUnsafe<
            { category: string | null; revenue: number }[]>(`
            SELECT p."category", SUM(oi.quantity * p."pricePerUnit") AS revenue
            FROM "OrderItem" oi
            JOIN "Order" o ON o."order_id" = oi."order_id"
            JOIN "Product" p ON p."product_id" = oi."productId"
            WHERE o."paymentStatus" = 'PAYED' ${dateFilterSQL}
            GROUP BY p."category"
             `)


        const salesByCategory = categoryRevenue.reduce<Record<string, number>>(
            (acc, curr) => {
                const category = curr.category ?? "Uncategorized";
                acc[category] = curr.revenue;
                return acc;
            },
            {}
        )

        return NextResponse.json({
            totalRevenue,
            totalUnitsSold: totalUnitsSold._sum.quantity ?? 0,
            numberOfOrders,
            salesByCategory,
            dateRange: {
                startDate: startDate?.toISOString(),
                endDate: endDate?.toISOString()
            },
        })

    } catch (error) {
        console.error("Dashboard stats error:", error);
        return NextResponse.json(
            { message: "Internal Server ERROR" }, { status: 500 }
        )
    }
}