import { createClient } from '@/supabase/clients/browserclient';
import { Stations2 } from '@/types/collection';

export const revalidate = 1800; // 30 minutes

export default async function MapPage() {
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
      <h1 className='text-2xl font-bold mb-2 text-center'>
        Subset of dataset imported from the stodskr.txt file
      </h1>
      <h2 className='text-xl text-center '>
        Stations meeting certain criteria for relevance in the albedo project
        (ongoing work)
      </h2>
      <p className='text-lg text-center'>
        Same data as in map but including also stations without location data
      </p>
      <div className='flex flex-col mx-auto pt-16'>
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
