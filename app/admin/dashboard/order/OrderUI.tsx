'use client'
import { Button } from "@/components/ui/button"
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image";
import { useEffect } from "react";

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

type HandleOrderAdded = () => void;

export default function OrderUi({ handleOrderAdded }: { handleOrderAdded: HandleOrderAdded }) {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        const getItem = async () => {
            try {
                const res = await fetch("/api/products/allProducts/", {
                    credentials: "include"
                })

                if (!res.ok) {
                    throw new Error("Failed to fetch statistics")
                }

                const products = await res.json();
                setProducts(products);
            } catch (error) {
                console.error(error)
            }
        }
        getItem();
    }, [])

    console.log(products)

    return (
        <Dialog>
            <DialogTrigger className="mb-[1rem] bg-black text-white py-1 px-2 rounded-md">
                Add Order
            </DialogTrigger>

            <DialogContent className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl max-h-[95vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex justify-center text-[1.3rem]">
                        Add Order
                    </DialogTitle>

                    {/* Layout wrapper */}
                    <div className="flex flex-col md:flex-row gap-4 mt-4">
                        {/* Left Side: Search + Items */}
                        <div className="flex flex-col gap-1 w-full md:w-[64%]">
                            {/* Search Bar */}
                            <div className="w-full p-1 border-2 rounded-md">
                                Search Bar
                            </div>

                            {/* Scrollable Browse Items */}
                            <div className="w-full overflow-y-auto max-h-[60vh] md:pr-2">
                                <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                                    {products.map((product, index) => (
                                        <div key={index} className="border-2 h-[15rem] w-full">
                                            hi
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Cart */}
                        <div className="w-full md:w-[35%]">
                            Cart Side
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-4 p-2 mt-1">
                        <Button variant="outline">Cancel</Button>
                        <Button>Next</Button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>




    )
}