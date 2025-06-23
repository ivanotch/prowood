import { cookies } from 'next/headers'
import { verify } from 'jsonwebtoken'
import { SidebarInset } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/site-header"
import ClientDashboard from '../ClientDashboard';

const SECRET_KEY = process.env.JWT_SECRET || "ivanpogi";

export default async function Settings() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('adminToken')?.value;

  let role = null;

  if (token) {
    try {
      const decoded: any = verify(token, SECRET_KEY);
      role = decoded.role;
    } catch (error) {
      console.error("Invalid token", error);
    }
  }
    return (

        <div>
            <SidebarInset>
                <SiteHeader header="User Management" />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        {/* <ClientDashboard /> */}
                        Admin account role: {role}
                        <ClientDashboard/>
                    </div>

                </div>
            </SidebarInset>
        </div>
    )
}