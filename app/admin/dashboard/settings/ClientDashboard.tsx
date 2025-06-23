'use client'

import TabbedTable from "./TabbedTable"
import { useState } from "react"


export default function ClientDashboard({role}: any) {

    const [category, setCategory] = useState("Customers")

    return (
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6 mt-[2rem]">
            <div className="flex justify-between">
                <div>Admin account role: {role}</div>
                <div className="flex gap-4">
                    {role === "SUPER_ADMIN"? <div className={`border-2 px-2 text-[0.9rem] rounded-lg font-bold ${category === "Admins" ? "text-white bg-black" : ""}`} onClick={() => setCategory("Admins")}>Admins</div> : null}
                    <div className={`border-2 px-2 text-[0.9rem] rounded-lg font-bold ${category === "Customers" ? "text-white bg-black" : ""}`} onClick={() => setCategory("Customers")}>Customers</div>
                </div>
            </div>
            <TabbedTable category={category} />
        </div>
    )
}