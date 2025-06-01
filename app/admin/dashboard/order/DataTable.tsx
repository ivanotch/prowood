import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";


export default function DataTable() {
    return (
        <Table>
            <TableCaption>A list of your Order Data.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Order Id</TableHead>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>MOP</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead>Delivery Date</TableHead>
                    <TableHead>Delivery Status</TableHead>
                    <TableHead>Order Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow className="">
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Alice Matsunaga</TableCell>
                    <TableCell className="whitespace-normal break-words max-w-[200px]">123 Main Street, Malanday Townhomes Marikina City, 1850, Philippines</TableCell>
                    <TableCell>09173927339</TableCell>
                    <TableCell><Button size="sm" variant="outline">View</Button></TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell>Unpaid</TableCell>
                    <TableCell>July 31, 2026</TableCell>
                    <TableCell>Delivered</TableCell>
                    <TableCell>Completed</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                <TableRow className="">
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Alice Matsunaga</TableCell>
                    <TableCell className="whitespace-normal break-words max-w-[200px]">123 Main Street, Malanday Townhomes Marikina City, 1850, Philippines</TableCell>
                    <TableCell>09173927339</TableCell>
                    <TableCell><Button size="sm" variant="outline">View</Button></TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell>Unpaid</TableCell>
                    <TableCell>July 31, 2026</TableCell>
                    <TableCell>Delivered</TableCell>
                    <TableCell>Completed</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
            </TableBody>
        </Table>

    )
}