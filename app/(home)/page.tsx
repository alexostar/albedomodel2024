//import { createCookiesClient } from '@/supabase/clients/server';
//import { redirect } from 'next/navigation';

import Link from 'next/link';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import { createClient } from '@/supabase/clients/browserclient';

import { Stations2 } from '@/types/collection';

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

  const supabase = createClient();
  const { data } = await supabase.from('stations2').select();

  if (!data?.length) {
    return <h1>No places to Display</h1>;
  }

  const allPlaces = data as Stations2[];
  const places = allPlaces.filter(
    (place) => place.latlng !== null
  ) as Stations2[];

  return (
    <div className='mx-auto flex flex-col lg:py-8 lg:container'>
      <h1 className='ml-8  text-xl font-bold lg:ml-0 mb-2'>
        Loftslagsáhrif endurskinsbreytinga við nýskógrækt með furu og/eða greni
      </h1>
      <h2 className='ml-8  text-lg font-semibold lg:ml-0 mb-2'>
        Niðurstöður rannsóknar á hlýnunaráhrifum skógræktar, umreiknuð í ígildi
        CO<sub>2</sub> losunar
      </h2>

      <Link href='/table' className='mb-4 text-primary font-semibold'>
        Skoða gögn í töflu
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

      <p className='ml-8 mt-2 text-sm italic lg:ml-0'>
        Grænt: Hlýnunaráhrif minni en 180 tCO<sub>2</sub>/ha, Gult: 180-260,
        Rautt: Hlýnunaráhrif meiri en 260 tCO<sub>2</sub>/ha
      </p>
    </div>
  );
}
