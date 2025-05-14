'use client'
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaOpencart } from "react-icons/fa6";
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


export default function Checkout() {
    const searchParams = useSearchParams();
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    useEffect(() => {
        const ids = searchParams.getAll("ids");
        setSelectedItems(ids);
    }, [searchParams]);

    return (
        <div className="flex flex-col h-[100vh] m-2">
            <nav className="flex items-center w-[100%] justify-between p-3 border-b-2">
                <span className="ml-[1rem]"></span>
                <p className="text-[2.5rem] font-inter text-main font-bold">Pro<span className="text-subMain">wood</span></p>
                <span className="text-[2rem] mr-[1rem]"><FaOpencart /></span>
            </nav>
            <div className="flex h-[80%]">
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
                                    <SelectItem value="light">Philippines</SelectItem>
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
                                    <SelectItem value="light">Rizal</SelectItem>
                                    <SelectItem value="light">Metro Manila</SelectItem>
                                    <SelectItem value="light">Quezon</SelectItem>
                                </SelectContent>
                            </Select>
                            <Input className="h-12" placeholder="Phone" />
                        </div>
                        <div>
                            <p>Payment</p>
                            <div>COD, Online</div>
                        </div>

                    </div>
                </div>
                <div className="w-[50%]">
                    product pictures
                </div>
            </div>
            {/* {selectedItems.join(", ")} */}
        </div>
    )
}