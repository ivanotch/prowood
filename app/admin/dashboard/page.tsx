import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/site-header"
import ClientDashboard from "./ClientDashboard";

export default async function Dashboard() {

    return (
        <main className="">
            <SidebarInset>
                <SiteHeader header="Overview" />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <ClientDashboard />
                    </div>
                </div>
            </SidebarInset>
        </main>
    )
}