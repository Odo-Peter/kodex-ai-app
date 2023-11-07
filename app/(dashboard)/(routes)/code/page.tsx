"use client";

import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { ChatCompletionMessage } from 'openai/resources/chat/index.mjs';
import { useProModal } from '@/hooks/useProModal';

import { Code } from 'lucide-react';

import { Heading } from '@/components/Heading';
import { Empty } from '@/components/Empty';
import { Loader } from '@/components/Loader';
import { UserAvatar } from '@/components/UserAvatar';
import { BotAvatar } from '@/components/BotAvatar';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

import { formSchema } from './constants';
import { cn } from '@/lib/utils';

const CodeGenerationPage = () => {

  const [messages, setMessages] = useState<ChatCompletionMessage[]>([]);
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
      const userMessage: ChatCompletionMessage = {
        role: 'user',
        content: values.prompt,
      }

      const newMessages = [...messages, userMessage];

      const res = await axios.post('/api/code', {
        messages: newMessages
      });

      setMessages((curr) => [...curr, userMessage, res.data]);

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
    <Heading title='Code Generation' description='Generate clean code using descriptive texts' icon={Code} iconColor='text-green-700' bgColor='bg-green-700/10' />

    <div className='px-4 lg:px-8'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='rounded-lg w-full border p-3 px-3 md:px-6 focus-within:shadow-md grid grid-cols-12 gap-2'>
          <FormField name='prompt' render={({field}) => (
            <FormItem className='col-span-12 lg:col-span-10'>
                <FormControl className='m-0 p-0'>
                  <Input className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent placeholder:opacity-80 text-[0.8rem]' disabled={isLoading} autoComplete='off' placeholder="A Login form component with reactJS" {...field} />
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

    {messages.length === 0 && !isLoading && (
      <div>
        <Empty label='No code generated' />
      </div>
    )}

    <div className='mt-4 space-y-4'>
      <div className='flex flex-col-reverse gap-y-4'>
            {messages.map(msg => (
              <div key={msg.content} className={cn('p-8 w-full flex items-start gap-x-8 rounded-lg', msg.role =='user' ? 'bg-white border border-black/10' : 'bg-muted')}>
                {msg.role === 'user' ? <UserAvatar /> : <BotAvatar />}
                <Markdown className='overflow-hidden text-[0.8rem] leading-7' components={{pre: ({node, ...props}) => (
                  <div className='overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg'>
                    <pre {...props} />
                  </div>
                ),
                code: ({node, ...props}) => (
                  <code className='bg-black/10 rounded-lg p-1' {...props} />
                )
                }}>{msg.content}</Markdown>
              </div>
            ))}
      </div>
    </div>
   </div>
  )
}

export default CodeGenerationPage