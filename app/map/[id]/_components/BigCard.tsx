import { Skogarkolefni } from '@/types/collection';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function BigCard(place: Skogarkolefni) {
  return (
    <div className='w-full'>
      <Card className=''>
        <CardHeader className=''>
          <CardTitle>{place.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='mb-4'>
            <div className='flex justify-between'>
              <p>Sveitarfélag</p>
              <li>{place.community}</li>
            </div>
            <div className='flex justify-between w-full'>
              <p>Framkvæmdaraðili</p>
              {place.url_comp !== null ? (
                <li>
                  <a
                    href={place.url_comp}
                    target='_blank'
                    className='text-primary'>
                    {place.company}
                  </a>
                </li>
              ) : (
                <li>{place.company}</li>
              )}
            </div>
            <div className='flex justify-between'>
              <p>Vottunarstaðall</p>
              <li>{place.scheme}</li>
            </div>
            <div className='flex justify-between'>
              <p>Staða vottunar</p>
              {place.status === 'certified' ? (
                <li>Vottað</li>
              ) : place.status === 'registered' ? (
                <li>Óvottað</li>
              ) : (
                <li>Ekki í Loftslagsskrá</li>
              )}
            </div>
            <div>
              {place.icr !== null && (
                <a href={place.icr} target='_blank' className='text-primary'>
                  Tengill á vottunarskjöl
                </a>
              )}
            </div>
            <div>
              {place.projectdata !== null && (
                <a
                  href={place.projectdata}
                  target='_blank'
                  className='text-primary'>
                  Tengill á skjöl sveitarfélags
                </a>
              )}
            </div>
            <div>
              {place.allimages !== null && (
                <a
                  href={place.allimages}
                  className='text-primary'
                  target='_blank'>
                  Myndir: {place.photographer}
                </a>
              )}
            </div>
            <div>
              {place.species !== null && (
                <li className=''>Tegundir: {place.species}</li>
              )}
            </div>
            <div>
              {place.year !== null && (
                <li className=''>Upphafsár: {place.year}</li>
              )}
            </div>
            <div>
              {place.size !== null && (
                <li className=''>Hektarar: {place.size}</li>
              )}
            </div>
            <div>
              {place.capture !== null && (
                <li className=''>Áætluð binding (tonn CO2): {place.capture}</li>
              )}
            </div>
          </ul>

          {/*
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='font-semibold'>Upphafsár</TableHead>
                <TableHead className='text-right'>Hektarar</TableHead>
                <TableHead className='text-right'>Tonn CO2</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className=''>
                <TableCell className='font-semibold'>{place.year}</TableCell>
                <TableCell className='text-right'>{place.size}</TableCell>
                <TableCell className='text-right'>{place.capture}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {place.description !== null && (
            <p>
              <span className='font-semibold'>Aðrar upplýsingar: </span>
              {place.description}
            </p>
          )}
          {place.tdee_055_006 !== null && (
            <p className='mt-4'>
              <span className='font-semibold'>
                Neikvæð loftslagsáhrif endurskinsbreytinga (fura/greni):{' '}
              </span>
              {place.tdee_055_006} tCO2/ha
            </p>
          )}


          {place.vedurstod !== null && (
            <p className=''>Veðurstöð: {place.vedurstod}</p>
          )}
*/}

          {place.media !== null && (
            <div className='flex flex-col gap-0 pb-4'>
              <p className='font-semibold my-4'>Verkefnið í fjölmiðlum: </p>
              <ul className='pt-0'>
                {place.media.map((med, index) => (
                  <li key={index} className='ml-3'>
                    <a href={med.url} target='_blank'>
                      {med.linktext}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {place.comments !== null && (
            <div className='flex flex-col gap-0 pb-4'>
              <p className='font-semibold my-4'>
                Umsögn Vina íslenskrar náttúru{' '}
              </p>
              <p className='ml-3'>{place.comments}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
