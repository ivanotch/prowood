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
import { useState, useEffect } from "react"

type CartItem = {
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
};

interface CartTableProps {
    cartProduct: CartItem[];
    selectedItems: string[];
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function CartTable({ cartProduct, selectedItems, setSelectedItems }: CartTableProps) {

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    
    useEffect(() => {
        setCartItems(cartProduct);
    }, [cartProduct]);

    const isAllSelected = selectedItems.length === cartProduct.length;

    const handleDelete = async ({ productId }: { productId: string }) => {
        try {
            const res = await fetch(`/api/cart?productId=${productId}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                console.log("deleted successfully");
            } else {
                console.log("unsuccessful");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const toggleSelectAll = () => {
        if (isAllSelected) {
            setSelectedItems([]);
        } else {
            setSelectedItems(cartProduct.map(item => item.productId));
        }
    };

    const toggleSelectOne = (productId: string) => {
        setSelectedItems(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const updateQuantity = async (productId: string, newQty: number) => {
        try {
            const res = await fetch('/api/cart', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId, quantity: newQty }),
            });

            if (!res.ok) {
                throw new Error('Failed to update quantity');
            }

            // Update UI after success
            setCartItems(prev =>
                prev.map(item =>
                    item.productId === productId ? { ...item, quantity: newQty } : item
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (

        <Table className="border-2 rounded-lg">
            <TableCaption>A list of your Cart.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-[1.1rem] text-center">
                        <input
                            className="w-[19px] h-[19px] accent-main"
                            type="checkbox"
                            checked={isAllSelected}
                            onChange={toggleSelectAll}
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
                {/* {cartItems.length === 0 && (
                    <p className="text-center py-4 text-gray-500">Your cart is empty.</p>
                )} */}
                {cartItems.map((product, index) => (
                    <TableRow key={index}>
                        <TableCell className="text-center">
                            <input
                                className="w-[19px] h-[19px] accent-main"
                                type="checkbox"
                                checked={selectedItems.includes(product.productId)}
                                onChange={() => toggleSelectOne(product.productId)}
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
                                <button className="border-2 px-2" onClick={() =>
                                    updateQuantity(product.productId, Math.max(1, product.quantity - 1))
                                }>-</button>
                                <span className="border-2 px-2">{product.quantity}</span>
                                <button className="border-2 px-2" onClick={() =>
                                    updateQuantity(product.productId, Math.min(product.product.stock, product.quantity + 1))
                                }>+</button>
                            </div>
                        </TableCell>
                        <TableCell className=""><span className="text-[1.3rem]">₱</span>{product.product.pricePerUnit * product.quantity}</TableCell>
                        <TableCell className="text-right text-main text-[1.05rem]">
                            <button onClick={() => handleDelete({ productId: product.productId })}>Delete</button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}