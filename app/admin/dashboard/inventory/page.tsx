import DataTable from "./TabbedTable"
import { SidebarInset } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/site-header"
import { InventoryCards } from "./InventoryWidget"
import { ComparisonChart } from "./ComparisonChart"

export default function Inventory() {
    return (

        <main className="">
            <SidebarInset>
                <SiteHeader header="Inventory" />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <InventoryCards />
                            
                            <div className="px-4 lg:px-6">
                                <ComparisonChart />
                            </div>
                            <div className="px-4 lg:px-6">
                                <DataTable />
                            </div>
                        </div>

                    </div>

                </div>
            </SidebarInset>
        </main>
    )
}