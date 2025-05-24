import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const ids = url.searchParams.getAll("ids");

    if (!ids || ids.length === 0) {
        return NextResponse.json({products: []}, {status: 200})
    }

    try{
        const products = await prisma.product.findMany({
            where: {
                product_id: {
                    in: ids,
                }
            }
        })

        return NextResponse.json({products}, {status: 200})
    } catch (error) {
        console.error("Error fetching products", error);
        return NextResponse.json({message: "Server error"}, {status: 500})
    }
    
}