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
import {
  Matrix,
  matrix,
  multiply,
  MathNumericType,
  inv,
  sum,
  divide,
} from 'mathjs';
//import { headers } from 'next/headers';

// This function calculates the albedo changes caused by afforestation that are due to
// changes in snowcover AND vegetation
const calculateAlbedo = (snowCoverPercentage: number): number => {
  return (
    (0.55 * snowCoverPercentage + 0.06 * (100 - snowCoverPercentage)) / 100
  );
};

// Add this function near the top of your file, after the imports
const formatScientificNotation = (num: number): string => {
  return num.toExponential(3);
};

export default async function StationsHome() {
  const supabase = createClient();
  const { data: stations2 } = await supabase
    .from('stations2')
    .select('*')
    .order('name');

  if (!stations2?.length) {
    return <h1>No data</h1>;
  }

  // Get the host from the headers
  //const headersList = headers();
  //const host = headersList.get('host') || '';
  //const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';

  // Construct the full URL
  //const fullUrl = `${protocol}://${host}/matrices/New_Joos_100x100_matrix.json`;

  // Use the full URL in the fetch call
  const response = await fetch(
    'https://hlkyrtglhpmrhzudaqzu.supabase.co/storage/v1/object/public/vin2024/New_Joos_100x100_matrix.json?t=2024-10-23T14%3A15%3A06.866Z'
  );
  const matrix100 = await response.json();
  if (!matrix100.length) {
    return <h1>No data</h1>;
  }

  const tsw = 0.854;
  const earthm2 = 5.1e14;
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

    const rsw =
      Object.values(albedoEffect).reduce((sum, value) => sum + value, 0) / 12;

    const rf = (rsw * tsw) / earthm2;

    return {
      ...station,
      albedoEffect,
      rsw,
      rf,
    };
  });

  // Calculate the overall averages
  const overallAverage =
    stationsWithAlbedoEffect.reduce((sum, station) => sum + station.rsw, 0) /
    stationsWithAlbedoEffect.length;
  const overallRF =
    stationsWithAlbedoEffect.reduce((sum, station) => sum + station.rf, 0) /
    stationsWithAlbedoEffect.length;

  // Calculate TDEE
  const mathMatrix100 = matrix(matrix100);
  const inverse100 = inv(mathMatrix100);
  console.log(inverse100);

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
        Monthly albedo effect (W/m2) based on albedo changes of 0.55 for
        snow-covered periods and 0.06 for snow-free periods
      </p>
      <p>Albedo effects sat to 0 for the first 25 years</p>
      <p className='font-semibold'>
        Average effect across months and stations: {overallAverage.toFixed(2)}{' '}
        W/m2
      </p>
      <p className='font-semibold'>
        Average RF: {formatScientificNotation(overallRF)}
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
              <TableHead>Mean</TableHead>
              <TableHead>RF</TableHead>
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
                <TableCell>{station.rsw.toFixed(2)}</TableCell>
                <TableCell>{formatScientificNotation(station.rf)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
