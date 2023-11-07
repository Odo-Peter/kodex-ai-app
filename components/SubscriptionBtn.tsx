"use client";

import { useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";

import { Zap } from "lucide-react";
import toast from "react-hot-toast";

interface SubscriptionBtnProps {
    isPro: boolean;
}

export const SubscriptionBtn = ({isPro = false}: SubscriptionBtnProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onClickBtn = async() => {
        try {
            setIsLoading(true);
            const response = await axios.get('/api/stripe');
            window.location.href = response.data.url;
        } catch (error) {
            toast.error('Ooops, something went wrong')
            console.log('[BILLING_ERR]', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button disabled={isLoading} onClick={onClickBtn} variant={isPro ? 'default' : 'pro'}>
            {isPro ? 'Manage Subscription' : 'Upgrade'}
            {!isPro && <Zap className="w-4 h-4 ml-4 fill-white" />}
        </Button>
    )
};