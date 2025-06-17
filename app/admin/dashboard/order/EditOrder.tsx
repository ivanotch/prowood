'use client'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import { HiDotsHorizontal } from "react-icons/hi";

import { Calendar } from "@/components/ui/calendar"
import { useState } from "react";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type Order = {
    customer: string;
    modeOfPayment: string;
    paymentStatus: string;
    deliveryStatus: string;
    deliveryDate: Date;
}

export default function EditOrder(order: Order) {
    const [date, setDate] = useState<Date | undefined>(undefined)
    return (
        <Dialog>
            <DialogTrigger className="p-2">
                <HiDotsHorizontal />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit {order.customer}'s Order Info
                    </DialogTitle>
                    <div className="flex flex-col gap-4 p-5">
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Delivery Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="PACKED">PACKED</SelectItem>
                                <SelectItem value="NOT_SHIPPED">NOT_SHIPPED</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Payment Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="PAID">PAID</SelectItem>
                                <SelectItem value="INITIAL_DOWNPAYMENT">INITIAL_DOWNPAYMENT</SelectItem>
                                <SelectItem value="UNPAID">UNPAID</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Mode Of Payment" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="CASH">CASH</SelectItem>
                                <SelectItem value="CREDIT_CARD">CREDIT_CARD</SelectItem>
                                <SelectItem value="BANK_TRANSFER">BANK_TRANSFER</SelectItem>
                                <SelectItem value="GCASH">GCASH</SelectItem>
                                <SelectItem value="OTHER">OTHER</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* <OneCalendar label="Delivery Date" /> */}
                        <Label htmlFor="date" className="px-1">
                            Delivery Date
                        </Label>
                        <Calendar
                            id="date"
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                                setDate(date)
                            }}
                        />
                    </div>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="submit">Submit</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}