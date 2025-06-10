
import { SidebarInset } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/site-header"
import FinancialKPI from "./FinancialKPI"
import { RevenueVsInventory } from "./RevenueAndExpense"
import { SalesByProduct } from "./SalesByProduct"
import { SalesByCategory } from "./SalesByCategory"
// import CashFlow  from "./CashFlow"

export default function Financial() {
    return (
        <main className="">
            <SidebarInset>
                <SiteHeader header="Financial Overview" />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

                            <FinancialKPI />
                            <div className="px-4 lg:px-6">
                                <RevenueVsInventory />
                            </div>

                            <div className="px-4 gap-3 sm:flex lg:px-6">
                                <SalesByProduct />
                                <SalesByCategory />
                            </div>
                            {/* <div className="px-4 lg:px-6">
                                <CashFlow />
                            </div> */}
                        </div>

                    </div>

                </div>
            </SidebarInset>
        </main>
    )
}