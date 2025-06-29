'use client'
import { SectionCards } from "./Cards"
import { DateRangeSelector } from "@/components/calendar";
import { useState } from "react";
import DataTable from "./DataTable";
import OrderUi from "./OrderUI";

export default function ClientDashboard() {
    const [startDate, setStartDate] = useState<string | undefined>();
    const [endDate, setEndDate] = useState<string | undefined>();
    const [refreshKey, setRefreshKey] = useState(0)

    const handleOrderAdded = () => {
        setRefreshKey(prev => prev + 1) // This will trigger DataTable to refetch
    }

    return (
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
            <div className="print:hidden">
                <DateRangeSelector
                    onDateChange={({ startDate, endDate }) => {
                        setStartDate(startDate)
                        setEndDate(endDate)
                    }} />

            </div>
            <SectionCards startDate={startDate} endDate={endDate} />

            <div className="px-4 lg:px-6">
                <OrderUi handleOrderAdded={handleOrderAdded} />
                <DataTable refreshKey={refreshKey} onRefresh={() => setRefreshKey(prev => prev + 1)} />
            </div>

        </div>
    )
}