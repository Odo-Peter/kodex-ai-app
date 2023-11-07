"use client";

import axios from 'axios';
import toast from 'react-hot-toast';
import * as z from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useProModal } from '@/hooks/useProModal';


import { VideoIcon } from 'lucide-react';

import { Heading } from '@/components/Heading';
import { Empty } from '@/components/Empty';
import { Loader } from '@/components/Loader';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

import { formSchema } from './constants';

const VideoPage = () => {
  const [video, setVideo] = useState<string>();
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
      setVideo(undefined);

      const res = await axios.post('/api/video', values);
      setVideo(res.data[0]);

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
    <Heading title='Video Generation' description='Allow Kode_X turn your prompts to a video' icon={VideoIcon} iconColor='text-orange-700' bgColor='bg-orange-700/10' />

    <div className='px-4 lg:px-8'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='rounded-lg w-full border p-3 px-3 md:px-6 focus-within:shadow-md grid grid-cols-12 gap-2'>
          <FormField name='prompt' render={({field}) => (
            <FormItem className='col-span-12 lg:col-span-10'>
                <FormControl className='m-0 p-0'>
                  <Input className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent placeholder:opacity-80 text-[0.8rem]' disabled={isLoading} autoComplete='off' placeholder="Animated art of super mario in kart" {...field} />
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

    {!video && !isLoading && (
      <div>
        <Empty label='No video generated' />
      </div>
    )}

    <div className='mt-4 space-y-4'>
      <div className='flex flex-col-reverse items-center gap-y-4'>
           {video && <video className='w-[90%] h-[50%] aspect-video my-8 rounded-lg border-black' controls>
              <source src={video} />
            </video>}
      </div>
    </div>
   </div>
  )
}

export default VideoPage