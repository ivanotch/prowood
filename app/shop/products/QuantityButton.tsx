'use client'

import { useEffect, useState } from "react"
import { FaOpencart } from "react-icons/fa6";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { useCartStore } from "@/stores/cartStores";
import { useRouter } from "next/navigation";

interface User {
    userId: String;
    name: String;
    email: String;
}

export default function QuantityButton({ product }: { product: any }) {

    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetch('/api/user')
            .then(res => res.json())
            .then(data => setUser(data.user));

    }, [])

    const addToCart = async ({ productId, quantity }: { productId: string, quantity: number }) => {

        try {
            const res = await fetch('/api/cart', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ productId, quantity })
            })

            if (!res.ok) {
                console.log('unsuccessful')
            } else {
                const updatedCartRes = await fetch('/api/cart');
                const updatedCartData = await updatedCartRes.json();
                useCartStore.getState().setCart(updatedCartData.cartItem);
            }
        } catch (error) {
            console.error("An unexpected error occurred haha:", error);
        }
    }

    const handleBuy = async ({ productId, quantity }: { productId: string, quantity: number }) => {
        try {
            const res = await fetch('/api/cart', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ productId, quantity })
            })

            if (!res.ok) {
                console.log('unsuccessful')
            } else {
                const updatedCartRes = await fetch('/api/cart');
                const updatedCartData = await updatedCartRes.json();
                useCartStore.getState().setCart(updatedCartData.cartItem);

                const query = `ids=${productId}`;
                router.push(`/shop/checkout?${query}`);
            }
        } catch (error) {
            console.error("An unexpected error occurred haha:", error);
        }
    }

    return (

        <div>
            <div className="mb-[1rem]">
                <div className="flex gap-3 items-center">
                    <p >Quantity: </p>
                    <div className="flex items-center">
                        <button className="border-2 p-3" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                        <span className="border-2 p-3">{quantity}</span>
                        <button className="border-2 p-3" onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}>+</button>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center mb-[1rem]">
                <p className="mt-2 text-[1.6rem] font-medium text-main">Price: <span className="text-[1.3rem]">₱</span>{product.pricePerUnit}</p>
                <p className="">Stock: {product.stock}</p>
            </div>

            <div className="flex gap-2 mb-[2.6rem]">
                <Button onClick={() => handleBuy({ productId: product.product_id, quantity })} className="p-1 w-[60%] text-white bg-main">Buy</Button>

                {user && (
                    <Button onClick={() => addToCart({ productId: product.product_id, quantity })} className="p-1 w-[40%] border-2 text-subMain border-subMain flex items-center justify-center" variant="outline"><FaOpencart className="text-[2rem]" /></Button>
                )}

                {!user && (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button className="p-1 w-[40%] border-2 text-subMain border-subMain flex items-center justify-center" variant="outline"><FaOpencart className="text-[2rem]" /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-center">Log in first to add to Cart</AlertDialogTitle>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <Link href="/login"><AlertDialogAction>Login</AlertDialogAction></Link>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}
            </div>
        </div>
    )
}