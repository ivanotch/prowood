'use client';
import { useState } from 'react';

const TabbedTable = () => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'sales'>('inventory');

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Tabs */}
      <div className="flex border-b mb-4">
        <button
          className={`px-4 py-2 rounded-t-md font-semibold ${
            activeTab === 'inventory'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
          onClick={() => setActiveTab('inventory')}
        >
          Inventory
        </button>
        <button
          className={`px-4 py-2 rounded-t-md font-semibold ml-2 ${
            activeTab === 'sales'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
          onClick={() => setActiveTab('sales')}
        >
          Sales
        </button>
      </div>

      {/* Inventory Table */}
      {activeTab === 'inventory' && (
        <table className="w-full table-auto border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border">Product</th>
              <th className="px-4 py-2 border">Stock</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border">White Oak Panel</td>
              <td className="px-4 py-2 border">50</td>
              <td className="px-4 py-2 border text-red-500">Low Stock</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">Teak Decking</td>
              <td className="px-4 py-2 border">150</td>
              <td className="px-4 py-2 border text-green-600">In Stock</td>
            </tr>
          </tbody>
        </table>
      )}

      {/* Sales Table */}
      {activeTab === 'sales' && (
        <table className="w-full table-auto border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border">Product</th>
              <th className="px-4 py-2 border">Units Sold</th>
              <th className="px-4 py-2 border">Month</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border">White Oak Panel</td>
              <td className="px-4 py-2 border">300</td>
              <td className="px-4 py-2 border">May 2025</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">Dark Walnut Board</td>
              <td className="px-4 py-2 border">20</td>
              <td className="px-4 py-2 border">May 2025</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TabbedTable;
