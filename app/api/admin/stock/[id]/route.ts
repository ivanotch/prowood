import { authenticateAdmin } from "@/utils/auth";
import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const admin = await authenticateAdmin()

    if (!admin) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
    }

    try {

         const id = params.id;
        const body = await req.json()

        const { stock } = body;

        const editStock = await prisma.product.update({
            where: { product_id: id },
            data: {
                stock: stock
            }
        })

        return NextResponse.json(editStock, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })

    }
}