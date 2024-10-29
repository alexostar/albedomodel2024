import PhotoDisplay from './_components/PhotoDisplay';

import { createClient } from '@/supabase/clients/browserclient';
import { createCookiesClient } from '@/supabase/clients/server';
import { redirect } from 'next/navigation';

export default async function PhotoHome() {
  const supabasecookies = createCookiesClient();
  const {
    data: { user },
  } = await supabasecookies.auth.getUser();
  if (!user) {
    return redirect('/login');
  }

  const supabase = createClient();
  const { data: images } = await supabase.from('images').select();

  if (!images?.length) {
    return <h1>No Images to Display</h1>;
  }

  return (
    <div className='mx-auto flex flex-col items-center py-8 lg:container '>
      <div className='grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3'>
        {images.map((image) => (
          <PhotoDisplay key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
}
