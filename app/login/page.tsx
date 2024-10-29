import { createCookiesClient } from '@/supabase/clients/server';
import { redirect } from 'next/navigation';
import { SubmitButton } from './_components/SubmitButton';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    'use server';

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = createCookiesClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect('/login?message=Could not authenticate user');
    }

    return redirect('/photos');
  };

  return (
    <div className='mx-auto mt-32 flex w-full flex-1 items-center justify-center px-8 sm:max-w-md'>
      <Card className='w-full max-w-sm'>
        <form>
          <CardHeader>
            <CardTitle className='text-2xl'>Sign in</CardTitle>
            <CardDescription>
              This website is under development. Please contact
              sigfus@natturuvinir.is for further details.
            </CardDescription>
          </CardHeader>

          <CardContent className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                name='email'
                placeholder='••••••••'
                required
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                name='password'
                placeholder='••••••••'
                required
              />
            </div>
          </CardContent>

          <CardFooter>
            <SubmitButton formAction={signIn} className='w-full'>
              Sign in
            </SubmitButton>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
