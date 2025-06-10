'use client'
import { InventoryCards } from "./InventoryWidget";
import TabbedTable from "./TabbedTable";

export default function ClientDashboard() {
    return (
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
            <InventoryCards />
            <div className="px-4 lg:px-6">
                <TabbedTable />
            </div>
        </div>
    )
}