'use client'
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaOpencart } from "react-icons/fa6";
import { Input } from "@/components/ui/input"
import Image from "next/image";
import { FaCircleDot } from "react-icons/fa6"; // Optional icon
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils"; // for conditional classes if you're using ShadCN
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { useCartStore } from "@/stores/cartStores";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";

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


export default function Checkout() {

    const getProductsByIds = useCartStore((state) => state.getProductsByIds);
    const searchParams = useSearchParams();
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [productsToCheckout, setProductsToCheckout] = useState<CartItem[]>([])

    const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

    const total = productsToCheckout.reduce((acc, item) => {
        return acc + item.product.pricePerUnit * item.quantity;
    }, 200);
    const subTotal = productsToCheckout.reduce((acc, item) => {
        return acc + item.product.pricePerUnit * item.quantity;
    }, 0);
    const formattedSubTotal = subTotal.toLocaleString('en-PH', {
        style: 'currency',
        currency: 'PHP',
    });
    const formattedTotal = total.toLocaleString('en-PH', {
        style: 'currency',
        currency: 'PHP',
    });

    useEffect(() => {
        const ids = searchParams.getAll("ids");
        setSelectedItems(ids);

        const products = getProductsByIds(ids);
        setProductsToCheckout(products);
    }, [searchParams]);
    //should i fetch a data from the product database or create a function in cartStore in zustand tofilter cart item and give me the item base on the id in the selectedItem state

    return (
        <div className="flex flex-col h-[100vh] m-2">
            <nav className="flex items-center w-[100%] justify-between p-3 border-b-2">
                <span className="ml-[1rem]"></span>
                <p className="text-[2.5rem] font-inter text-main font-bold">Pro<span className="text-subMain">wood</span></p>
                <Link href="/shop/cart" className="text-[2rem] mr-[1rem]"><FaOpencart /></Link>
            </nav>
            <div className="flex ">
                <div className="w-[50%] border-r-2 py-6 pr-9 pl-20">
                    <div className="border-b-2 p-2 mb-[1rem]">
                        <p className="text-[0.9rem] text-slate-600">Account:</p>
                        <p>{"babidaivan09@gmail.com"}</p>
                    </div>
                    <div className="py-5 pl-15">
                        <div className="flex flex-col gap-4 mb-[2rem]">
                            <p className="text-[1.4rem] font-[500]">Delivery</p>
                            <Select>
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
                                />
                                <Input
                                    className="h-12"
                                    placeholder="Last Name"
                                />
                            </div>
                            <Input
                                className="h-12"
                                placeholder="Address" />
                            <Input
                                className="h-12"
                                placeholder="Appartment, suite, etc. (Optional)" />
                            <div className="flex gap-4">
                                <Input className="h-12" placeholder="Postal" />
                                <Input className="h-12" placeholder="City" />
                            </div>
                            <Select>
                                <SelectTrigger className="w-[100%] !h-12">
                                    <SelectValue placeholder="Region" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Rizal">Rizal</SelectItem>
                                    <SelectItem value="Metro Manila">Metro Manila</SelectItem>
                                    <SelectItem value="Quezon">Quezon</SelectItem>
                                </SelectContent>
                            </Select>
                            <Input className="h-12" placeholder="Phone" />
                        </div>
                        <div>
                            <p className="text-[1.4rem] font-[500]">Payment</p>

                            <Accordion
                                type="single"
                                collapsible
                                value={selectedPayment ?? undefined}
                                onValueChange={(val) => setSelectedPayment(val)}
                                className="mt-4"
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

                                <AccordionItem value="pay-in-store" className="border border-gray-300 rounded-lg mt-2">
                                    <AccordionTrigger className="flex items-center justify-between px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <span
                                                className={cn(
                                                    "w-4 h-4 rounded-full border-2 border-gray-500",
                                                    selectedPayment === "pay-in-store" && "bg-transparent border-black border-6"
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
                        <Button className="mt-[2rem] w-[100%] p-5 text-[1.15rem]">Pay now</Button>
                    </div>
                </div>
                <div id="otherSide" className="w-[50%] sticky top-[5rem] h-[calc(100vh-5rem)] overflow-y-auto">
                    <div className="mb-[1rem] h-[25rem] flex-col gap-3 flex p-6 mt-[5rem] overflow-y-scroll">
                        {productsToCheckout.map((item, index) => (
                            <div className="flex items-center border-b-2 p-2 gap-4 w-[95%]" key={index}>
                                <Image
                                    src={String(item.product.productImage)}
                                    alt="Product Image"
                                    width={50}
                                    height={50}
                                    className="object-cover rounded"
                                />
                                <div className="flex items-center justify-between w-[100%]">
                                    <div className="flex flex-col w-[80%]">
                                        <div className="text-[1.2rem] font-inter">{item.product.name}</div>
                                        <div className="text-[0.95rem] text-slate-500 font-epilogue">{item.product.description}</div>
                                    </div>
                                    <div className="text-[1.1rem] mr-[1.5rem]">{Number(item.product.pricePerUnit) * Number(item.quantity)}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col w-[80%] gap-3 m-[auto]">
                        <div className="flex justify-between">
                            <div>Sub Total - ({productsToCheckout.length} items):</div>
                            <div>{formattedSubTotal}</div>
                        </div>
                        <div className="flex justify-between">
                            <div>Shipping</div>
                            <div>₱200</div>
                        </div>
                        <div className="flex justify-between">
                            <div className="text-[1.2rem] font-semibold font-inter">Total: </div>
                            <div className="text-[1.2rem] flex items-center gap-2">
                                <span className="text-[0.8rem]">PHP</span> <span className="font-bold">{formattedTotal}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* {selectedItems.join(", ")} */}
        </div>
    )
}