'use client'
import { useState } from "react"
import CartTable from "./CartTable";
import { useCartStore } from "@/stores/cartStores";
import { useRouter } from "next/navigation";

export default function CartClient() {

    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const cartData = useCartStore((state) => state.cartItems)
    const setCartData = useCartStore((state) => state.setCart);
    const router = useRouter()


    const isAllSelected = selectedItems.length === cartData.length;

    const toggleSelectAll = () => {
        if (isAllSelected) {
            setSelectedItems([]);
        } else {
            setSelectedItems(cartData.map(item => item.productId));
        }
    };

    const handleDelete = async () => {
        try {
            const res = await fetch(`/api/cart/delete-multiple`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ productIds: selectedItems })
            });

            if (res.ok) {
                console.log("deleted successfully");
                setSelectedItems([])
                const newCartRes = await fetch("/api/cart");
                const newCartData = await newCartRes.json()
                setCartData(newCartData.cartItem);
            } else {
                console.log("unsuccessful");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCheckout = () => {
        if (selectedItems.length === 0) return;

        const query = selectedItems.map(id => `ids=${id}`).join("&");
        router.push(`/shop/checkout?${query}`);
    }

    return (
        <>
            <div className="mt-[1rem] w-[90%] mx-[auto] border border-gray-400 rounded-md p-5 mb-[6rem]">
                <div className="mb-[2rem]">
                    <p className="text-[1.4rem] font-bold">Start Upgrading Your Home!</p>
                    <p className="text-[1.1rem]">Here's your cart list.</p>
                </div>
                <CartTable
                    cartProduct={cartData}
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                />
            </div>
            <div
                id="bottom"
                className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full lg:w-[90%] max-w-7xl bg-white shadow-md border-t border-gray-300 p-4 flex justify-between z-10"
            >
                <div className="flex items-center gap-2">
                    <input type="checkbox" id="selectAll"
                        className="w-4 h-4 accent-main"
                        checked={isAllSelected}
                        onChange={toggleSelectAll}
                    />
                    <label htmlFor="selectAll" className="text-sm">Select All</label>
                    <button onClick={handleDelete} className="ml-2 text-red-600 font-medium">Delete</button>
                </div>
                <div className="flex items-center gap-4">
                    <p className="text-sm font-medium">Total ({selectedItems.length} items)</p>
                    <button onClick={handleCheckout} className="bg-main text-white px-4 py-3 text-[1.2rem] rounded-md text-sm">Checkout</button>
                </div>
            </div>

        </>

    )
}