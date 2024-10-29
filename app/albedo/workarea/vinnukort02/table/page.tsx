import { createClient } from '@/supabase/clients/browserclient';
import { Stodvartj } from '@/types/collection';

export const revalidate = 1800; // 30 minutes

export default async function MapPage() {
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
    <div className='container mx-auto py-10 max-w-7xl'>
      <h1 className='text-2xl font-bold mb-2 text-center'>
        All stations imported from the{' '}
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

      <div className='text-sm overflow-x-auto max-w-3xl pt-16 mx-auto'>
        <table className='min-w-full'>
          <thead>
            <tr>
              <th className='px-4 py-2'>Númer</th>
              <th className='px-4 py-2'>Nafn</th>
              <th className='px-4 py-2'>Lat-Lng</th>
              <th className='px-4 py-2'>Hæð</th>
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
                <th className='border px-4 py-2'>{data.alt}</th>
                <th className='border px-4 py-2'>{data.first_year}</th>
                <th className='border px-4 py-2'>{data.last_year}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
