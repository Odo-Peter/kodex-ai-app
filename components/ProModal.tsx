"use client"

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { useProModal } from "@/hooks/useProModal";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Check, Code, ImageIcon, MessageSquare, Music, VideoIcon, Zap } from "lucide-react";

import { cn } from "@/lib/utils";


const tools = [
    {
      label: 'Conversation',
      icon: MessageSquare,
      color: "text-violet-500",
      bgColor: "bg-violet-500/10",
    },
    {
      label: 'Image Generation',
      icon: ImageIcon,
      color: "text-pink-700",
      bgColor: "bg-pink-700/10",
    },
    {
      label: 'Music Generation',
      icon: Music,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      label: 'Video Generation',
      icon: VideoIcon,
      color: "text-orange-700",
      bgColor: "bg-orange-700/10",
    },
    {
      label: 'Code Generation',
      icon: Code,
      color: "text-green-700",
      bgColor: "bg-green-700/10",
    },
  ];
  

export const ProModal = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
    const proModal = useProModal();

    const onSubscribe = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/api/stripe');
        window.location.href = response.data.url;

      } catch(err) {
        toast.error('Ooops, something went wrong')
        console.log('[STRIPE_CLIENT_ERROR]', err);
      } finally {
        setIsLoading(false);
      }
    };

  return (
   <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
    <DialogContent>
        <DialogHeader>
            <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                <div className="flex items-center gap-x-2 font-bold py-1">
                Upgrade to Kode_X
                <Badge variant='pro' className="uppercase text-[0.75rem] py-1">pro</Badge>
                </div>
            </DialogTitle>
            <DialogDescription className="text-center pt-2 text-zinc-900 space-y-2 font-medium">
                {tools.map((tool) => (
                    <Card key={tool.label} className="p-3 border-black/5 flex items-center justify-between">
                        <div className="flex items-center gap-x-4">
                            <div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
                                <tool.icon className={cn('w-6 h-6', tool.color)} />
                            </div>
                            <div className="font-semibold text-[0.78rem]">
                                {tool.label}
                            </div>
                        </div>
                        <Check className="text-primary w-5 h-5" />
                    </Card>
                ))}
            </DialogDescription>
        </DialogHeader>
        <DialogFooter>
            <Button disabled={isLoading} onClick={onSubscribe} variant='pro' size='lg' className="w-full">
                Upgrade <Zap className="w-4 h-4 fill-white" />
            </Button>
        </DialogFooter>
    </DialogContent>
   </Dialog>
  )
}