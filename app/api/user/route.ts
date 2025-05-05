
import {cookies} from 'next/headers';
import  jwt  from "jsonwebtoken";
import { NextResponse } from "next/server";

const SECRET_KEY = process.env.JWT_SECRET || 'ivanpogi'

export async function GET() {
    const cookieStore = cookies();
    const token = (await cookieStore).get('auth_token')?.value

    if (!token) {
        return NextResponse.json({user: null});
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return NextResponse.json({user: decoded});
    } catch {
        return NextResponse.json({user: null})
    }
}
