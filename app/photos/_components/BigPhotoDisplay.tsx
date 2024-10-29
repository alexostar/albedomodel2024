import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { ImageTypes } from '@/types/collection';

type Props = {
  image: ImageTypes;
};

export default function BigPhotoDisplay({ image }: Props) {
  return (
    <div className='mx-auto flex max-w-[1200px] flex-col items-center justify-center pt-3'>
      <div className='flex w-full flex-row justify-start'>
        <Link href='/photos' className='mb-4 text-left text-primary'>
          <Button variant='outline' size='icon'>
            <ArrowLeft />
          </Button>
        </Link>
      </div>
      <div className='relative max-h-[800px] max-w-[1200px] rounded-xl border-2'>
        <Image
          src={image.path}
          alt={image.title}
          width={2100}
          height={1400}
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
      <div className='flex w-full flex-col items-start px-4 py-4'>
        <p className=''>Mynd: {image.title}</p>
        <p>
          Hér gætu komið upplýsingar um myndina og hlekkur til að hlaða niður
          high-resolution mynd, ef höfundur leyfir{' '}
        </p>
      </div>
    </div>
  );
}
