import { createClient } from '@/supabase/clients/browserclient';
// import { Stations } from '@/types/collection';

type Stations = {
  created_at: string;
  id: number;
  station: number;
  year: number;
  month: number;
  snowcover: number;
  name: string;
  col_f: string | null;
  col_g: string | null;
  col_h: string | null;
  snowcoverCalc: number;
};

export default async function StationsHome() {
  const supabase = createClient();
  const { data: stationData } = await supabase.from('stations').select();
  //const places = stationData as Stations[];

  if (!stationData?.length) {
    return <h1>No data</h1>;
  }

  console.log('Length: ', stationData.length);

  const station = 1;
  const month = 4;
  const snowcoverCalc = stationData.filter(
    (data) => data.month === month && data.station === station
  );

  console.log('snowcoverCalc: ', snowcoverCalc);

  const averageSnowcover =
    snowcoverCalc.reduce((sum, data) => sum + data.snowcover, 0) /
    snowcoverCalc.length;

  console.log(
    `Average snowcover for month ${month}: ${averageSnowcover} at station ${station}`
  );

  return (
    <div className='mx-auto flex flex-col lg:py-8 lg:container'>
      <h1>Stations</h1>
    </div>
  );
}
