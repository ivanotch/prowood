import { authenticateAdmin } from "@/utils/auth";
import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const admin = await authenticateAdmin();
    if (!admin) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
    }

    try {
        const id = params.id; 
        const body = await req.json()
        const { name, pricePerUnit, description, category } = body;

        const updateProduct = await prisma.product.update({
            where: { product_id: id },
            data: {
                name,
                description,
                pricePerUnit,
                category
            }
        })

        return NextResponse.json(updateProduct);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
    }
}