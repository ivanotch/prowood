'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react"


export default function AvatarProfile() {

    interface User {
        userId: string;
        email: string;
        name: string;
    }

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        fetch('/api/user')
            .then(res => res.json())
            .then(data => setUser(data.user));
    }, [])

    const handleLogout = async () => {
        try {
            const res = await fetch('api/logout/', {
                method: 'POST',
            })

            if (res.ok) {
                window.location.href = '/shop';
            } else {
                console.error("logout failed")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
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
                <a href="/shop/products" className="border-b-3 border-slate-400 p-1">Shop</a>
                <a href="/shop/cart" className="border-b-3 border-slate-400 p-1">View Cart</a>
                <button onClick={handleLogout} className="rounded-md p-1 bg-red-800 font-bold text-white">Log out</button>
            </PopoverContent>
        </Popover>
    )
}