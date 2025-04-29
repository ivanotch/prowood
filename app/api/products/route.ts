import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";


export async function GET(req: Request) {
    const {searchParams} = new URL(req.url);
    const filter = searchParams.get('filter') || "";

    const products = await prisma.product.findMany({
        where: {
            category: {
                contains: filter,
                mode: 'insensitive'
            }
        }
    });

    return NextResponse.json({products}, {status: 200});

}