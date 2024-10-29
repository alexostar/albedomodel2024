import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { siteConfig } from '@/config/site';
import { Metadata } from 'next';

import { createCookiesClient } from '@/supabase/clients/server';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'About Carbon Forestry',
  description: 'Information about this website',
};

export default async function AboutPage() {
  const supabasecookies = createCookiesClient();
  const {
    data: { user },
  } = await supabasecookies.auth.getUser();
  if (!user) {
    return redirect('/login');
  }

  return (
    <div className='container max-w-6xl py-6 lg:py-10'>
      <div className='flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8'>
        <div className='flex-1 space-x-4'>
          <h1 className='inline-block font-black text-4xl lg:text-5xl'>
            Friends of Icelandic Nature
          </h1>
        </div>
      </div>
      <hr className='my-8' />
      <div className='flex flex-col md:flex-row gap-8 items-center md:items-start'>
        <div className='min-w-48 max-w-48 flex flex-col gap-2'>
          <Avatar className='h-48 w-48'>
            <AvatarImage src='/avatar-sbj.jpg' alt={siteConfig.author} />
            <AvatarFallback>JC</AvatarFallback>
          </Avatar>
          <h2 className='text-lg font-bold text-center break-words'>
            {siteConfig.author}
          </h2>
          <p className='text-muted-foreground text-center break-words'>
            Senior Developer
          </p>
        </div>
        <p className='text-muted-foreground text-lg py-4'>
          Over a millennium ago, when humans first settled in Iceland, it is
          estimated that birch forest and shrublands covered 20-40% of the land.
          The Book of Icelanders paints a picture of a landscape covered with
          wood from the mountains to the sea. The settlers burned woodlands to
          establish grazing areas and to make charcoal for fuel. Over the
          centuries vulnerable soils, sheep grazing, volcanic activities and
          colder climate resulted in a more or less treeless land, vegetation
          atrophy and eroded soils.
        </p>
      </div>
    </div>
  );
}
