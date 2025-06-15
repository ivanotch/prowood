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
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import Image from "next/image";
import { useEffect } from "react";
import { Divide } from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils"; // for conditional classes if you're using ShadCN
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ModeOfPayment } from "@prisma/client";


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

type CartItem = {
    productId: string;
    name: string;
    productImage: string
    quantity: number;
    pricePerUnit: number;
    stock: number;
}

type HandleOrderAdded = () => void;

export default function OrderUi({ handleOrderAdded }: { handleOrderAdded: HandleOrderAdded }) {
    const [products, setProducts] = useState<Product[]>([])
    const [cart, setCart] = useState<CartItem[]>([])
    const [step, setStep] = useState(1);
    const [error, setError] = useState("")
    const [selectedPayment, setSelectedPayment] = useState<string>("");
    const [addressData, setAddressData] = useState({
        firstname: "",
        lastName: "",
        contact: "",
        street: "",
        apartment: "",
        zipCode: "",
        city: "",
        country: "",
        region: "",
    })


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

    const onSubmitOrder = async () => {
        try {
            const res = await fetch("/api/admin/order/", {
                method: "POST",
                credentials: "include",
                headers: { "Contect-type": "application/json" },
                body: JSON.stringify({ name: addressData.firstname + " " + addressData.lastName, addressData, cart: cart, modeOfPayment: selectedPayment })
            })

            if (!res.ok) {
                const data = await res.json();
                console.log(data.error);
                setError(data.error)
            } else {
                setAddressData({
                    firstname: "",
                    lastName: "",
                    contact: "",
                    street: "",
                    apartment: "",
                    zipCode: "",
                    city: "",
                    country: "",
                    region: "",
                })
                setStep(1);
                setCart([])
                handleOrderAdded();
            }
        } catch (err) {
            console.error("An unexpected error occurred haha:", error);
        }
    }

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

                    <div className="flex flex-col md:flex-row gap-4 mt-4">
                        {/* Left Side: Search + Items */}
                        {step === 1 ?
                            <div className="flex flex-col gap-1 w-full md:w-[64%]">
                                {/* Search Bar */}
                                <div className="w-full p-1 border-2 rounded-md">
                                    Search Bar
                                </div>

                                {/* Scrollable Browse Items */}
                                <div className="w-full overflow-y-auto max-h-[60vh] md:pr-2">
                                    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                                        {products.map((product, index) => (
                                            <div
                                                onClick={() => {
                                                    setCart(prevCart => {
                                                        const existingProductIndex = prevCart.findIndex(item => item.productId === product.product_id);

                                                        if (existingProductIndex !== -1) {
                                                            return prevCart.map((item, index) =>
                                                                index === existingProductIndex
                                                                    ? {
                                                                        ...item,
                                                                        quantity: item.quantity + 1 > item.stock ? item.stock : item.quantity + 1 // Optional: prevent going over stock
                                                                    }
                                                                    : item
                                                            );
                                                        }

                                                        return [
                                                            ...prevCart,
                                                            {
                                                                productId: product.product_id,
                                                                name: product.name,
                                                                productImage: product.productImage,
                                                                quantity: 1,
                                                                pricePerUnit: Number(product.pricePerUnit),
                                                                stock: product.stock
                                                            }
                                                        ];
                                                    });
                                                }}

                                                key={index}
                                                className="border-2 h-[15rem] w-full rounded-md overflow-hidden cursor-pointer"
                                            >
                                                <Image
                                                    src={product.productImage}
                                                    alt="Product Image"
                                                    width={150}
                                                    height={150}
                                                    className="w-full h-[70%] object-cover"
                                                />
                                                <div className="p-2 flex flex-col justify-between h-[30%]">
                                                    <div className="text-sm font-medium truncate">{product.name}</div>
                                                    <div className="text-sm text-gray-600 mb-2 text-main">₱{product.pricePerUnit}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="flex flex-col gap-1 w-full max-h-[65vh] overflow-y-scroll md:w-[64%]">
                                <div className="py-5 pl-15">
                                    <div className="flex flex-col gap-4 mb-[2rem]">
                                        <p className="text-[1.4rem] font-[500]">Delivery</p>
                                        <Select onValueChange={(value) => setAddressData({ ...addressData, country: value })}>
                                            <SelectTrigger className="w-[100%] !h-12 py-4">
                                                <SelectValue placeholder="Country" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Philippines">Philippines</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <div className="flex gap-4">
                                            <Input
                                                className="h-12"
                                                placeholder="First Name"
                                                onChange={(e) => setAddressData({ ...addressData, firstname: e.target.value })}
                                            />
                                            <Input
                                                className="h-12"
                                                placeholder="Last Name"
                                                onChange={(e) => setAddressData({ ...addressData, lastName: e.target.value })}
                                            />
                                        </div>
                                        <Input
                                            className="h-12"
                                            placeholder="Address"
                                            onChange={(e) => setAddressData({ ...addressData, street: e.target.value })}
                                        />
                                        <Input
                                            className="h-12"
                                            placeholder="Appartment, suite, etc. (Optional)"
                                            onChange={(e) => setAddressData({ ...addressData, apartment: e.target.value })}
                                        />
                                        <div className="flex gap-4">
                                            <Input className="h-12" placeholder="Postal"
                                                onChange={(e) => setAddressData({ ...addressData, zipCode: e.target.value })}
                                            />
                                            <Input className="h-12" placeholder="City"
                                                onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
                                            />
                                        </div>
                                        <Select onValueChange={(value) => setAddressData({ ...addressData, region: value })}>
                                            <SelectTrigger className="w-[100%] !h-12">
                                                <SelectValue placeholder="Region" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Rizal">Rizal</SelectItem>
                                                <SelectItem value="Metro Manila">Metro Manila</SelectItem>
                                                <SelectItem value="Quezon">Quezon</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Input className="h-12" placeholder="Phone"  onChange={(e) => setAddressData({ ...addressData, contact: e.target.value })} />
                                    </div>
                                    <div>
                                        <p className="text-[1.4rem] font-[500]">Payment</p>

                                        <Accordion
                                            type="single"
                                            collapsible
                                            value={selectedPayment}
                                            onValueChange={(val) => {
                                                if (val) setSelectedPayment(val);
                                            }} className="mt-4"
                                        >
                                            <AccordionItem value="xendit" className="border border-gray-300 rounded-lg">
                                                <AccordionTrigger className="flex items-center justify-between px-4 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <span
                                                            className={cn(
                                                                "w-4 h-4 rounded-full border-2 border-gray-500",
                                                                selectedPayment === "xendit" && "bg-transparent border-black border-6"
                                                            )}
                                                        />
                                                        <span className="text-[1rem] font-medium">Payments by Xendit</span>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="px-6 pb-4 text-sm text-muted-foreground">
                                                    You will be redirected to Xendit to complete your payment securely.
                                                </AccordionContent>
                                            </AccordionItem>

                                            <AccordionItem value="CASH" className="border border-gray-300 rounded-lg mt-2">
                                                <AccordionTrigger className="flex items-center justify-between px-4 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <span
                                                            className={cn(
                                                                "w-4 h-4 rounded-full border-2 border-gray-500",
                                                                selectedPayment === "CASH" && "bg-transparent border-black border-6"
                                                            )}
                                                        />
                                                        <span className="text-[1rem] font-medium">Pay In-Store</span>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="px-6 pb-4 text-sm text-muted-foreground">
                                                    You can pay directly at the store during pickup.
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </div>
                                </div>
                            </div>
                        }


                        {/* Right Side: Cart */}
                        <div className="w-full md:w-[35%] flex flex-col max-h-[65vh] border rounded-md">
                            {/* Scrollable Cart Items */}
                            <div className="overflow-y-auto flex-grow">
                                {cart && cart.map((cartItems, index) => (
                                    <div className="h-[5rem] border-1 w-full rounded-lg overflow-hidden flex" key={index}>
                                        <Image
                                            src={cartItems.productImage}
                                            alt="Product Image"
                                            width={50}
                                            height={50}
                                            className="object-cover"
                                        />
                                        <div className="w-full flex flex-col p-3 gap-1">
                                            <div className="text-[1.2rem] font-semibold text-main line-clamp-2">
                                                {cartItems.name}
                                            </div>                                            <div className="flex gap-4">
                                                <div className="text-[0.9rem] text-slate-600">x{cartItems.quantity}</div>
                                                <div className="font-semibold">₱{(cartItems.pricePerUnit * cartItems.quantity).toLocaleString()}</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-3 items-center">
                                            <p >Quantity: </p>
                                            <div className="flex items-center">
                                                <button className="border-1 p-1" onClick={() => {
                                                    setCart(prevCart => {
                                                        const updatedCart = prevCart.map((item, i) => {
                                                            if (i === index && item.quantity > 1) {
                                                                return { ...item, quantity: item.quantity - 1 };
                                                            }
                                                            return item;
                                                        });

                                                        // If quantity is 1, remove the item
                                                        if (prevCart[index].quantity === 1) {
                                                            return prevCart.filter((_, i) => i !== index);
                                                        }

                                                        return updatedCart;
                                                    });
                                                }}>-</button>
                                                <span className="border-1 p-1">{cartItems.quantity}</span>
                                                <button className="border-1 p-1" onClick={() => {
                                                    setCart(prevCart =>
                                                        prevCart.map((item, i) =>
                                                            i === index
                                                                ? {
                                                                    ...item,
                                                                    quantity: item.quantity < item.stock ? item.quantity + 1 : item.stock
                                                                }
                                                                : item
                                                        )
                                                    );
                                                }}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Fixed Amount Footer */}
                            <div className="border-t p-3 bg-white sticky bottom-0 z-10">
                                <strong>Total Amount:</strong> ₱
                                {cart.reduce((acc, item) => acc + item.pricePerUnit * item.quantity, 0).toLocaleString()}
                            </div>
                        </div>
                    </div>


                    {/* Action Buttons */}
                </DialogHeader>
                <DialogFooter>

                    {step === 1 ? (
                        <DialogClose asChild>
                            <Button onClick={() => {
                                setCart([])
                                setError("")
                            }} variant="outline">Cancel</Button>
                        </DialogClose>
                    ) : (
                        <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                    )}

                    {step === 1 ? (
                        <Button type="button" onClick={() => {
                            if (cart.length !== 0) {
                                setStep(2);
                                setError("");
                            } else {
                                setError("No Added Items");
                            }
                        }}>Next</Button>
                    ) : (
                        <DialogClose asChild>
                            <Button type="submit" onClick={onSubmitOrder}>Submit</Button>
                        </DialogClose>
                    )}
                </DialogFooter>
                {error && <div className="w-full text-red-900 text-center">{error}</div>}
            </DialogContent>
        </Dialog>




    )
}