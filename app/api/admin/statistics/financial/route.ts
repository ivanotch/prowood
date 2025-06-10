import { NextResponse } from "next/server"
import prisma from "@/utils/prisma"
import { authenticateAdmin } from "@/utils/auth"

export async function GET() {
    const admin = authenticateAdmin();
    if (!admin) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
    }
    try {
        // Fetch all PAYED orders with items and product price
        const paidOrders = await prisma.order.findMany({
            where: {
                paymentStatus: "PAYED",
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        })

        // 1. Total Revenue: sum of quantity * pricePerUnit
        let totalRevenue = 0
        const monthlySales: Record<string, number> = {}

        for (const order of paidOrders) {
            for (const item of order.items) {
                const amount = item.quantity * item.product.pricePerUnit
                totalRevenue += amount

                const monthKey = new Date(order.createdAt).toISOString().slice(0, 7)
                monthlySales[monthKey] = (monthlySales[monthKey] || 0) + amount
            }
        }

        // 2. Stock Expense: stock * pricePerUnit of all products
        const allProducts = await prisma.product.findMany()
        const totalStockExpense = allProducts.reduce(
            (acc, product) => acc + product.stock * product.pricePerUnit,
            0
        )

        // 3. Net Profit
        const netProfit = totalRevenue - totalStockExpense

        // 4. Monthly Growth Rate
        const sortedMonths = Object.keys(monthlySales).sort()
        let growthRate: number | null = null
        if (sortedMonths.length >= 2) {
            const lastMonth = monthlySales[sortedMonths[sortedMonths.length - 2]]
            const thisMonth = monthlySales[sortedMonths[sortedMonths.length - 1]]
            if (lastMonth > 0) {
                growthRate = ((thisMonth - lastMonth) / lastMonth) * 100
            }
        }

        return NextResponse.json({
            totalRevenue,
            totalStockExpense,
            netProfit,
            growthRate,
        })
    } catch (error) {
        console.error(error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
