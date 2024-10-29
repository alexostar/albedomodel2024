// Tile layer changed to Google Maps in Map component
// https://medium.com/@mayardeeb/free-google-maps-in-react-a425ee269359 and
// https://codesandbox.io/s/react-leaflet-google-maps-free-rwzstu?file=/src/App.tsx:2305-2471

import { createCookiesClient } from '@/supabase/clients/server';
import { redirect } from 'next/navigation';

import Link from 'next/link';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import { createClient } from '@/supabase/clients/browserclient';

import { Stodvartj } from '@/types/collection';

export const revalidate = 1800; // 30 minutes

export default async function MapPage() {
  const Map = useMemo(
    () =>
      dynamic(() => import('./_components/map'), {
        loading: () => <p>The map is loading</p>,
        ssr: false,
      }),
    []
  );

  const supabasecookies = createCookiesClient();
  const {
    data: { user },
  } = await supabasecookies.auth.getUser();
  if (!user) {
    return redirect('/login');
  }

  const supabase = createClient();
  const { data } = await supabase.from('stodvartj').select();

  if (!data?.length) {
    return <h1>No places to Display</h1>;
  }

  const allPlaces = data as Stodvartj[];
  const places = allPlaces.filter(
    (place) => place.latlng !== null
  ) as Stodvartj[];

  return (
    <div className='mx-auto flex flex-col lg:py-8 lg:container'>
      <h1 className='ml-8  text-xl font-bold lg:ml-0'>
        Vinnukort 2: All stations imported from the{' '}
        <span>
          <a
            className='text-primary italic'
            href='https://felagar.natturuvinir.is/s/xMTLajW5sqSXLg3'
            target='_blanc'>
            Coordinates_TJ2024.xlsx
          </a>
        </span>{' '}
        file
      </h1>

      <Link
        href='/vinnukort02/table'
        className='mb-4 text-primary font-semibold'>
        View data in table
      </Link>
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
      <p className='ml-8 mt-2 text-sm italic lg:ml-0 font-semibold'>
        Veðurstöðvar in Coordinates_TJ2024.xlsx
      </p>
    </div>
  );
}
