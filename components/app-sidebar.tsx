import { PackageOpen,  ChartNoAxesCombined, Inbox, HandCoins, Settings, ArrowUpCircleIcon } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarFooter
} from "@/components/ui/sidebar"

import { NavAdmin } from "./nav-AdminUser"

// Menu ApplicationMenu.
const applicationMenu = [
    {
        title: "Sales Overview",
        url: "/admin/dashboard/",
        icon:  ChartNoAxesCombined ,
    },
    {
        title: "Order Management",
        url: "/admin/dashboard/order",
        icon: Inbox,
    },
    {
        title: "Inventory Management",
        url: "/admin/dashboard/inventory",
        icon: PackageOpen,
    },
    {
        title: "Financial Overview",
        url: "/admin/dashboard/financial",
        icon: HandCoins,
    },
]
const footerMenu = [
    {
        title: "Settings",
        url: "/admin/dashboard/settings",
        icon: Settings,
    },
]

interface AdminInfo {
  adminId?: string;
  role?: string;
  email?: string;
  name?: string;
  contact?: string;
}

export async function AppSidebar({admin}: {admin: AdminInfo | null}) {
    console.log(admin)
    
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                className="data-[slot=sidebar-menu-button]:!p-1.5"
                            >
                                <a href="#">
                                    <ArrowUpCircleIcon className="h-5 w-5" />
                                    <span className="text-base font-semibold">Prowood Ph</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {applicationMenu.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarFooter>
                    <SidebarGroupContent>
                        <SidebarGroupLabel>Manage</SidebarGroupLabel>
                        <SidebarMenu>
                            {footerMenu.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                    <NavAdmin admin={admin} />
                </SidebarFooter>
            </SidebarContent>
        </Sidebar>
    )
}
