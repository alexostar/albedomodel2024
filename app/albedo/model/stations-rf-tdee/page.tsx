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
const deltaAlbedo = (snowCoverPercentage: number): number => {
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

  const tsw = 0.854;
  const earthm2 = 5.1e14;
  const rsw = [5, 24, 68, 125, 182, 197, 182, 141, 79, 36, 9, 2];

  const monthlyStationValues = stations2.map((station) => {
    const albedoTimesRsw = {
      jan: deltaAlbedo(station.jan) * rsw[0],
      feb: deltaAlbedo(station.feb) * rsw[1],
      mar: deltaAlbedo(station.mar) * rsw[2],
      apr: deltaAlbedo(station.apr) * rsw[3],
      may: deltaAlbedo(station.may) * rsw[4],
      jun: deltaAlbedo(station.jun) * rsw[5],
      jul: deltaAlbedo(station.jul) * rsw[6],
      aug: deltaAlbedo(station.aug) * rsw[7],
      sep: deltaAlbedo(station.sep) * rsw[8],
      oct: deltaAlbedo(station.oct) * rsw[9],
      nov: deltaAlbedo(station.nov) * rsw[10],
      dec: deltaAlbedo(station.dec) * rsw[11],
    };

    const averageAlbedoTimesRsw =
      Object.values(albedoTimesRsw).reduce((sum, value) => sum + value, 0) / 12;

    const rf = (averageAlbedoTimesRsw * tsw) / earthm2;
    const tdee = averageAlbedoTimesRsw * 19.9;

    return {
      ...station,
      albedoTimesRsw,
      averageAlbedoTimesRsw,
      rf,
      tdee,
    };
  });

  // Calculate the overall averages
  const overallAverage =
    monthlyStationValues.reduce(
      (sum, station) => sum + station.averageAlbedoTimesRsw,
      0
    ) / monthlyStationValues.length;

  const overallRF =
    monthlyStationValues.reduce((sum, station) => sum + station.rf, 0) /
    monthlyStationValues.length;

  const overalTdee =
    monthlyStationValues.reduce((sum, station) => sum + station.tdee, 0) /
    monthlyStationValues.length;

  return (
    <div className='container mx-auto py-10 max-w-7xl'>
      <h1 className='text-2xl font-bold mb-6 text-center'>
        Neikvæð loftslagsáhrif endurskinsbreytinga í kolefnisrækt með furu og
        greni
      </h1>

      <p className='mb-2'>
        Taflan sýnir breytingu á mánaðarlegu endurkasti sólgeislunar (W/m2) á
        177 veðurstöðvum við skógrækt með furu og greni. Fyrir hverja veðurstöð
        er meðaltal allra mánaða reiknað og síðan hvaða áhrif það hefur á
        geislunarþvingun (Radiative forcing, RF). Áhrifin á geislunarþvingun eru
        svo umreiknuð í hitunarárhif endurskinsbreytinganna sem CO2 ígildi
        (Time-Dependent Emissions Equivalent, TDEE).
      </p>
      <p>Útreikingar byggðir á:</p>
      <a
        href='https://esajournals.onlinelibrary.wiley.com/doi/10.1890/15-1597.1'
        className='text-primary mb-4'>
        Ryan M. Bright et. al. (2016) Carbon-equivalent metrics for albedo
        changes in land management contexts: relevance of the time dimension{' '}
      </a>
      <p>Forsendur:</p>
      <p className='mb-4'>
        Munur á endurskinsstuðli (albedo) 0.55 fyrir snæviþakið land, annars
        0.06.
      </p>
      <p className='font-semibold'>
        Meðalbreyting á endurkasti fyrir allar veðurstöðvar:{' '}
        {overallAverage.toFixed(2)} W/m2
      </p>
      <p className='font-semibold'>
        Meðalbreyting á geislunarþvingun (RF):{' '}
        {formatScientificNotation(overallRF)} W/m2
      </p>
      <p className='font-semibold'>
        Meðal-hlýnunarárhif í CO2-ígildum (TDEE): {overalTdee.toFixed(0)} tonn
        CO2í/ha
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
              <TableHead>Meðaltal</TableHead>
              <TableHead>RF</TableHead>
              <TableHead>TDEE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {monthlyStationValues.map((station) => (
              <TableRow key={station.id}>
                <TableCell>{station.name}</TableCell>
                <TableCell>{station.albedoTimesRsw.jan.toFixed(2)}</TableCell>
                <TableCell>{station.albedoTimesRsw.feb.toFixed(2)}</TableCell>
                <TableCell>{station.albedoTimesRsw.mar.toFixed(2)}</TableCell>
                <TableCell>{station.albedoTimesRsw.apr.toFixed(2)}</TableCell>
                <TableCell>{station.albedoTimesRsw.may.toFixed(2)}</TableCell>
                <TableCell>{station.albedoTimesRsw.jun.toFixed(2)}</TableCell>
                <TableCell>{station.albedoTimesRsw.jul.toFixed(2)}</TableCell>
                <TableCell>{station.albedoTimesRsw.aug.toFixed(2)}</TableCell>
                <TableCell>{station.albedoTimesRsw.sep.toFixed(2)}</TableCell>
                <TableCell>{station.albedoTimesRsw.oct.toFixed(2)}</TableCell>
                <TableCell>{station.albedoTimesRsw.nov.toFixed(2)}</TableCell>
                <TableCell>{station.albedoTimesRsw.dec.toFixed(2)}</TableCell>
                <TableCell>
                  {station.averageAlbedoTimesRsw.toFixed(2)}
                </TableCell>
                <TableCell>{formatScientificNotation(station.rf)}</TableCell>
                <TableCell>{station.tdee.toFixed(0)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
