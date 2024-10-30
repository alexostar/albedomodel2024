// Tile layer changed to Google Maps in Map component
// https://medium.com/@mayardeeb/free-google-maps-in-react-a425ee269359 and
// https://codesandbox.io/s/react-leaflet-google-maps-free-rwzstu?file=/src/App.tsx:2305-2471

import dynamic from 'next/dynamic';
//import { useMemo } from 'react';

import { createClient } from '@/supabase/clients/browserclient';

import { Skogarkolefni } from '@/types/collection';

export const revalidate = 1800; // 30 minutes

export default async function MapPage() {
  const Map = dynamic(() => import('./_components/map'), {
    loading: () => <p>The map is loading</p>,
    ssr: false,
  });

  const supabase = createClient();
  const { data } = await supabase
    .from('skogarkolefni')
    .select()
    .eq('frontpage', true);

  if (!data?.length) {
    return <h1>No places to Display</h1>;
  }

  const places = data as Skogarkolefni[];

  return (
    <div className='mx-auto flex flex-col lg:py-8 lg:container'>
      <h1 className='ml-8  text-xl font-bold lg:ml-0 mb-4'>
        Íslensk kolefnisrækt
      </h1>
      <div className='h-[800px] w-[100%]'>
        <Map
          posix={[65.0, -18.9]}
          maxBounds={[
            [60.5, -26.6], // Southwest corner
            [70.0, -10.0], // Northeast corner
          ]}
          places={places}
        />
      </div>
      <p className='ml-8 mt-2 text-sm italic lg:ml-0'>
        Kolefnisræktarverkefni og vottunarstaða þeirra. Síðast uppfært 20.
        október 2024
      </p>
      <p className='ml-8 text-sm italic lg:ml-0'>
        Grænt: Vottað verkefni, Gult: Skráð en ekki vottað, Rautt: Ekki skráð í{' '}
        <span>
          <a
            href='https://www.carbonregistry.com/explore/projects?countries=IS&methodologies=FCC'
            target='_blank'
            className='underline'>
            Loftslagsskrá
          </a>
        </span>
      </p>
    </div>
  );
}
