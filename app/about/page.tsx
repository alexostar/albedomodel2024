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
        <div className='min-w-24 max-w-24 flex flex-col gap-2'>
          <Avatar className='h-24 w-24'>
            <AvatarImage src='/avatar-sbj.jpg' alt={siteConfig.author} />
            <AvatarFallback>JC</AvatarFallback>
          </Avatar>
          <h2 className='text-sm font-senubold text-center break-words'>
            {siteConfig.author}
          </h2>
        </div>
        <div>
          <p className='text-muted-foreground text-lg font-semibold'>
            Design tests
          </p>
          <p className='text-muted-foreground text-lg'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </div>
  );
}
