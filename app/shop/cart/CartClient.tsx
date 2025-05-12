'use client'
import { useState } from "react"
import CartTable from "./CartTable";

interface CartClientProps {
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

export default function CartClient({ cartProduct }: CartClientProps) {

    const [selectedItems, setSelectedItems] = useState<string[]>([])

    return (
        <>
            <div className="mt-[1rem] w-[90%] mx-[auto] border border-gray-400 rounded-md p-5 mb-[6rem]">
                <div className="mb-[2rem]">
                    <p className="text-[1.4rem] font-bold">Start Upgrading Your Home!</p>
                    <p className="text-[1.1rem]">Here's your cart list.</p>
                </div>
                <CartTable
                    cartProduct={cartProduct}
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                />
            </div>
            <div
                id="bottom"
                className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full lg:w-[90%] max-w-7xl bg-white shadow-md border-t border-gray-300 p-4 flex justify-between z-10"
            >
                <div className="flex items-center gap-2">
                    <input type="checkbox" id="selectAll" className="w-4 h-4 accent-main" />
                    <label htmlFor="selectAll" className="text-sm">Select All</label>
                    <button className="ml-2 text-red-600 font-medium">Delete</button>
                </div> 
                <div className="flex items-center gap-4">
                    <p className="text-sm font-medium">Total (0 items)</p>
                    <button className="bg-main text-white px-4 py-3 text-[1.2rem] rounded-md text-sm">Checkout</button>
                </div>
            </div>

        </>

    )
}