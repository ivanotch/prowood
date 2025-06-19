import { authenticateAdmin } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export async function POST(req: NextRequest) {
    const admin = authenticateAdmin()

    if (!admin) {
        return NextResponse.json({ message: "Unauthorized Access" }, { status: 400 })
    }

    console.log("reached!")

    const body = await req.json();
    const { name, addressData, cart, modeOfPayment } = body;
    console.log(name, addressData, cart, modeOfPayment)

    if (!name || !addressData || !cart || !modeOfPayment) {
        return NextResponse.json({ message: "Missing Required Fields" }, { status: 400 })
    }

    try {

        const customer = await prisma.customer.create({
            data: {
                name,
                email: `guest-${Date.now()}@guest.com`,
                password: "1234",
                contact: addressData.contact,
                isVerified: true,
            }
        })

        const createAddress = await prisma.address.create({
            data: {
                customerId: customer.customerId,
                zipCode: addressData.zipCode,
                city: addressData.city,
                street: addressData.street,
                country: addressData.country,
                region: addressData.region,
                apartment: addressData?.apartment,
            }
        })



        const order = await prisma.order.create({
            data: {
                customerId: customer.customerId,
                addressId: createAddress.id,
                paymentStatus: "UNPAID",
                deliveryStatus: "NOT_SHIPPED",
                modeOfPayment,
                items: {
                    create: cart.map((item: { productId: string; quantity: number }) => ({
                        product: { connect: { product_id: item.productId } }, // Connect to existing product
                        quantity: item.quantity,
                    })),
                },
            },
            include: { items: { include: { product: true } }, address: true }, // Include product details
        })

        return NextResponse.json({ message: 'Order created successfully', order }, { status: 201 });

    } catch (error: any) {
        console.error('[CREATE_ORDER_ERROR]', error);
        return NextResponse.json({ error: 'Server error', details: error.message }, { status: 500 });
    }
}
