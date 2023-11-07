"use client";

import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

import { ArrowRight, Code, ImageIcon, MessageSquare, Music, VideoIcon } from "lucide-react";

import { Card } from "@/components/ui/card";

const tools = [
  {
    label: 'Conversation',
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation"
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/image"
  },
  {
    label: 'Music Generation',
    icon: Music,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    href: "/music"
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    href: "/video"
  },
  {
    label: 'Code Generation',
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: "/code"
  },
];


const DashboardPage = () => {
  const router = useRouter();

  return (
    <div>
    <div className="mb-8 space-y-4">
      <h2 className="text-1xl md:text-2xl font-bold text-center">Explore the power of AI assistants</h2>
      <p className="text-muted-foreground text-center font-light text-sm md:text-[0.9rem] ">Let Kode_X do the heavy lifting for you - Your personal assistant AI</p>
    </div>
    <div className="px-4 md:px-20 lg:px-32 space-y-4">
      {tools.map(tool => (
        <Card key={tool.href} className="p-2 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer" onClick={() => router.push(tool.href)}>
          <div className="flex items-center gap-x-4">
            <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
              <tool.icon className={cn('w-6 h-6', tool.color)} />
            </div>
            <div className="font-semibold text-sm">{tool.label}</div>
          </div>
          <ArrowRight className="w-4 h-4" />

        </Card>
      ))}
    </div>
    </div>
  )
}

export default DashboardPage
