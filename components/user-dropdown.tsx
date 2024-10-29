import { createCookiesClient } from '@/supabase/clients/server';

import { UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';

import Link from 'next/link';
import { redirect } from 'next/navigation';

// import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default async function UserDropDown() {
  const supabase = createCookiesClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    'use server';
    const supabase = createCookiesClient();
    await supabase.auth.signOut();
    return redirect('/login');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <UserRound className='h-[1.2rem] w-[1.2rem]' />
          <span className='sr-only'>User menu</span>
        </Button>
      </DropdownMenuTrigger>

      {user ? (
        <DropdownMenuContent>
          <DropdownMenuLabel>Signed in as</DropdownMenuLabel>
          <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <form action={signOut}>
              <button className=' py-2 text-sm '>Sign out</button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href='/login'>Sign in</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
