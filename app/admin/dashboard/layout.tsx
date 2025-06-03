import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { authenticateAdmin } from "@/utils/auth"
 
export default async function Layout({ children }: { children: React.ReactNode }) {

  const admin = await authenticateAdmin();

  return (
    <SidebarProvider>
      <AppSidebar admin={admin} />
      <main className="w-[100%]">
        {children}
      </main>
    </SidebarProvider>
  )
}