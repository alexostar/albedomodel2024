import { LatLngExpression, LatLngTuple } from 'leaflet';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import { createClient } from '@/supabase/clients/browserclient';

import { Stations2 } from '@/types/collection';
import { Skogarkolefni } from '@/types/collection';

// Update the Places type to include the new stationNames structure
export type Places = {
  id: number;
  name: string;
  latlng: LatLngExpression | LatLngTuple;
  albedopine: number | null;
  origin: string;
  vedurstod: string | null;
  station?: string;
  jan?: number;
  feb?: number;
  mar?: number;
  apr?: number;
  may?: number;
  jun?: number;
  jul?: number;
  aug?: number;
  sep?: number;
  oct?: number;
  nov?: number;
  dec?: number;
  first_year?: number;
  last_year?: number;
  averageMonthly?: number;
  vedurstodvar: [number] | null;
  stationNames: { station: string; name: string }[] | null;
};

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

  // Fetch data from both tables concurrently
  const [{ data: weatherdata }, { data: carbondata }, { data: allStations }] =
    await Promise.all([
      supabase.from('stations2').select(),
      supabase.from('skogarkolefni').select().eq('frontpage', true),
      supabase.from('stations2').select('id, station, name'),
    ]);
  //console.log('All stations:', allStations); // Log all stations

  if (!weatherdata?.length || !carbondata?.length) {
    return <h1>No places to Display</h1>;
  }

  const places: Places[] = [
    ...carbondata.map((item: Skogarkolefni): Places => {
      const stationNames = item.vedurstodvar
        ? (item.vedurstodvar
            .map((stationNumber) => {
              const station = allStations?.find(
                (s) => s.station === stationNumber.toString()
              );

              return station
                ? { station: station.station, name: station.name }
                : null;
            })
            .filter(Boolean) as { station: string; name: string }[])
        : null;

      return {
        id: item.id,
        name: item.name,
        latlng: item.latlng as LatLngExpression | LatLngTuple,
        albedopine: item.albedopine,
        vedurstod: item.vedurstod,
        vedurstodvar: item.vedurstodvar,
        origin: 'Carbon',
        stationNames: stationNames,
      };
    }),
    ...weatherdata.map((obj: Stations2): Places => {
      const monthlyValues = [
        obj.jan,
        obj.feb,
        obj.mar,
        obj.apr,
        obj.may,
        obj.jun,
        obj.jul,
        obj.aug,
        obj.sep,
        obj.oct,
        obj.nov,
        obj.dec,
      ];
      return {
        id: obj.id,
        name: obj.name,
        latlng: obj.latlng as LatLngExpression | LatLngTuple,
        station: obj.station,
        jan: obj.jan,
        feb: obj.feb,
        mar: obj.mar,
        apr: obj.apr,
        may: obj.may,
        jun: obj.jun,
        jul: obj.jul,
        aug: obj.aug,
        sep: obj.sep,
        oct: obj.oct,
        nov: obj.nov,
        dec: obj.dec,
        first_year: obj.first_year,
        last_year: obj.last_year,
        origin: 'Weather',
        averageMonthly: Number(
          (monthlyValues.reduce((sum, value) => sum + value, 0) / 12).toFixed(1)
        ),
        albedopine: null,
        vedurstod: null,
        vedurstodvar: null,
        stationNames: null,
      };
    }),
  ];

  return (
    <div className='mx-auto flex flex-col lg:py-8 lg:container'>
      <h1 className='ml-8  text-xl font-bold lg:ml-0'>
        Veðurstöðvar og kolefnisræktarverkefni
      </h1>
      <h2 className='ml-8 text-lg font-semibold lg:ml-0 mb-2'>
        Snóþekjumælingar á 177 veðurstöðvum og val á veðurstöðvum fyrir hvert
        verkefni
      </h2>
      <p className='ml-8 lg:ml-0 mb-2'>Gögn frá Veðurstofu Íslands</p>

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
        Grænt: Kolefnisrækt, Gult: Veðurstöð
      </p>
    </div>
  );
}
