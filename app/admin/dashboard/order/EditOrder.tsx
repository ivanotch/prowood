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
import { DeliveryStatus, ModeOfPayment } from "@prisma/client";

type Order = {
    id: string;
    customer: string;
    modeOfPayment: string;
    paymentStatus: string;
    deliveryStatus: string;
    deliveryDate: Date;
    onRefresh?: () => void;
}

export default function EditOrder(order: Order) {
    // const [date, setDate] = useState<Date | undefined>(undefined)
    const [edit, setEdit] = useState<{
        deliveryStatus: string,
        paymentStatus: string,
        modeOfPayment: string,
        deliveryDate: Date | undefined,
    }>({
        deliveryStatus: "",
        paymentStatus: "",
        modeOfPayment: "",
        deliveryDate: undefined,
    })

    const onSubmitEdit = async () => {
        try {
            const res = await fetch(`/api/admin/order/${order.id}`, {
                method: "PUT",
                headers: {'Content-type':'application/json'},
                credentials: "include",
                body: JSON.stringify(edit)
            })

            if (res.ok) {
                const updated = await res.json();
                console.log(updated);

                if (order.onRefresh) order.onRefresh();
            } else {
                console.log("Failed to update order")
            }
        } catch (error) {
            console.log(error)
        }
    }

    console.log(edit)
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
                        <Select
                            onValueChange={(e) => setEdit(prev => ({ ...prev, deliveryStatus: e }))}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Delivery Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="PACKED">PACKED</SelectItem>
                                <SelectItem value="SHIPPED">SHIPPED</SelectItem>
                                <SelectItem value="DELIVERED">DELIVERED</SelectItem>
                                <SelectItem value="CANCELED">CANCELED</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select
                            onValueChange={(e) => setEdit(prev => ({...prev, paymentStatus: e}))}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Payment Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="PAYED">PAID</SelectItem>
                                <SelectItem value="INITIAL_DOWNPAYMENT">INITIAL_DOWNPAYMENT</SelectItem>
                                <SelectItem value="UNPAID">UNPAID</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select
                            onValueChange={(e) => setEdit(prev => ({...prev, modeOfPayment: e}))}
                        >
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
                            selected={edit.deliveryDate}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                                setEdit(prev => ({...prev, deliveryDate: date}))
                            }}
                        />
                    </div>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button onClick={onSubmitEdit} type="submit">Submit</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}