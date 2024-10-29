import { createCookiesClient } from '@/supabase/clients/server';
import { redirect } from 'next/navigation';
import { createClient } from '@/supabase/clients/browserclient';
//import { Stations2 } from '@/types/collection';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// This function calculates the albedo changes caused by afforestation that are due to
// changes in snowcover AND vegetation

// Original values for albedo changes
const calculateAlbedo = (snowCoverPercentage: number): number => {
  return (0.7 * snowCoverPercentage + 0.1 * (100 - snowCoverPercentage)) / 100;
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
  const { data: stations2 } = await supabase.from('stations2').select('*');

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
    const tdee = average * 21.9;

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
        Climate impacts of afforestation (spruce/pine) caused by albedo changes
      </h1>
      <h2 className='text-xl text-center mb-2 '>
        Calculated as time-dependent emissions equivalence (TDEE) – Time horizon
        100 years
      </h2>
      <p className='text-lg text-center mb-6 '>
        Preliminary calcuations based on models by Ryan M. Bright, not including
        corrections for slope, aspect and sky-view
      </p>
      <p>
        Monthly albedo effects on radiation (W/m2) based on albedo changes of
        0.7 for snow-covered periods and 0.1 for snow-free periods
      </p>
      <p>
        Snow cover data for stations and radiation data for Reykjavík (used for
        all stations) from the Icelandic Met Office
      </p>
      <p>Albedo effects sat to 0 for the first 25 years</p>
      <p className='font-semibold'>
        Average effect across months and stations: {overallAverage.toFixed(2)}{' '}
        W/m2
      </p>
      <p className='font-semibold'>
        Average TDEE: {overallTDEE.toFixed(2)} ton CO2/ha
      </p>
      <div className='overflow-x-auto pt-4'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
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
              <TableHead>Average</TableHead>
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
                <TableCell>{station.average.toFixed(2)}</TableCell>
                <TableCell>{station.tdee.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
