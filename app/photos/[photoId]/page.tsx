import BigPhotoDisplay from '../_components/BigPhotoDisplay'

import { createClient } from '@/supabase/clients/browserclient'
import { redirect } from 'next/navigation'

type Props = {
  params: {
    photoId: string
  }
}

export const dynamic = 'force-static'

export async function generateStaticParams() {
  const supabase = createClient()
  const { data } = await supabase.from('images').select('id')
  if (!data) {
    return []
  }
  return data?.map(({ id }) => ({
    slug: id
  }))
}

export default async function Photo({ params: { photoId } }: Props) {
  const supabase = createClient()
  const { data: image, error } = await supabase
    .from('images')
    .select()
    .match({ id: photoId })
    .single()

  if (!image || error) {
    redirect('/')
  }

  return <BigPhotoDisplay image={image} />
}
