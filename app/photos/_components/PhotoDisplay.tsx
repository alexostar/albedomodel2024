import Image from 'next/image'
import Link from 'next/link'

import { ImageTypes } from '@/types/collection'

type Props = {
  image: ImageTypes
}

export default function PhotoDisplay({ image }: Props) {
  return (
    <div className='flex flex-col'>
      <Link href={`photos/${image.id}`}>
        <div className='relative h-64 w-96 overflow-hidden rounded-xl border-2'>
          <Image
            src={image.path}
            alt={image.title}
            width={2100}
            height={1400}
            style={{
              objectFit: 'cover'
            }}
          />
        </div>
        <p className='ml-2'>{image.title}</p>
      </Link>
    </div>
  )
}
