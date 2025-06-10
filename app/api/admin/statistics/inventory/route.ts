import { authenticateAdmin } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(req: NextRequest) {
    const admin = authenticateAdmin();
    if (!admin) {
        return NextResponse.json({ message: "Unauthorized access" }, { status: 400 })
    }

    try {
        const products = await prisma.product.findMany({
            select: {
                pricePerUnit: true,
                stock: true,
            },
        });

        const totalProducts = products.length;

        const lowStockCount = products.filter((p) => p.stock < 50).length;

        const totalStockValue = products.reduce((sum, p) => {
            return sum + (p.pricePerUnit * p.stock);
        }, 0);

        return NextResponse.json({
            totalProducts,
            lowStockCount,
            totalStockValue,
        });
    } catch (error) {
        console.error("Error fetching product stats:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}