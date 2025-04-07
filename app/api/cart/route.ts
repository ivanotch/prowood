import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import { authenticate } from "@/utils/auth";

export async function POST(req: Request) {
    const user = await authenticate(req)
    if (!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 400 })
    }

    const { productId, quantity } = await req.json();
    if (!productId || !quantity || quantity <= 0) {
        return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    try {

        const product = await prisma.product.findUnique({
            where: {
                product_id: productId
            }
        })

        if (!product) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 })
        }

        const existingCart = await prisma.cart.findUnique({
            where: {
                customerId_productId: {
                    customerId: user.userId,
                    productId
                }
            }
        })

        if (existingCart) {
            const addQty = await prisma.cart.update({
                where: {
                    customerId_productId: {
                        customerId: user.userId,
                        productId
                    }
                },
                data: {
                    quantity: existingCart.quantity + quantity
                }
            })

            return NextResponse.json({ message: "quantity added successfully" }, { status: 200 })
        } else {

            const create = await prisma.cart.create({
                data: {
                    customerId: user.userId,
                    productId,
                    quantity
                }
            });

            return NextResponse.json({ message: "Item added to cart" }, { status: 200 })
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    const user = await authenticate(req);
    if (!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    try {
        const cart = await prisma.cart.findMany({
            where: {
                customerId: user.userId
            },
            include: {
                product: true
            }
        })

        return NextResponse.json({ cartItem: cart }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Server Error" }, { status: 500 })
    }
}

export async function PATCH(req: Request) {
    const user = await authenticate(req);
    if (!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await req.json();

    if (!productId) {
        return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
    }

    try {
        const cartItem = await prisma.cart.findUnique({
            where: {
                customerId_productId: {
                    customerId: user.userId,
                    productId,
                },
            },
        });

        if (!cartItem) {
            return NextResponse.json({ message: "Product not in cart" }, { status: 404 });
        }

        if (cartItem.quantity <= 1) {
            await prisma.cart.delete({
                where: {
                    customerId_productId: {
                        customerId: user.userId,
                        productId,
                    },
                },
            });
            return NextResponse.json({ message: "Item removed from cart" }, { status: 200 });
        } else {
            const updatedItem = await prisma.cart.update({
                where: {
                    customerId_productId: {
                        customerId: user.userId,
                        productId,
                    },
                },
                data: {
                    quantity: {
                        decrement: 1,
                    },
                },
            });
            return NextResponse.json({ message: "Quantity decreased", cartItem: updatedItem }, { status: 200 });
        }
    } catch (error) {
        console.error("Error updating cart:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const user = await authenticate(req);
    if (!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 404 });
    }

    const { productId } = await req.json();
    if (!productId) {
        return NextResponse.json({ message: "Product Id Required!" }, { status: 400 });
    }

    try {
        const existingCartItem = await prisma.cart.findUnique({
            where: {
                customerId_productId: {
                    customerId: user.userId,
                    productId
                }
            }
        })

        if (!existingCartItem) {
            return NextResponse.json({ message: "No such item exist in cart" }, { status: 404 });
        }
        
        await prisma.cart.delete({
            where: {
                customerId_productId: {
                    customerId: user.userId,
                    productId
                }
            }
        })

        return NextResponse.json({ message: "Item on cart deleted successfully" }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: "Server Error" }, { status: 500 })
    }
}