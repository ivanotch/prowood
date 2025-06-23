import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useEffect } from "react";

export default function TabbedTable() {

    useEffect(() => {
        const getUser = async () => {
            try {

            } catch (error) {

            }
        }
    })

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
                {/* {orders.map((order) => {
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
                })} */}
            </TableBody>
        </Table>
    )
}