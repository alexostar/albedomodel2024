// Tile layer changed to Google Maps in Map component
// https://medium.com/@mayardeeb/free-google-maps-in-react-a425ee269359 and
// https://codesandbox.io/s/react-leaflet-google-maps-free-rwzstu?file=/src/App.tsx:2305-2471
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
      <p className='ml-8  text-lg lg:ml-0'>
        Vinnukort 4: Data from the stations2 table
      </p>
      <Link
        href='/vinnukort04/table'
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
      <p className='ml-8 mt-2 text-sm italic lg:ml-0'>
        Subset of all stations. Stations meeting certain criteria for relevance
        in the albedo project (ongoing work)
      </p>
      <p className='ml-8 text-sm italic lg:ml-0'>
        Grænt: Færri en 30 snjódagar mars-maí, Gult: 30-50, Rautt: Fleiri en 50
      </p>
      <div className='flex flex-col mx-auto pt-16'>
        <h2 className='text-xl font-bold'>
          Subset of all stations meeting the criteria
        </h2>
        <p className='text-lg font-bold'>
          Same subset as in the map but including stations missing lat-lng data
        </p>
        <div className='text-sm overflow-x-auto max-w-3xl'>
          <table className='min-w-full'>
            <thead>
              <tr>
                <th className='px-4 py-2'>Númer</th>
                <th className='px-4 py-2'>Nafn</th>
                <th className='px-4 py-2'>Lat-Lng</th>
                <th className='px-4 py-2'>Fyrsta ár</th>
                <th className='px-4 py-2'>Síðasta ár</th>
              </tr>
            </thead>
            <tbody>
              {allPlaces.map((data) => (
                <tr key={data.id}>
                  <td className='border px-4 py-2'>{data.station}</td>
                  <td className='border px-4 py-2'> {data.name}</td>
                  <td className='border px-4 py-2'> {String(data.latlng)}</td>
                  <th className='border px-4 py-2'>{data.first_year}</th>
                  <th className='border px-4 py-2'>{data.last_year}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
