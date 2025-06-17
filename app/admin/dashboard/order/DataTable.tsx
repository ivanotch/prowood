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
import Image from "next/image";
import EditOrder from "./EditOrder";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useEffect, useState } from "react"

export interface Address {
    apartment: string | null;
    city: string;
    country: string;
    region: string;
    street: string;
    zipCode: string;
    createdAt: string;
}

export interface Customer {
    contact: string;
    createdAt: string;
    customerId: string;
    email: string;
    name: string;
    password: string;
}

export interface Product {
    product_id: string;
    name: string;
    description: string;
    stock: number;
    pricePerUnit: number;
    productImage: string;
    // Add any other fields you might have
}

export interface OrderItem {
    orderItemId: string;
    order_id: string;
    productId: string;
    quantity: number;
    createdAt: string;
    product: Product;
}

export interface Order {
    order_id: string;
    addressId: string;
    customerId: string;
    approvedBy: string;
    createdAt: string;
    accomplishedDate: string;
    deliveryDate: string;
    deliveryStatus: string;
    paymentStatus: string;
    modeOfPayment: string;
    customer: Customer;
    address: Address;
    items: OrderItem[];
    amount: number;
}


export default function DataTable({ refreshKey }: { refreshKey: number }) {

    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true)
            try {
                const res = await fetch("/api/admin/allOrders/", {
                    credentials: "include"
                })
                const data = await res.json()
                setOrders(data)
            } catch (err) {
                console.error("Error fetching orders", err)
            } finally {
                setLoading(false)
            }
        }

        fetchOrders()
    }, [refreshKey])

    console.log(orders)

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
                    <TableHead>Edit</TableHead>

                </TableRow>
            </TableHeader>
            <TableBody>
                {loading ? (
                    <TableRow>
                        <TableCell colSpan={11} className="text-center">Loading...</TableCell>
                    </TableRow>
                ) : (
                    orders.map((order, index) => (
                        <TableRow key={index}>
                            <TableCell className="whitespace-normal break-words max-w-[100px]">{order.order_id}</TableCell>
                            <TableCell>{order.customer.name}</TableCell>
                            <TableCell className="whitespace-normal break-words max-w-[200px]">{order.address.street}, {order.address.city}, {order.address.country}, {order.address.zipCode}  </TableCell>
                            <TableCell>{order.customer.contact}</TableCell>
                            <TableCell>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button size="sm" variant="outline">View</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Customer: {order.customer.name}</AlertDialogTitle>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Image</TableHead>
                                                        <TableHead>Product Name</TableHead>
                                                        <TableHead>Quantity</TableHead>
                                                        <TableHead className="text-right">Amount</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {order.items.map((item, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell>
                                                                <Image
                                                                    src={String(item.product.productImage)}
                                                                    alt="Product Image"
                                                                    width={50}
                                                                    height={50}
                                                                    className="object-cover max-h-[50px] rounded"
                                                                />
                                                            </TableCell>
                                                            <TableCell>{item.product.name}</TableCell>
                                                            <TableCell>{item.quantity}</TableCell>
                                                            <TableCell>{item.quantity * item.product.pricePerUnit}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>

                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogAction>Close</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </TableCell>
                            <TableCell>{order.modeOfPayment}</TableCell>
                            <TableCell>{order.paymentStatus}</TableCell>
                            <TableCell>{new Date(order.deliveryDate).toLocaleDateString()}</TableCell>
                            <TableCell>{order.deliveryStatus}</TableCell>
                            {order.deliveryStatus == "DELIVERED" ? <TableCell className="font-xl text-green-900">Completed</TableCell>
                                :
                                <TableCell className="font-xl text-red-900">Processing</TableCell>
                            }
                            <TableCell className="text-right">₱{order.amount}</TableCell>
                            <TableCell className="font-bold">
                                <EditOrder
                                    deliveryDate={new Date(order.deliveryDate)}
                                    deliveryStatus={order.deliveryStatus}
                                    paymentStatus={order.paymentStatus}
                                    modeOfPayment={order.modeOfPayment}
                                    customer={order.customer.name} 
                                />
                            </TableCell>

                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>

    )
}