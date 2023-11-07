import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/navbar";

import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const DashboardLayout = async ({children}: {
    children: React.ReactNode;
}) => {

    const apiLimitCount = await getApiLimitCount();
    const isPro = await checkSubscription();

  return (
    <div className="h-full relative">
        <div className="hidden h-full md:flex md:flex-col md:fixed md:inset-y-0 bg-gray-900 w-72">
            <div>
                <Sidebar apiLimitCount={apiLimitCount} isPro={isPro} />
            </div>
        </div>
        <main className="md:ml-72">
            <Navbar />
            {children}
        </main>
    </div>
  )
}

export default DashboardLayout