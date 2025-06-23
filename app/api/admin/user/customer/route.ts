import { authenticateAdmin } from "@/utils/auth";
import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const admin = await authenticateAdmin();

    if (!admin) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
    }

    try {
        const customers = await prisma.customer.findMany()

        return NextResponse.json(customers, { status: 200 })

    } catch (error) {
        console.error("Error fetching customers:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}