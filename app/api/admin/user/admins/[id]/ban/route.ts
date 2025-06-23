import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { authenticateAdmin } from "@/utils/auth";

// PUT /api/admin/user/admin/[id]/ban
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {

    const admin = await authenticateAdmin();
    if (!admin) {
        return NextResponse.json({message: "Unauthorized"}, {status: 400})
    }

    const { id } = params;
    const { isBanned } = await req.json();

    try {
        await prisma.admin.update({
            where: { adminId: id },
            data: { isBanned },
        });

        return NextResponse.json({ message: "Admin ban status updated" });
    } catch (error) {
        console.error("Error banning admin:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
