'use client'
import { SectionCards } from "./Cards"
import { DateRangeSelector } from "@/components/calendar";
import { useState } from "react";
import DataTable from "./DataTable";
import { Button } from "@/components/ui/button";

export default function ClientDashboard() {
    const [startDate, setStartDate] = useState<string | undefined>();
    const [endDate, setEndDate] = useState<string | undefined>();
    const [refreshKey, setRefreshKey] = useState(0)

    const handleOrderAdded = () => {
        setRefreshKey(prev => prev + 1) // This will trigger DataTable to refetch
    }


    return (
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
            <DateRangeSelector
                onDateChange={({ startDate, endDate }) => {
                    setStartDate(startDate)
                    setEndDate(endDate)
                }} />

            <SectionCards startDate={startDate} endDate={endDate} />

            <div className="px-4 lg:px-6">
                <Button onClick={handleOrderAdded} variant="default" className="mb-[1rem]" size="sm">Add Order</Button>

                <DataTable refreshKey={refreshKey} />
            </div>

        </div>
    )
}