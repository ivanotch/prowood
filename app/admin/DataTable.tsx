'use client';

import { format } from "date-fns";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";

type Product = {
    pricePerUnit: number;
};

type OrderItem = {
    quantity: number;
    product: Product;
};

type Order = {
    order_id: string;
    paymentStatus: string;
    createdAt: string;
    modeOfPayment: string;
    customer: {
        name: string;
        email: string;
    };
    items: OrderItem[];
};


export default function DataTable() {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        fetch('/api/admin/paidOrders')
            .then(res => res.json())
            .then(data => setOrders(data));
    }, []);

    return (
        <Table>
            <TableCaption>A list of your recent sales.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Order Id</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map((order) => {
                    const totalAmount = order.items?.reduce((sum, item) => {
                        return sum + item.quantity * item.product.pricePerUnit;
                    }, 0) ?? 0;

                    return (
                        <TableRow key={order.order_id}>
                            <TableCell className="font-medium">{order.order_id}</TableCell>
                            <TableCell>{order.paymentStatus}</TableCell>
                            <TableCell>{new Date(order.createdAt).toUTCString().slice(0, 25)
                            }</TableCell>
                            <TableCell>{order.modeOfPayment.replace('_', ' ')}</TableCell>
                            <TableCell className="text-right">₱{totalAmount.toFixed(2)}</TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}
