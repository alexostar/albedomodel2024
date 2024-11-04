import { createClient } from '@/supabase/clients/browserclient';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default async function StationsHome() {
  const supabase = createClient();
  const { data: stations2 } = await supabase
    .from('stations2')
    .select('*')
    .order('name');

  if (!stations2?.length) {
    return <h1>No data</h1>;
  }

  return (
    <div className='container mx-auto py-10 max-w-7xl'>
      <h1 className='text-2xl font-bold mb-4 text-center'>
        Grunngögn: Veðurstöðvar og snjóþekja (%)
      </h1>
      <p className='ml-8 lg:ml-0'>Gögn frá Veðurstofu Íslands</p>

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
              <TableHead>Upphafsár</TableHead>
              <TableHead>Lokaár</TableHead>
              <TableHead>Árafjöldi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stations2.map((station) => (
              <TableRow key={station.id}>
                <TableCell>{station.name}</TableCell>
                <TableCell>{station.jan}</TableCell>
                <TableCell>{station.feb}</TableCell>
                <TableCell>{station.mar}</TableCell>
                <TableCell>{station.apr}</TableCell>
                <TableCell>{station.may}</TableCell>
                <TableCell>{station.jun}</TableCell>
                <TableCell>{station.jul}</TableCell>
                <TableCell>{station.aug}</TableCell>
                <TableCell>{station.sep}</TableCell>
                <TableCell>{station.oct}</TableCell>
                <TableCell>{station.nov}</TableCell>
                <TableCell>{station.dec}</TableCell>
                <TableCell>{station.first_year}</TableCell>
                <TableCell>{station.last_year}</TableCell>
                <TableCell>
                  {station.last_year - station.first_year + 1}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
