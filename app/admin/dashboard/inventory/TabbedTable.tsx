'use client';
import { useState, useEffect } from 'react';
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

type Inventory = {
  product_id: string;
  name: string;
  category: string;
  description: string;
  pricePerUnit: string;
  productImage: string;
  stock: number;
  createdAt: Date;
}

const TabbedTable = () => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'products' | 'records'>('inventory');
  const [products, setProducts] = useState<Inventory[]>([])


  useEffect(() => {
    const inventory = async () => {

      try {
        const res = await fetch("/api/products/allProducts/", {
          credentials: "include"
        })

        if (!res.ok) {
          throw new Error("Failed to fetch statistics")
        }

        const products = await res.json();
        setProducts(products);
      } catch (error) {
        console.error(error)
      }
    }

    inventory();
  }, [])

  console.log(products)
  return (
    <div className="w-full mx-auto py-4">
      <div className="mb-4 p-1 inline-block rounded-md bg-gray-300">
        <button
          className={`rounded-sm px-3  font-inter font-medium ${activeTab === 'inventory'
            ? 'bg-white text-black shadow-md'
            : ' text-black'
            }`}
          onClick={() => setActiveTab('inventory')}
        >
          Inventory
        </button>

        <button
          className={`rounded-sm px-3  font-inter font-medium ${activeTab === 'products'
            ? 'bg-white text-black shadow-md'
            : ' text-black'
            }`}
          onClick={() => setActiveTab('products')}
        >
          Manage Products
        </button>

        <button
          className={`rounded-sm px-3  font-inter font-medium ${activeTab === 'records'
            ? 'bg-white text-black shadow-md'
            : ' text-black'
            }`}
          onClick={() => setActiveTab('records')}
        >
          Transaction Records
        </button>
      </div>

      {/* Inventory Table */}
      {activeTab === 'inventory' && (
        <Table>
          <TableCaption>A list of your inventory data.</TableCaption>
          <TableHeader className='bg-gray-100 rounded-lg'>
            <TableRow>
              <TableHead className="w-[100px]">Product Id</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Current Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index} className="">
                <TableCell className="font-medium">{product.product_id}</TableCell>
                <TableCell className='max-w-[200px]'>{product.name}</TableCell>
                <TableCell>₱{product.pricePerUnit}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell><Button size="sm" variant="outline">View</Button></TableCell>
                <TableCell><Button size="sm" variant="destructive">Delete</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Sales Table */}
      {activeTab === 'products' && (
        <Table>
          <TableCaption>A list of your products.</TableCaption>
          <TableHeader className='bg-gray-100 rounded-lg'>
            <TableRow>
              <TableHead className="w-[100px]">Product Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Price Per Unit</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Added on</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index} className="">
                <TableCell className="whitespace-normal break-words min-w-[250px] font-medium">{product.product_id}</TableCell>
                <TableCell className="whitespace-normal break-words max-w-[200px]">{product.name}</TableCell>
                <TableCell className="whitespace-normal break-words max-w-[200px]">{product.description}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>₱{product.pricePerUnit}</TableCell>
                <TableCell className="whitespace-normal break-words max-w-[200px]">{product.category}</TableCell>
                <TableCell>{new Date(product.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {activeTab === 'records' && (
        <Table>
          <TableCaption>A list of your transaction records.</TableCaption>
          <TableHeader className='bg-gray-100 rounded-lg'>
            <TableRow>
              <TableHead className="w-[100px]">Date</TableHead>
              <TableHead>Transaction Type</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Notes/Reason</TableHead>
              <TableHead>Performed By</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="">
              <TableCell className="font-medium">6/4/2025</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell className="whitespace-normal break-words max-w-[200px]">White Oak</TableCell>
              <TableCell>89</TableCell>
              <TableCell>Added a stock for WPC White Oak</TableCell>
              <TableCell>John Doe</TableCell>
            </TableRow>
            <TableRow className="">
              <TableCell className="font-medium">6/8/2025</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell className="whitespace-normal break-words max-w-[200px]">Black</TableCell>
              <TableCell>15</TableCell>
              <TableCell>Deleted a stock for WPC Black</TableCell>
              <TableCell>John Doe</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default TabbedTable;
