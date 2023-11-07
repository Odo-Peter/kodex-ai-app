"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

const font = Montserrat({
    weight: '800',
    subsets: ['latin']
})

const LandingNavbar = () => {
    const { isSignedIn}  = useAuth();

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
        <Link href='/' className="flex items-center">
        <div className="relative w-8 h-8 mr-4">
            <Image alt='logo' src='/logo.png' fill />
        </div>
        <h1 className={cn('text-2xl font-bold text-white', font.className)}>Kode_X</h1>
        </Link>

        <div className="flex items-center gap-x-2">
            <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
                <Button variant='outline' className="rounded-full text-sm">
                    Get Started <ArrowRight className="ml-2 h-3 w-3" />
                </Button>

            </Link>
        </div>
    </nav>
  )
}

export default LandingNavbar