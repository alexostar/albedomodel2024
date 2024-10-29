import { createClient } from '@/supabase/clients/browserclient';
import { createCookiesClient } from '@/supabase/clients/server';
import { redirect } from 'next/navigation';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Heading3 } from 'lucide-react';

// This function calculates the albedo changes caused by afforestation that are due to
// changes in snowcover AND vegetation

// Checking wiht very cautious eyes
const calculateAlbedo = (snowCoverPercentage: number): number => {
  return (
    (0.55 * snowCoverPercentage + 0.06 * (100 - snowCoverPercentage)) / 100
  );
};

export default async function StationsHome() {
  const supabasecookies = createCookiesClient();
  const {
    data: { user },
  } = await supabasecookies.auth.getUser();
  if (!user) {
    return redirect('/login');
  }

  const supabase = createClient();
  const { data: stations2 } = await supabase
    .from('stations2')
    .select('*')
    .order('name');

  if (!stations2?.length) {
    return <h1>No data</h1>;
  }

  const sunpower = [5, 24, 68, 125, 182, 197, 182, 141, 79, 36, 9, 2];

  const stationsWithAlbedoEffect = stations2.map((station) => {
    const albedoEffect = {
      jan: calculateAlbedo(station.jan) * sunpower[0],
      feb: calculateAlbedo(station.feb) * sunpower[1],
      mar: calculateAlbedo(station.mar) * sunpower[2],
      apr: calculateAlbedo(station.apr) * sunpower[3],
      may: calculateAlbedo(station.may) * sunpower[4],
      jun: calculateAlbedo(station.jun) * sunpower[5],
      jul: calculateAlbedo(station.jul) * sunpower[6],
      aug: calculateAlbedo(station.aug) * sunpower[7],
      sep: calculateAlbedo(station.sep) * sunpower[8],
      oct: calculateAlbedo(station.oct) * sunpower[9],
      nov: calculateAlbedo(station.nov) * sunpower[10],
      dec: calculateAlbedo(station.dec) * sunpower[11],
    };

    const average =
      Object.values(albedoEffect).reduce((sum, value) => sum + value, 0) / 12;
    const tdee = average * 19.9;

    return {
      ...station,
      albedoEffect,
      average,
      tdee,
    };
  });

  // Calculate the overall averages
  const overallAverage =
    stationsWithAlbedoEffect.reduce(
      (sum, station) => sum + station.average,
      0
    ) / stationsWithAlbedoEffect.length;
  const overallTDEE =
    stationsWithAlbedoEffect.reduce((sum, station) => sum + station.tdee, 0) /
    stationsWithAlbedoEffect.length;

  return (
    <div className='container mx-auto py-10 max-w-7xl'>
      <h1 className='text-2xl font-bold mb-2 text-center'>
        Kolefnisrækt og endurskin
      </h1>
      <h2 className='text-xl font-bold mb-2 text-center'>
        Áhrif endurskinsbreytinga í kolefnisrækt (fura og greni)
      </h2>
      <p className='text-lg text-center mb-10 '>
        Geislunarþvingun og Time-Dependent Emissions Equivalence (TDEE)
      </p>

      <p>Monthly radiative force (W/m2) and TDEE (CO2e/ha) for all stations</p>
      <p className='font-semibold'>
        TDEE average for all stations: {overallTDEE.toFixed(0)} ton CO2/ha
      </p>
      <p>
        {' '}
        <span>
          <a
            className='text-primary'
            href='https://felagar.natturuvinir.is/s/xMTLajW5sqSXLg3'
            target='_blanc'>
            Methods and references (External link){' '}
          </a>
        </span>
        | To be completed
      </p>
      <div className='overflow-x-auto pt-4'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Veðurstöð</TableHead>
              <TableHead>Jan</TableHead>
              <TableHead>Feb</TableHead>
              <TableHead>Mar</TableHead>
              <TableHead>Apr</TableHead>
              <TableHead>May</TableHead>
              <TableHead>Jun</TableHead>
              <TableHead>Jul</TableHead>
              <TableHead>Aug</TableHead>
              <TableHead>Sep</TableHead>
              <TableHead>Oct</TableHead>
              <TableHead>Nov</TableHead>
              <TableHead>Dec</TableHead>

              <TableHead>TDEE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stationsWithAlbedoEffect.map((station) => (
              <TableRow key={station.id}>
                <TableCell>{station.name}</TableCell>
                <TableCell>{station.albedoEffect.jan.toFixed(2)}</TableCell>
                <TableCell>{station.albedoEffect.feb.toFixed(2)}</TableCell>
                <TableCell>{station.albedoEffect.mar.toFixed(2)}</TableCell>
                <TableCell>{station.albedoEffect.apr.toFixed(2)}</TableCell>
                <TableCell>{station.albedoEffect.may.toFixed(2)}</TableCell>
                <TableCell>{station.albedoEffect.jun.toFixed(2)}</TableCell>
                <TableCell>{station.albedoEffect.jul.toFixed(2)}</TableCell>
                <TableCell>{station.albedoEffect.aug.toFixed(2)}</TableCell>
                <TableCell>{station.albedoEffect.sep.toFixed(2)}</TableCell>
                <TableCell>{station.albedoEffect.oct.toFixed(2)}</TableCell>
                <TableCell>{station.albedoEffect.nov.toFixed(2)}</TableCell>
                <TableCell>{station.albedoEffect.dec.toFixed(2)}</TableCell>

                <TableCell>{station.tdee.toFixed(0)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
