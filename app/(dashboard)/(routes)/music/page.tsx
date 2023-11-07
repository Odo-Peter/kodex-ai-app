"use client";

import axios from 'axios';
import toast from 'react-hot-toast';
import * as z from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useProModal } from '@/hooks/useProModal';


import { Music } from 'lucide-react';

import { Heading } from '@/components/Heading';
import { Empty } from '@/components/Empty';
import { Loader } from '@/components/Loader';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

import { formSchema } from './constants';

const MusicPage = () => {
  const [music, setMusic] = useState<string>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ''
    }
  });

  const proModal = useProModal();
  const  router = useRouter();

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined);

      const res = await axios.post('/api/music', values);
      setMusic(res.data.audio);

      form.reset();
    } catch (err: any) {
      if(err?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error('Ooops, something went wrong')
      }
    } finally {
      router.refresh();
    }
  }

  return (
   <div>
    <Heading title='Music Generation' description='Allow Kode_X turn your prompts to music' icon={Music} iconColor='text-emerald-500' bgColor='bg-emerald-500/10' />

    <div className='px-4 lg:px-8'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='rounded-lg w-full border p-3 px-3 md:px-6 focus-within:shadow-md grid grid-cols-12 gap-2'>
          <FormField name='prompt' render={({field}) => (
            <FormItem className='col-span-12 lg:col-span-10'>
                <FormControl className='m-0 p-0'>
                  <Input className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent placeholder:opacity-80 text-[0.8rem]' disabled={isLoading} autoComplete='off' placeholder="A 90's hip pop instrumental" {...field} />
                </FormControl>
            </FormItem>
          )} />
          <Button className='col-span-12 lg:col-span-2 w-full' disabled={isLoading}>Generate</Button>
        </form>
      </Form>
    </div>

    {isLoading && (
      <div className='p-8 mt-4 rounded-lg w-full flex items-center justify-center bg-muted'>
        <Loader />
      </div>
    )}

    {!music && !isLoading && (
      <div>
        <Empty label='No music generated' />
      </div>
    )}

    <div className='mt-4 space-y-4'>
      <div className='flex flex-col-reverse gap-y-4'>
           {music && <audio className='w-full mt-8' controls>
              <source src={music} />
            </audio>}
      </div>
    </div>
   </div>
  )
}

export default MusicPage