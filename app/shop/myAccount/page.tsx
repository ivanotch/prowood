'use client'
import Link from "next/link"
import { FaOpencart } from "react-icons/fa6"
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { LiaCopyrightSolid } from "react-icons/lia";
import { CgProfile } from "react-icons/cg";
import { SiMinutemailer } from "react-icons/si";
import { FaAddressBook } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image";

enum PaymentStatus {
    PAYED = "PAYED",
    INITIAL_DOWNPAYMENT = "INITIAL_DOWNPAYMENT",
    UNPAID = "UNPAID",
}

enum DeliveryStatus {
    NOT_SHIPPED = "NOT_SHIPPED",
    PACKED = "PACKED",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
    CANCELED = "CANCELED",
}

enum ModeOfPayment {
    CASH = "CASH",
    CREDIT_CARD = "CREDIT_CARD",
    BANK_TRANSFER = "BANK_TRANSFER",
    GCASH = "GCASH",
    OTHER = "OTHER",
}

export default function MyAccount() {

    interface User {
        userId: string;
        email: string;
        name: string;
        address: string;
        contact: string;
    }

    interface Product {
        product_id: string;
        name: string;
        pricePerUnit: number;
        description: string;
        category: string;
        productImage: string;
    }

    interface Item {
        orderItemId: string;
        order_id: string;
        productId: string;
        product: Product;
        quantity: number;
    }

    interface Order {
        order_id: string;
        customerId: string;
        approvedBy?: string;

        paymentStatus: PaymentStatus;
        deliveryStatus: DeliveryStatus;
        deliveryDate?: Date;
        modeOfPayment: ModeOfPayment;
        accomplishedDate?: Date;
        items: Item[]
    }

    const [user, setUser] = useState<User | null>(null);
    const [orderData, setOrderData] = useState<Order[] | null>([]);

    useEffect(() => {
        fetch('/api/user')
            .then(res => res.json())
            .then(data => setUser(data.user));

        fetch('/api/orders')
            .then(res => res.json())
            .then(data => setOrderData(data.orders))
    }, [])

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/logout/', {
                method: 'POST',
                credentials: 'include',
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
        <div className="h-[100vh] pt-[1rem] flex flex-col">
            <nav className="flex items-center w-[100%] justify-between p-3 border-b-2">
                <span className="ml-[1rem]"></span>
                <p className="text-[2.5rem] font-inter text-main font-bold">Pro<span className="text-subMain">wood</span></p>
                <Link href="/shop/cart" className="text-[2rem] mr-[1rem]"><FaOpencart /></Link>
            </nav>
            <div className="flex">
                <div className="w-[30%] p-5 flex flex-col">
                    <header className="text-[1.6rem] font-semibold my-[2.5rem]">Account Details</header>

                    <Avatar className="w-[180px] h-[180px] mx-[auto] mb-[1.5rem]">
                        <AvatarImage />
                        <AvatarFallback className="text-black text-[3rem]">
                            {user?.name?.split(" ").map(w => w[0]).join("").toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="text-[1.2rem] flex flex-col gap-1 p-2 font-inter mb-[1rem]">
                        <p className="flex items-center gap-2"><CgProfile /> {user?.name}</p>
                        <p className="flex items-center gap-2"><SiMinutemailer /> {user?.email}</p>
                    </div>

                    <div className="flex flex-col mb-[1.5rem]">
                        <p className="font-semibold">Default Shipping Address</p>
                        <div className="text-slate-700 text-[1.1rem] flex flex-col gap-2">
                            <p className="flex items-center gap-2"><FaAddressBook /> {user?.address}</p>
                            <p className="flex items-center gap-2"><FaPhone /> {user?.contact}</p>
                        </div>
                    </div>

                    <Button onClick={handleLogout} className="bg-main">Logout</Button>
                </div>
                <div className="w-[70%] p-7">
                    <div className="border-b-2">
                        <header className="text-[1.85rem]">Order History</header>
                    </div>
                    <div className="p-8 h-[30rem] overflow-y-scroll">
                        {orderData?.map((item, index) => (
                            <Accordion key={index} type="single" collapsible className="mb-[0.5rem]">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="flex justify-between">
                                        <div className="text-[1.05rem]">Order ID: {item.order_id}</div>
                                        <div className="flex gap-5">
                                            <div>{item.deliveryStatus} |</div>
                                            <div>{item?.deliveryDate ? item.deliveryDate.toLocaleString() : "No Delivery Date Yet"}</div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        {item.items.map((product, index) => (
                                            <div key={index} className="mb-[0.5rem] flex justify-between items-center">
                                                <div className="flex">
                                                    <Image
                                                        src={String(product.product.productImage)}
                                                        alt="Product Image"
                                                        width={40}
                                                        height={40}
                                                        className="object-cover rounded mr-[1rem]"
                                                    />
                                                    <div className="flec flex-col">
                                                        <div className="font-semibold">{product.product.name}</div>
                                                        <div className="text-slate-700">{product.product.category}</div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-15">
                                                    <div>x{product.quantity}</div>
                                                    <div className="text-main font-semibold">₱{product.quantity * product.product.pricePerUnit}</div>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="mt-4 border-t pt-2 flex justify-end">
                                            <div className="text-md font-semibold">
                                                Total: ₱{item.items.reduce((sum, product) => {
                                                    const price = Number(product.product.pricePerUnit) || 0;
                                                    const qty = Number(product.quantity) || 0;
                                                    return sum + price * qty;
                                                }, 0).toFixed(2)}
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        ))}
                    </div>
                </div>
            </div>

            <footer className="mt-[7rem] pt-[3rem] h-[35vh] text-[#868c96] bg-[#1a1e25] flex flex-col justify-between">
                <div className="pl-[2.5rem] grid grid-cols-4">
                    <div className="col-span-2">
                        <hr className="border-t border-gray-300 my-4" />
                        <ul>
                            <li className="text-[2rem] text-[white] font-[700]">PROWOOD PH</li>
                            <li className="text-[1.1rem]">Quezon City, Philippines.</li>
                        </ul>
                    </div>
                    <div className="flex justify-around col-span-2">
                        <ul className="flex flex-col gap-3">
                            <li className="mb-[1rem]"><a href="">CONTACT</a></li>
                            <li className="text-white"><a href="https://www.facebook.com/prowoodph/">FACEBOOK</a></li>
                            <li className="text-white"><a href="">INSTAGRAM</a></li>
                            <li className="text-white"><a href="">EMAIL</a></li>
                        </ul>
                        <ul className="flex flex-col gap-3">
                            <li className="mb-[1rem]">APP</li>
                            <li className="text-white"><a href="">HOME</a></li>
                            <li className="text-white"><a href="">PRODUCTS</a></li>
                        </ul>
                        <ul className="mt-[3rem]">
                            <li className="text-white"><a href="">ABOUT US</a></li>
                        </ul>

                    </div>
                </div>
                <p className="mx-[auto] flex items-center gap-2 mb-[1rem]">Prowood PH. All rights reserved <LiaCopyrightSolid className="align-middle" /> 2025.</p>
            </footer>
        </div>
    )
}