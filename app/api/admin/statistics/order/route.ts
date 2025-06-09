import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { authenticateAdmin } from "@/utils/auth";

export async function GET(req: NextRequest) {
    const admin = authenticateAdmin();

    if (!admin) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
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

        // Filter by date range only if startDate or endDate is provided

        const orderCount = await prisma.order.count({
            where: {
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

        const unprocessedOrders = await prisma.order.count({
            where: {
                paymentStatus: "UNPAID",
                deliveryStatus: "PACKED",
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

        const processingOrders = await prisma.order.count({
            where: {
                deliveryStatus: "SHIPPED",
                paymentStatus: {
                    in: ["INITIAL_DOWNPAYMENT", "PAYED"],
                },
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

        const totalSales = await prisma.order.findMany({
            where: {
                ...(startDate || endDate
                    ? {
                        createdAt: {
                            ...(startDate && { gte: startDate }),
                            ...(endDate && { lte: endDate }),
                        },
                    }
                    : {}),
                paymentStatus: {
                    in: ["PAYED", "INITIAL_DOWNPAYMENT"], // Only include valid sales
                },
            },
            include: {
                items: {
                    include: {
                        product: {
                            select: {
                                pricePerUnit: true,
                            },
                        },
                    },
                },
            },
        });

        // Now calculate the total sales amount
        const totalSalesAmount = totalSales.reduce((total, order) => {
            const orderTotal = order.items.reduce((sum, item) => {
                return sum + item.quantity * item.product.pricePerUnit;
            }, 0);
            return total + orderTotal;
        }, 0);

        return NextResponse.json({
            orderCount, unprocessedOrders, processingOrders, totalSalesAmount, dateRange: {
                startDate: startDate?.toISOString(),
                endDate: endDate?.toISOString()
            },
        }, { status: 200 })

    } catch (error) {
        console.error("[ERROR]:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}