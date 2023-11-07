"use client";
import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testmonials = [
    {
        name: 'Nannadi Kithuvki',
        avatar: '/av4.jpg',
        title: 'Software Engineer',
        desc: 'This is really an awesome applications, using it has made me a 10x Engineer and a better developer, especially while using Kode_X code generation model, highly recommend'
    }, 
    {
        name: 'Melly Mufasa',
        avatar: '/av5.jpg',
        title: 'Deer Hunter',
        desc: 'Since I started using Kode_X, all my hunts has being epic, this is due to the accurate predictions the high AI assistants gives me, I am coming for you all my deery friends'
    }, 
    {
        name: 'Newell Carson',
        avatar: '/av1.jpg',
        title: 'Neuro Surgeon',
        desc: 'I can easily get test results from previous researches and use this to diagnosed my patients, all thanks to Kode_X (and its precise language model) results it gives'
    }, 
    {
        name: 'Thomas Bjorn',
        avatar: '/av2.jpg',
        title: 'Civil Engineer',
        desc: 'Begun with all the integral, differential and all forms of calculus... welcome precise and accurate predictions, using Kode_X has made calculating complex maths easier than it has ever being'
    }, 
    {
        name: 'Kulkun Khadafi',
        avatar: '/av3.jpg',
        title: 'Content Creator',
        desc: 'It is funny how much I have being brewing with crazily new ideas to create contents on, its not me people, it is Kode_X, the best personal assistant, a man would ever ask for'
    }, 
];

const LandingContent = () => {
  return (
    <div className="px-10 pb-8">
        <h2 className="text-center text-white text-3xl mb-10 font-extrabold">Testimonials</h2>
    
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testmonials.map((item) => (
                <Card key={item.name} className="bg-[#192339] border-none text-white">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-x-4">
                            <Image alt={item.name} src={item.avatar} height={30} width={30} className="h-10 w-10 rounded-full" />
                            <div>
                                <p className="text-base">{item.name}</p>
                                <p className="text-xs text-zinc-400">{item.title}</p>
                            </div>
                        </CardTitle>
                        <CardContent className="pt-4 px-0 text-[0.8rem] text-zinc-200">
                            {item.desc}
                        </CardContent>
                    </CardHeader>
                </Card>
            ))}
        </div>
        <p className="pt-20 text-center text-white font-semibold text-sm">Copyright ©{new Date().getFullYear()} Odo Peter Ebere</p>
    </div>
  )
}

export default LandingContent