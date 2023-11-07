"use client"

import { useEffect, useState } from "react";

import { useProModal } from "@/hooks/useProModal";

import { Zap } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { MAX_FREE_COUNT } from "@/constants";
import { Button } from "@/components/ui/button";

interface FreeCounterProps {
    apiLimitCount: number;
    isPro: boolean;
}

const FreeCounter = ({apiLimitCount = 0, isPro = false}: FreeCounterProps) => {
    const [mounted, setMounted] = useState(false);

    const proModal = useProModal();

    useEffect(() => {
        setMounted(true);
    }, [])

    if(!mounted) return null;

    if(isPro) return null;
    
  return (
    <div className='px-3'>
        <Card className="bg-white/10 border-0">
            <CardContent className="py-4">
                <div className="text-center text-sm text-white mb-4 space-y-2">
                    <p className="text-[0.8rem]">{apiLimitCount} / {MAX_FREE_COUNT} Free Generations</p>
                    <Progress className="h-[6px]" value={(apiLimitCount / MAX_FREE_COUNT) * 100} />
                </div>
                <Button onClick={proModal.onOpen} variant='pro' className="w-full text-sm">Upgrade <Zap className="fill-white w-4 h-4 ml-2" /> </Button>
            </CardContent>
        </Card>
    </div>
  )
}

export default FreeCounter