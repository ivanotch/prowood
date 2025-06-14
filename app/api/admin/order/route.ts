import { authenticateAdmin } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

async function POST(req: NextRequest) {
    const admin = authenticateAdmin()

    if (!admin) {
        return NextResponse.json({message: "Unauthorized Access"}, {status: 400})
    }

    try {
        
    } catch (error) {

    }
}