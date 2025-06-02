'use client';
import { useState } from 'react';
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


const TabbedTable = () => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'products' | 'records'>('inventory');

  return (
    <div className="w-full mx-auto py-4">
      {/* Tabs */}
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
            <TableRow className="">
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Alice Matsunaga</TableCell>
              <TableCell className="whitespace-normal break-words max-w-[200px]">123 Main Street, Malanday Townhomes Marikina City, 1850, Philippines</TableCell>
              <TableCell>09173927339</TableCell>
              <TableCell><Button size="sm" variant="outline">View</Button></TableCell>
              <TableCell>Credit Card</TableCell>
            </TableRow>
            <TableRow className="">
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Alice Matsunaga</TableCell>
              <TableCell className="whitespace-normal break-words max-w-[200px]">123 Main Street, Malanday Townhomes Marikina City, 1850, Philippines</TableCell>
              <TableCell>09173927339</TableCell>
              <TableCell><Button size="sm" variant="outline">View</Button></TableCell>
              <TableCell>Credit Card</TableCell>
            </TableRow>
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
            <TableRow className="">
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Alice Matsunaga</TableCell>
              <TableCell className="whitespace-normal break-words max-w-[200px]">123 Main Street, Malanday Townhomes Marikina City, 1850, Philippines</TableCell>
              <TableCell>09173927339</TableCell>
              <TableCell><Button size="sm" variant="outline">View</Button></TableCell>
              <TableCell>Credit Card</TableCell>
            </TableRow>
            <TableRow className="">
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Alice Matsunaga</TableCell>
              <TableCell className="whitespace-normal break-words max-w-[200px]">123 Main Street, Malanday Townhomes Marikina City, 1850, Philippines</TableCell>
              <TableCell>09173927339</TableCell>
              <TableCell><Button size="sm" variant="outline">View</Button></TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell>Credit Card</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}

      {activeTab === 'records' && (
        <Table>
          <TableCaption>A list of your transaction records.</TableCaption>
          <TableHeader className='bg-gray-100 rounded-lg'>
            <TableRow>
              <TableHead className="w-[100px]">Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Notes/Reason</TableHead>
              <TableHead>Performed By</TableHead>
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
            </TableRow>
            <TableRow className="">
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Alice Matsunaga</TableCell>
              <TableCell className="whitespace-normal break-words max-w-[200px]">123 Main Street, Malanday Townhomes Marikina City, 1850, Philippines</TableCell>
              <TableCell>09173927339</TableCell>
              <TableCell><Button size="sm" variant="outline">View</Button></TableCell>
              <TableCell>Credit Card</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default TabbedTable;
