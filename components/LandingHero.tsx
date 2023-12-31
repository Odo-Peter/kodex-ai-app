"use client";

import { useAuth } from "@clerk/nextjs"

import Link from "next/link";

import TypewriterComponent from 'typewriter-effect';

import { Button } from "@/components/ui/button";

const LandingHero = () => {
    const { isSignedIn } = useAuth();
  return (
    <div className="text-white font-bold py-32 text-center space-y-5">
        <div className="text-2xl md:text-4xl lg:text-5xl space-y-5 font-extrabold">
            <h1>The Best AI Assistant for</h1>
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                <TypewriterComponent options={{
                    strings: [
                        'Chatbot',
                        'Photo Generation',
                        'Music Generation',
                        'Video Generation',
                        'Code Generation',
                    ],
                    autoStart: true, loop: true
                }} />
            </div>
        </div>
        <div className="text-xs md:text-base font-light text-zinc-400">
                Create content using AI 10x faster.
        </div>
        <div>
            <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
                <Button variant='pro' className="md:text-base p-4 md:p-6 rounded-full font-semibold">Start Generating For Free</Button>
            </Link>
        </div>
        <div className="text-zinc-400 text-xs md:text-sm font-normal">
            No credit card required
        </div>
        
    </div>
  )
}

export default LandingHero