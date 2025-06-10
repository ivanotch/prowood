import { authenticateAdmin } from "@/utils/auth";
import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET (req: NextRequest) {
    const admin = authenticateAdmin();

    if (!admin) {
        return NextResponse.json({message: "Unauthorized"}, {status: 400})
    }

    try {
        const products = await prisma.product.findMany()

        if (!products) {
            return NextResponse.json({message: "No Products Found"}, {status: 400})
        }

        return NextResponse.json(products, {status: 200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: error}, {status: 400})
    }
}