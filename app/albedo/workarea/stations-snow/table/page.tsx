import { createClient } from '@/supabase/clients/browserclient';
import { Stations2 } from '@/types/collection';

export const revalidate = 1800; // 30 minutes

export default async function MapPage() {
  const supabase = createClient();
  const { data } = await supabase.from('stations2').select().order('name');

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
        Veðurstöðvar, snjóþekja og CO2 ígildi endurskinsbreytinga (TDEE)
      </h1>
      <p className='font-semibold'>
        Snjóþekja: Meðaltal allra mánuða og ára fyrir hverja stöð
      </p>
      <div className='flex flex-col mx-auto pt-8'>
        <div className='text-sm overflow-x-auto max-w-3xl'>
          <table className='min-w-full'>
            <thead>
              <tr>
                <th className='px-4 py-2 text-left'>Númer</th>
                <th className='px-4 py-2 text-left'>Nafn</th>
                <th className='px-4 py-2 text-left'>Hnit</th>
                <th className='px-4 py-2 text-left'>Upphaf</th>
                <th className='px-4 py-2 text-left'>Endir</th>
                <th className='px-4 py-2 text-left'>Snjóþekja</th>
                <th className='px-4 py-2 text-left'>TDEE</th>
              </tr>
            </thead>
            <tbody>
              {allPlaces.map((data) => (
                <tr key={data.id}>
                  <td className='border px-4 py-2'>{data.station}</td>
                  <td className='border px-4 py-2'> {data.name}</td>
                  <td className='border px-4 py-2'> {String(data.latlng)}</td>
                  <td className='border px-4 py-2'>{data.first_year}</td>
                  <td className='border px-4 py-2'>{data.last_year}</td>
                  <td className='border px-4 py-2'>{data.avg_monthly_value}</td>
                  <td className='border px-4 py-2'>{data.tdee_055_006}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
