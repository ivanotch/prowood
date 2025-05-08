'use client'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from "next/image"
import { useState } from "react"


interface CartTableProps {
    cartProduct: {
        product: {
            name: string;
            product_id: string;
            description: string;
            stock: number;
            pricePerUnit: number;
            productImage: string | null;
            category: string | null;
        };
        quantity: number;
        customerId: string;
        productId: string;
    }[];
}

export default function CartTable({ cartProduct }: CartTableProps) {
    console.log(cartProduct)

    const [quantity, setQuantity] = useState(1);

    return (
        <Table className="border-2 rounded-lg">
            <TableCaption>A list of your Cart.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-[1.1rem] text-center">
                        <input
                            className="w-[19px] h-[19px] accent-main"
                            type="checkbox"
                        />
                    </TableHead>
                    <TableHead className="text-[1.1rem]">Product</TableHead>
                    <TableHead className="text-[1.1rem]">Unit Price</TableHead>
                    <TableHead className="text-[1.1rem]">Quantity</TableHead>
                    <TableHead className="text-[1.1rem]">Total Price</TableHead>
                    <TableHead className="text-right text-[1.1rem]">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {cartProduct.map((product, index) => (
                    <TableRow key={index}>
                        <TableCell className="text-center">
                            <input
                                className="w-[19px] h-[19px] accent-main"
                                type="checkbox"
                            />
                        </TableCell>

                        <TableCell className="font-medium">
                            <div className=" items-center flex">
                                <Image src={String(product.product.productImage)} alt="Product Image"
                                    width={70}
                                    height={70}
                                    className="object-cover rounded mr-[1rem]"
                                />
                                <p className="text-lg font-bold">{product.product.name.length > 20 ? `${product.product.name.slice(0, 20)}...` : product.product.name}</p>
                            </div>
                        </TableCell>

                        <TableCell><span className="text-[1.3rem]">₱</span>{product.product.pricePerUnit}</TableCell>

                        <TableCell className="text-center">
                            <div className="flex items-center">
                                <button className="border-2 px-2" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                                <span className="border-2 px-2">{quantity}</span>
                                <button className="border-2 px-2" onClick={() => setQuantity(q => Math.min(80, q + 1))}>+</button>
                            </div>
                        </TableCell>
                        <TableCell className=""><span className="text-[1.3rem]">₱</span>{product.product.pricePerUnit * quantity}</TableCell>
                        <TableCell className="text-right text-main text-[1.05rem]">Delete</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}