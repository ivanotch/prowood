'use client'
import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";


type Product = {
    product_id: string;
    name: string;
    category: string;
    description: string;
    pricePerUnit: string;
    productImage: string;
    stock: number;
    createdAt: Date;
}

export default function InventoryTable({ product, index }: { product: Product, index: number }) {
    const [stock, setStock] = useState(1);


    return (
        <TableRow className="">
            <TableCell className="font-medium">{product.product_id}</TableCell>
            <TableCell className='max-w-[200px]'>{product.name}</TableCell>
            <TableCell>₱{product.pricePerUnit}</TableCell>
            <TableCell>{product.stock}</TableCell>
            <TableCell>{product.stock > 50 ? <p className='font-bold text-green-900'>High Stock</p> : <p className='font-bold text-red-900'>Low Stock</p>}</TableCell>
            <TableCell>
                <Dialog>
                    <DialogTrigger>Edit Stock</DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Stock: {product.name}</DialogTitle>
                            <div className="flex gap-3 items-center">
                                <div className="flex items-center">
                                    <button className="border-2 p-3" onClick={() => setStock(q => Math.max(1, stock - 1))}>-</button>
                                    <span className="border-2 p-3">{product.stock}</span>
                                    <button className="border-2 p-3" onClick={() => setStock(q => Math.min(product.stock, q + 1))}>+</button>
                                </div>
                            </div>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </TableCell>
        </TableRow>

    )
} 