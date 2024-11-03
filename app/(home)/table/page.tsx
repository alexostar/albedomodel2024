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
    <div className='mx-auto flex flex-col lg:py-8 lg:container max-w-5xl'>
      <h1 className='text-2xl font-bold mb-4 text-center'>
        Veðurstöðvar, snjóþekja og CO<sub>2</sub> ígildi endurskinsbreytinga
      </h1>

      <div className='flex flex-col mx-auto'>
        <div className='text-sm overflow-x-auto max-w-5xl'>
          <p className='font-semibold'>
            Snjóþekja: Meðaltal (%) allra mánuða og ára fyrir hverja stöð
          </p>
          <p className='font-semibold mb-2'>
            CO<sub>2</sub> ígildi: Tonn/ha
          </p>
          <table className='min-w-full'>
            <thead>
              <tr>
                <th className='px-4 py-2 text-left'>Númer</th>
                <th className='px-4 py-2 text-left'>Stöð</th>
                <th className='px-4 py-2 text-left'>Hnit</th>
                <th className='px-4 py-2 text-left'>Upphaf</th>
                <th className='px-4 py-2 text-left'>Endir</th>
                <th className='px-4 py-2 text-left'>Snjóþekja</th>
                <th className='px-4 py-2 text-left'>
                  CO<sub>2 </sub>ígildi
                </th>
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
                  <td className='border px-4 py-2 text-right'>
                    {data.avg_monthly_value}
                  </td>
                  <td className='border px-4 py-2 text-right'>
                    {data.tdee_055_006}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
