"use client";

import axios from 'axios';
import toast from 'react-hot-toast';
import * as z from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useProModal } from '@/hooks/useProModal';


import Image from 'next/image';

import { Download, ImageIcon } from 'lucide-react';

import { Heading } from '@/components/Heading';
import { Empty } from '@/components/Empty';
import { Loader } from '@/components/Loader';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

import { amountOptions, formSchema, resolutionOptions } from './constants';

const ImagePage = () => {
  const [images, setImages] = useState<string[]>([])

  const proModal = useProModal();
  const  router = useRouter();
 
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
      amount: '1',
      resolution: '512x512'
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);
      const res = await axios.post('/api/image', {
        values
      });

      const urls = res.data.map((image: {url: string}) => image.url);
      setImages(urls);

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
    <Heading title='Image Generation' description='Let Kode_X turn your prompt into images' icon={ImageIcon} iconColor='text-pink-700' bgColor='bg-pink-700/10' />

    <div className='px-4 lg:px-8'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='rounded-lg w-full border p-3 px-3 md:px-6 focus-within:shadow-md grid grid-cols-12 gap-2'>
          <FormField name='prompt' render={({field}) => (
            <FormItem className='col-span-12 lg:col-span-6'>
                <FormControl className='m-0 p-0'>
                  <Input className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent placeholder:opacity-80 text-[0.8rem]' disabled={isLoading} autoComplete='off' placeholder="A picture of a super Mario toon art" {...field} />
                </FormControl>
            </FormItem>
          )} />

          <FormField control={form.control} name='amount' render={({field}) => (
            <FormItem className='col-span-12 lg:col-span-2'>
              <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue defaultValue={field.value} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {amountOptions.map(opt => (
                    <SelectItem key={opt.label} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )} />

        <FormField control={form.control} name='resolution' render={({field}) => (
            <FormItem className='col-span-12 lg:col-span-2'>
              <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue defaultValue={field.value} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {resolutionOptions.map(opt => (
                    <SelectItem key={opt.label} value={opt.value} className='text-[0.8rem]'>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )} />
          <Button className='col-span-12 lg:col-span-2 w-full' disabled={isLoading}>Generate</Button>
        </form>
      </Form>
    </div>

    {isLoading && (
      <div className='p-20'>
        <Loader />
      </div>
    )}

    {images.length === 0 && !isLoading && (
      <div>
        <Empty label='No Image prompts recieved' />
      </div>
    )}

    <div className='mt-4 space-y-4 px-4 lg:px-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8'>
        {images.map(src => (
          <Card key={src} className='rounded-lg overflow-hidden'>
            <div className='relative aspect-square'>
              <Image alt='image' fill src={src} />
            </div>

            <CardFooter className='p-2'>
              <Button variant={'secondary'} className='w-full' onClick={() => window.open(src)}>
                <Download className='h-4 w-4 mr-2' />
                Download
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
   </div>
  )
}

export default ImagePage