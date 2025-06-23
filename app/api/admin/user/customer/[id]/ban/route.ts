import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { authenticateAdmin } from "@/utils/auth";

// PUT /api/admin/user/customer/[id]/ban
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const admin = await authenticateAdmin();
    if (!admin) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
    }

    const { id } = params;
    const { isBanned } = await req.json();

    try {
        await prisma.customer.update({
            where: { customerId: id },
            data: { isBanned },
        });

        return NextResponse.json({ message: "Customer ban status updated" });
    } catch (error) {
        console.error("Error banning customer:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
