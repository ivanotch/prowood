import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/site-header"
import { SectionCards } from "./Cards"
import prisma from "@/utils/prisma";
import DataTable from "./DataTable";
import { Button } from "@/components/ui/button";


export default function Order() {
    return (
        <div>
            <SidebarInset>
                <SiteHeader header="Order Management" />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

                            <SectionCards />

                            <div className="px-4 lg:px-6">
                                <Button variant="default" className="mb-[1rem]" size="sm">Add Order</Button>
                                
                                <DataTable />
                            </div>
                            
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </div>
    )
}