

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
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type Product = {
    productId: string;
    name: string;
    description: string;
    pricePerUnit: number;
    category: string;
}

export default function EditProduct(product: Product) {

    const [edit, setEdit] = useState<{
        productId: string;
        name: string;
        description: string;
        pricePerUnit: number;
        category: string;
    }>({
        productId: product.productId,
        name: product.name,
        description: product.description,
        pricePerUnit: product.pricePerUnit,
        category: product.category,
    })

    const handleSubmitEdit = async () => {
        try {
            const res = await fetch(`/api/admin/products/${product.productId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(edit)
            })

            if (!res.ok) {
                console.log("Failed to edit product details");
                // Optionally show a toast/error message here
                return;
            }

            const data = await res.json();
            console.log("Product updated:", data);
            // Optionally refetch product list or close dialog
        } catch (error) {
            console.error("Error editing product:", error);
        }
    }
    return (
        <Dialog>
            <DialogTrigger className="p-2">
                <HiDotsHorizontal />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit {product.name} Product Info
                    </DialogTitle>
                    <div className="flex flex-col gap-6 mt-[1.5rem]">
                        <div className="grid w-full max-w-sm items-center gap-3">
                            <Label htmlFor="Product Name">Product Name</Label>
                            <Input
                                type="text"
                                defaultValue={edit.name}
                                id="Product Name"
                                onChange={(e) => setEdit(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="Product Name"
                            />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-3">
                            <Label htmlFor="Product Description">Product Description</Label>
                            <Input type="text" defaultValue={edit.description} id="Product Description" onChange={(e) => setEdit(prev => ({ ...prev, description: e.target.value }))} placeholder="Product Description" />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-3">
                            <Label htmlFor="Product Price">Product Price</Label>
                            <Input type="text" defaultValue={edit.pricePerUnit} id="Product Price" onChange={(e) => setEdit(prev => ({ ...prev, pricePerUnit: Number(e.target.value) }))} placeholder="Product Price" />
                        </div>
                        <Select defaultValue={edit.category} onValueChange={(value) => { setEdit(prev => ({ ...prev, category: value })) }}>
                            <SelectTrigger className="w-[220px]">
                                <SelectValue placeholder="Select a product category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Category</SelectLabel>
                                    <SelectItem value="Indoor Columns Wood Plastic Composite">Indoor Columns Wood Plastic Composite</SelectItem>
                                    <SelectItem value="Outdoor Wood Plastic Composite">Outdoor Wood Plastic Composite</SelectItem>
                                    <SelectItem value="Indoor Wood Plastic Composite">Indoor Wood Plastic Composite</SelectItem>
                                    <SelectItem value="Stone Plastic Composite">Stone Plastic Composite</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="submit" onClick={handleSubmitEdit}>Submit</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}