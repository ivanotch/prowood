
'use client'
import { FaOpencart } from "react-icons/fa6";
import { useState, useEffect } from "react";
import Image from 'next/image';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import Link from "next/link";
import AvatarProfile from "../avatar/Avatar";
import { useCartStore } from "@/stores/cartStores";


interface User {
    userId: string;
    email: string;
    name: string;
}

interface Product {
    product_id: string;
    name: string;
    description: string;
    stock: number;
    pricePerUnit: number;
    productImage: string | null;
    category: string | null;
}

interface CartItem {
    productId: string;
    quantity: number;
    customerId: string;
    product: Product;
}


export default function Nav() {

    const [user, setUser] = useState<User | null>(null);
    const cartItems = useCartStore((state) => state.cartItems);


    useEffect(() => {
        fetch('/api/user')
            .then(res => res.json())
            .then(data => setUser(data.user));
    }, []);


    console.log("cartItems", cartItems)

    return (
        <div id="hero-nav" className="flex justify-between h-[3.8rem] rounded-md items-center bg-[#1a1e25]">
            <div className="flex text-white font-inter gap-6 ml-[1rem]">
                <a href="/shop" className="text-[1.2rem]">HOME</a>
            </div>

            <div className="font-epilogue font-bold text-[#720D1C] text-[1.7rem]">
                PROWOOD
            </div>

            <div className="flex text-white font-inter gap-6 mr-[1rem]">
                {user != null && <AvatarProfile />}

                <Popover>
                    <PopoverTrigger asChild>
                        <button>
                            <FaOpencart className="font-extrabold text-[2rem]" />
                        </button>
                    </PopoverTrigger>

                    <PopoverContent className="w-90 text-center max-h-[40rem] relative p-0">
                        {user != null && Array.isArray(cartItems) && cartItems.length > 0 && (
                            <>
                                {/* Scrollable content wrapper */}
                                <div className="overflow-y-auto max-h-[34rem] px-4 pt-4 pb-[4rem] text-left">
                                    {cartItems.map((item, index) => (
                                        <div
                                            key={index}
                                            className="border-b rounded p-4 mb-4 shadow flex items-center justify-between"
                                        >
                                            <Image
                                                src={String(item.product.productImage)}
                                                alt="Product Image"
                                                width={50}
                                                height={50}
                                                className="object-cover rounded"
                                            />
                                            <div className="flex flex-col ml-4 flex-1">
                                                <p className="text-lg font-bold">
                                                    {item.product.name.length > 20
                                                        ? `${item.product.name.slice(0, 20)}...`
                                                        : item.product.name}
                                                </p>
                                                <p>{item.product.category}</p>
                                            </div>
                                            <p>
                                                <span className="text-[1.3rem]">₱</span>
                                                {item.product.pricePerUnit}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Fixed bottom button */}
                                <div className="absolute bottom-0 left-0 w-full bg-white border-t p-4">
                                    <Link
                                        href="/shop/cart"
                                        className="block w-full text-center py-2 px-6 border-2 text-main border-main font-semibold rounded-lg"
                                    >
                                        View Cart
                                    </Link>
                                </div>
                            </>
                        )}

                        {user == null && (
                            <div className="p-4">
                                <div className="my-6 text-[1.2rem]">Login to see Cart Items.</div>
                                <Link
                                    href="/login"
                                    className="py-2 px-6 border-[2px] text-main border-main font-semibold rounded-lg"
                                >
                                    Login
                                </Link>
                            </div>
                        )}
                    </PopoverContent>
                </Popover>


            </div>
        </div>
    )
}