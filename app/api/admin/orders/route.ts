import { authenticateAdmin } from "@/utils/auth";
import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function GET(req: Request) {
    const admin = await authenticateAdmin(req);
    if (!admin) {
        return NextResponse.json({message: "Unauthorized Access"}, {status: 403})
    }

    
}