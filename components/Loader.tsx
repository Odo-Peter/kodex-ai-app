import { Loader2 } from 'lucide-react';
// import Image from 'next/image';

export const Loader = () => {
    return (
        <div className="h-full flex flex-col gap-y-4 items-center">
            <div className="w-10 h-10 relative">
                <Loader2 className='w-full h-full animate-spin' />
                {/* <Image alt='Logo-loader' fill quality={100} src='/logo.png' /> */}
            </div>
            <p className='text-sm text-muted-foreground'>Kode_X is thinking....</p>
        </div>
    )
}