
'use client'
import { FaOpencart } from "react-icons/fa6";
import { useState, useEffect } from "react";
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import Link from "next/link";

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
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        fetch('/api/user')
            .then(res => res.json())
            .then(data => setUser(data.user));


        const fetchCart = async () => {
            try {
                const res = await fetch('/api/cart');
                const data = await res.json();
                setCartItems(data.cartItem);
            } catch (err) {
                console.error('Failed to fetch cart:', err);
            }
        };

        fetchCart();
    }, []);

    const handleLogout = async () => {
        const res = await fetch("/api/logout/", {
            method: 'POST',
        })

        if (res.ok) {
            window.location.href = '/shop';
        } else {
            console.error("logout failed")
        }
    }

    return (
        <div id="hero-nav" className="flex justify-between h-[3.8rem] rounded-md items-center bg-[#1a1e25]">
            <div className="flex text-white font-inter gap-6 ml-[1rem]">
                <a href="/shop" className="text-[1.2rem]">HOME</a>
            </div>

            <div className="font-epilogue font-bold text-[#720D1C] text-[1.7rem]">
                PROWOOD
            </div>

            <div className="flex text-white font-inter gap-6 mr-[1rem]">
                {user != null && 
                <Popover>
                    <PopoverTrigger asChild>
                        <Avatar>
                            <AvatarImage />
                            <AvatarFallback className="text-black">
                                {user?.name?.split(" ").map(w => w[0]).join("").toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </PopoverTrigger>
                    <PopoverContent className="w-50 text-center flex flex-col gap-3">
                        <a href="/shop" className="border-b-3 border-slate-400 p-1">Home</a>
                        <a href="/shop/cart" className="border-b-3 border-slate-400 p-1">View Cart</a>
                        <button onClick={handleLogout} className="rounded-md p-1 bg-red-800 font-bold text-white">Log out</button>
                    </PopoverContent>
                </Popover>}

                <Popover>
                    <PopoverTrigger asChild>
                        <button><FaOpencart className="font-extrabold text-[2rem]" /></button>
                    </PopoverTrigger>
                    <PopoverContent className="w-90 text-center">
                        {user != null && Array.isArray(cartItems) && cartItems.length > 0 && (
                            <>
                                <div className="text-left">
                                    {cartItems.map((item, index) => (
                                        <div key={index} className="border-b rounded p-4 mb-4 shadow items-center justify-between flex">
                                            <Image src={String(item.product.productImage)} alt="Product Image"
                                                width={50}
                                                height={50}
                                                className="object-cover rounded"
                                            />
                                            <div className="flex flex-col">
                                                <p className="text-lg font-bold">{item.product.name.length > 20 ? `${item.product.name.slice(0, 20)}...` : item.product.name}</p>
                                                <p>{item.product.category}</p>
                                            </div>
                                            <p><span className="text-[1.3rem]">₱</span>{item.product.pricePerUnit}</p>
                                        </div>
                                    ))}
                                </div>

                                <Link href="/shop/cart" className="py-2 px-6 border-[2px] text-main border-main font-600 rounded-lg"> View Cart </Link>

                            </>
                        )}

                        {user == null && (
                            <>
                                <div className="my-[2rem] text-[1.2rem]">Login to see Cart Items.</div>
                                <Link href="/login" className="py-2 px-6 border-[2px] text-main border-main font-600 rounded-lg">Login</Link>
                            </>
                        )}



                    </PopoverContent>
                </Popover>

            </div>
        </div>
    )
}