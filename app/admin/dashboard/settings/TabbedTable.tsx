"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Divide } from "lucide-react";

type Customer = {
    customerId: string;
    name: string;
    contact: string;
    email: string;
    isBanned: boolean;
    isVerified: boolean;
}

type Admin = {
    adminId: string;
    name: string;
    contact: string;
    email: string;
    isBanned: boolean;
    role: string;
}

export default function TabbedTable({ category }: { category: string }) {

    const [customers, setCustomers] = useState<Customer[]>([])
    const [admins, setAdmins] = useState<Admin[]>([])

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const getUsers = async () => {
            try {
                const res = await fetch("/api/admin/user/customer");
                const adminRes = await fetch("/api/admin/user/admins")

                if (!res.ok) {
                    console.log("failed to fetch users")
                    return
                } else {
                    const data = await res.json();
                    setCustomers(data);
                    setLoading(false);
                }

                if (!adminRes.ok) {
                    console.log("failed to fetch Admins")
                    return
                } else {
                    const adminData = await adminRes.json();
                    setAdmins(adminData);
                    setLoading(false);
                }

            } catch (error) {
                console.log("error in fetching users")
            }
        }

        getUsers();
    }, [])

    const handleBanCustomer = async (customerId: string, currentStatus: boolean) => {
        try {
            const res = await fetch(`/api/admin/user/customer/${customerId}/ban`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ isBanned: !currentStatus }),
            });

            if (res.ok) {
                setCustomers(prev =>
                    prev.map(c =>
                        c.customerId === customerId ? { ...c, isBanned: !currentStatus } : c
                    )
                );
            } else {
                console.error("Failed to update customer ban status");
            }
        } catch (error) {
            console.error("Error banning customer", error);
        }
    };

    const handleBanAdmin = async (adminId: string, currentStatus: boolean) => {
        try {
            const res = await fetch(`/api/admin/user/admins/${adminId}/ban`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ isBanned: !currentStatus }),
            });

            if (res.ok) {
                setAdmins(prev =>
                    prev.map(a =>
                        a.adminId === adminId ? { ...a, isBanned: !currentStatus } : a
                    )
                );
            } else {
                console.error("Failed to update admin ban status");
            }
        } catch (error) {
            console.error("Error banning admin", error);
        }
    };


    return (
        <div>
            {category === "Customers" &&
                <Table>
                    <TableCaption>A list of your Customers.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Customer Id</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                            <TableHead>Account</TableHead>

                            <TableHead className="">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">Loading...</TableCell>
                            </TableRow>
                        ) : customers.length > 0 ? (
                            customers.map((customer) => (
                                <TableRow key={customer.customerId}>
                                    <TableCell className="font-medium">{customer.customerId}</TableCell>
                                    <TableCell>{customer.name}</TableCell>
                                    <TableCell>{customer.email}</TableCell>
                                    <TableCell>{customer.contact ? customer.contact : "no contact"}</TableCell>
                                    <TableCell className="text-right">{customer.isVerified ? "Verified" : "Unverified"}</TableCell>
                                    <TableCell>{customer.isBanned ? <div className="text-red-900">Banned</div> : <div className="text-green-900">Permitted</div>}</TableCell>
                                    <TableCell><Button
                                        variant='destructive'
                                        size='sm'
                                        className="text-right text-[0.8rem]"
                                        onClick={() => handleBanCustomer(customer.customerId, customer.isBanned)}
                                    >
                                        {customer.isBanned ? "Unban" : "Ban"}
                                    </Button>
                                    </TableCell>

                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">No customers found.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            }

            {category === "Admins" &&
                <Table>
                    <TableCaption>A list of your Admins.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Admin Id</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Account</TableHead>
                            <TableHead className="">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">Loading...</TableCell>
                            </TableRow>
                        ) : admins.length > 0 ? (
                            admins.map((admin) => (
                                admin.role !== "SUPER_ADMIN" && <TableRow key={admin.adminId}>
                                    <TableCell className="font-medium">{admin.adminId}</TableCell>
                                    <TableCell>{admin.name}</TableCell>
                                    <TableCell>{admin.email}</TableCell>
                                    <TableCell>{admin.contact ? admin.contact : "no contact"}</TableCell>
                                    <TableCell>{admin.role}</TableCell>
                                    <TableCell>{admin.isBanned ? <div className="text-red-900">Banned</div> : <div className="text-green-900">Permitted</div>}</TableCell>
                                    <TableCell><Button
                                        variant='destructive'
                                        size='sm'
                                        className="text-right text-[0.8rem]"
                                        onClick={() => handleBanAdmin(admin.adminId, admin.isBanned)}
                                    >
                                        {admin.isBanned ? "Unban" : "Ban"}
                                    </Button></TableCell>

                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">No Admin found.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            }
        </div>
    )
}