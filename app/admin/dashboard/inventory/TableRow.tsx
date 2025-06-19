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
    DialogClose,
    DialogFooter
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

export default function InventoryTable({ product, onRefresh }: { product: Product, onRefresh: () => void }) {
    const [stock, setStock] = useState(product.stock);
    const [isOpen, setIsOpen] = useState(false);

    const isInvalid = stock < 1 || stock === product.stock;


    useEffect(() => {
        if (isOpen) {
            setStock(product.stock);
        }
    }, [isOpen, product.stock]);

    const handleStock = async () => {
        try {
            const res = await fetch(`/api/admin/stock/${product.product_id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ stock })
            })

            if (res.ok) {
                const updated = await res.json();
                console.log(updated);
                console.log("stock updated successfully")

                onRefresh()
            } else {
                console.log("Failed to update stock")
            }
        } catch (error) {
            console.log(error, "Failed to edit stock")
        }
    }

    return (
        <TableRow className="">
            <TableCell className="font-medium">{product.product_id}</TableCell>
            <TableCell className='max-w-[200px]'>{product.name}</TableCell>
            <TableCell>₱{product.pricePerUnit}</TableCell>
            <TableCell>{product.stock}</TableCell>
            <TableCell>{product.stock > 50 ? <p className='font-bold text-green-900'>High Stock</p> : <p className='font-bold text-red-900'>Low Stock</p>}</TableCell>
            <TableCell>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger>Edit Stock</DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Stock: {product.name}</DialogTitle>
                            <div className="flex gap-3 justify-center">
                                <div className="flex items-center">
                                    <button className="border-2 p-3" onClick={() => setStock(q => Math.max(1, stock - 1))}>-</button>
                                    <span className="border-2 p-3">{stock}</span>
                                    <button className="border-2 p-3" onClick={() => setStock(q => Math.min(q + 1))}>+</button>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                {stock < product.stock ?
                                    <div className="text-red-900">Removing: {Number(product.stock - stock)}</div>
                                    :
                                    <div className="text-blue-900">Adding: {Number(stock - product.stock)}</div>
                                }
                            </div>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" onClick={
                                    () => setStock(product.stock)
                                } >Cancel</Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button
                                    onClick={async () => {
                                        await handleStock();
                                    }}
                                    disabled={isInvalid}
                                >
                                    Submit
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </TableCell>
        </TableRow>

    )
} 