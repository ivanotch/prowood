'use client'
import { SectionCards } from "./SectionCards"
import { SPCandWPCComparison } from "./SPCvsWPC";
import DataTable from "../DataTable";
import { DateRangeSelector } from "@/components/calendar";
import { useState } from "react";

export default function ClientDashboard() {
    const [startDate, setStartDate] = useState<string | undefined>();
    const [endDate, setEndDate] = useState<string | undefined>();


    console.log(startDate, endDate)

    return (
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
            <DateRangeSelector
                onDateChange={({ startDate, endDate }) => {
                    setStartDate(startDate)
                    setEndDate(endDate)
                }} />

            <SectionCards startDate={startDate} endDate={endDate} />

            <SPCandWPCComparison startDate={startDate} endDate={endDate} />
            <DataTable />
        </div>
    )
}