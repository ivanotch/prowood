import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/site-header"
import { SectionCards } from "./SectionCards"
import prisma from "@/utils/prisma";
import { ChartAreaInteractive } from "./ChartAreaInteractive";
import DataTable from "../DataTable";

export default async function Dashboard() {

    const orderItems = await prisma.orderItem.findMany({
        where: {
            order: {
                paymentStatus: 'PAYED',
            },
        },
        include: {
            product: true,
        },
    });

    const totalRevenue = orderItems.reduce((acc, item) => {
        return acc + item.quantity * item.product.pricePerUnit;
    }, 0);

    console.log(`Total Revenue: ₱${totalRevenue.toLocaleString()}`);

    return (
        <main className="">
            <SidebarInset>
                <SiteHeader header="Overview" />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

                            <SectionCards />

                            <div className="px-4 lg:px-6">
                                <ChartAreaInteractive />
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