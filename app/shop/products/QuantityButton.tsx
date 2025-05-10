'use client'

import { Product } from "@prisma/client";
import { useState } from "react"
import { FaOpencart } from "react-icons/fa6";

export default function QuantityButton({ product }: { product: any }) {

    const [quantity, setQuantity] = useState(1);

    const addToCart = async ({productId, quantity}: {productId: string, quantity: number}) => {

        try {
            const res = await fetch('/api/cart', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({productId, quantity})
            })

            if (!res.ok) {
                console.log('unsuccessful')
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
                <button className="p-1 w-[60%] text-white bg-main">Buy</button>

                <button onClick={() => addToCart({ productId: product.product_id, quantity })}  className="p-1 w-[40%] border-2 text-subMain border-subMain flex items-center justify-center">
                    <FaOpencart className="text-[2rem]" />
                </button>
            </div>
        </div>
    )
}