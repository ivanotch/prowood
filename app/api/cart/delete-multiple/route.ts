import { NextResponse } from 'next/server';
import prisma from '@/utils/prisma'; // adjust path as needed
import { authenticate } from '@/utils/auth';

export async function POST(req: Request) {

    const user = await authenticate()
    if (!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
    }

    try {
        const body = await req.json();
        const { productIds } = body;

        if (!Array.isArray(productIds) || productIds.length === 0) {
            return NextResponse.json({ message: 'No product IDs provided' }, { status: 400 });
        }

        await prisma.cart.deleteMany({
            where: {
                customerId: user.userId,
                productId: {
                    in: productIds
                }
            }
        });

        return NextResponse.json({ message: 'Selected items deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Delete multiple error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
