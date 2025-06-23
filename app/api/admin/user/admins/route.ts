import { authenticateAdmin } from "@/utils/auth";
import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const admin = await authenticateAdmin()
    if (!admin) {
        return NextResponse.json({message: "Unauthorized"}, {status: 400})
    }

    try {
        const admins = await prisma.admin.findMany()

        return NextResponse.json(admins, {status: 200})
    } catch (error) {
        console.log(error);
        return NextResponse.json("Server Error, Failed to fetch Admins")
    }
}