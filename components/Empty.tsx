import Image from 'next/image';

interface EmptyProps {
    label: string;
}

export const Empty = ({ label } : EmptyProps) => {
  return (
    <div className='h-full px-20 py-10 flex flex-col items-center justify-center'>
        <div className='relative w-72 h-72'>
            <Image alt='Loading' src='/load.png' fill quality={100} />
        </div>
        <p className='text-muted-foreground text-sm text-center'>{label}</p>
    </div>
  )
}
