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
const calculateAlbedo = (snowCoverPercentage: number): number => {
  return (0.7 * snowCoverPercentage + 0.1 * (100 - snowCoverPercentage)) / 100;
};

export default async function StationsHome() {
  const supabase = createClient();
  const { data: stationsummary } = await supabase
    .from('stationsummary')
    .select('*')
    .order('name');

  if (!stationsummary?.length) {
    return <h1>No data</h1>;
  }

  return (
    <div className='container mx-auto py-10 max-w-7xl'>
      <h1 className='text-2xl font-bold mb-2 text-center'>
        Stations Summary Page
      </h1>

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
              <TableHead>Start</TableHead>
              <TableHead>End</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stationsummary.map((station) => (
              <TableRow key={station.id}>
                <TableCell>{station.name}</TableCell>
                <TableCell>
                  {station.jan !== null ? station.jan : 'NULL'}
                </TableCell>
                <TableCell>
                  {station.feb !== null ? station.feb : 'NULL'}
                </TableCell>
                <TableCell>
                  {station.mar !== null ? station.mar : 'NULL'}
                </TableCell>
                <TableCell>
                  {station.apr !== null ? station.apr : 'NULL'}
                </TableCell>
                <TableCell>
                  {station.may !== null ? station.may : 'NULL'}
                </TableCell>
                <TableCell>
                  {station.jun !== null ? station.jun : 'NULL'}
                </TableCell>
                <TableCell>
                  {station.jul !== null ? station.jul : 'NULL'}
                </TableCell>
                <TableCell>
                  {station.aug !== null ? station.aug : 'NULL'}
                </TableCell>
                <TableCell>
                  {station.sep !== null ? station.sep : 'NULL'}
                </TableCell>
                <TableCell>
                  {station.oct !== null ? station.oct : 'NULL'}
                </TableCell>
                <TableCell>
                  {station.nov !== null ? station.nov : 'NULL'}
                </TableCell>
                <TableCell>
                  {station.dec !== null ? station.dec : 'NULL'}
                </TableCell>
                <TableCell>{station.first_year}</TableCell>
                <TableCell>{station.last_year}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
