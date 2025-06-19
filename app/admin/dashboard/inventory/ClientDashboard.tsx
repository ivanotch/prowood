'use client'
import { InventoryCards } from "./InventoryWidget";
import TabbedTable from "./TabbedTable";
import { useState } from "react";

export default function ClientDashboard() {
    const [refreshKey, setRefreshKey] = useState(0)

    return (
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
            <InventoryCards />
            <div className="px-4 lg:px-6">
                <TabbedTable refreshKey={refreshKey} onRefresh={() => setRefreshKey(prev => prev + 1)} />
            </div>
        </div>
    )
}