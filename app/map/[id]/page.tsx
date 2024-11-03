import Image from 'next/image';
import { createClient } from '@/supabase/clients/browserclient';
import { redirect } from 'next/navigation';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { Skogarkolefni } from '@/types/collection';
import BigCard from './_components/BigCard';

type Props = {
  params: {
    id: string;
  };
};

export default async function Slide({ params: { id } }: Props) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('skogarkolefni')
    .select()
    .match({ id: id })
    .single();

  if (!data || error) {
    redirect('/');
  }

  const place = data as Skogarkolefni;

  return (
    <div className='container mx-auto flex max-w-3xl min-w-[600px] flex-col items-center justify-center pt-8'>
      <div className='w-full flex justify-start'>
        <Link href='/map' className='mb-4 flex justify-start'>
          <Button variant='outline' size='icon'>
            <ArrowLeft className='h-[1.2rem] w-[1.2rem]' />
          </Button>
        </Link>
      </div>

      <BigCard {...place} />
    </div>
  );
}
