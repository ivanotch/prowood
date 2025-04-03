import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";

const SECRET_KEY = process.env.JWT_SECRET || "ivanpogi";

export async function POST(req: Request) {

    const {email, password} = await req.json()

    if (!email || !password) {
        return NextResponse.json({message: "Email and Password is required"}, {status: 400})
    }

    try {
        const admin = await prisma.admin.findUnique({
            where: {email}
        })

        if (!admin) {
            return NextResponse.json({message: "No such admin Exist!"}, {status: 400});
        }

        const passwordMatch = await bcrypt.compare(password, admin.password)
        if (!passwordMatch) {
            return NextResponse.json({message: "Wrong password"}, {status: 400});
        }

        const token = jwt.sign({adminId: admin.adminId, email: admin.email, role: admin.role}, SECRET_KEY, {expiresIn: '1d'})

        return NextResponse.json({message: "Login Successful", token, admin: {id: admin.adminId, name: admin.name, email: admin.email, contact: admin.contact, role: admin.role}}, {status: 200})
    } catch (error) {
        return NextResponse.json({Message: "Server Error"}, {status: 500})
    }

}