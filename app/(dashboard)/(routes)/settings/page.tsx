import { checkSubscription } from "@/lib/subscription";

import { Heading } from "@/components/Heading";
import { SubscriptionBtn } from "@/components/SubscriptionBtn";

import { Settings } from "lucide-react";

const SettingsPage = async () => {
    const isPro = await checkSubscription();
    return (
        <div>
            <Heading title="Settings" description="Manage account setttings" icon={Settings} iconColor="text-gray-700" bgColor="text-gray-700/10"/>

            <div className='px-4 lg:px-8 space-y-4'>
                <div className='text-muted-foreground text-[0.8rem]'>
                    {isPro ? 'You are currently on a pro plan' : 'You are currently on a free plan'}
                </div>
                <SubscriptionBtn isPro={isPro} />
            </div>
        </div>
    )
};

export default SettingsPage;