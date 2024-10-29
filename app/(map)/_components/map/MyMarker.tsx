import Image from 'next/image';
import Link from 'next/link';
import { Popup } from 'react-leaflet';
import { Skogarkolefni } from '@/types/collection';
//import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

export default function MyMarker(place: Skogarkolefni) {
  return (
    <div className='h-[200px] w-[300px]'>
      <Popup>
        <ul className='mb-2'>
          <li className='font-bold'>{place.name}</li>
          {place.url_comp !== null ? (
            <li>
              <a href={place.url_comp} target='_blank'>
                {place.company}
              </a>
            </li>
          ) : (
            <li>{place.company}</li>
          )}
          <li>Vottunarstaðall: {place.scheme}</li>

          {place.status === 'certified' ? (
            <li>Staða vottunar: Verkefnið vottað</li>
          ) : place.status === 'registered' ? (
            <li>Staða vottunar: Verkefnið skráð en óvottað</li>
          ) : place.status === 'noplan' ? (
            <li>Staða vottunar: Ekki á dagskrá</li>
          ) : (
            <li>Staða vottunar: Verkefnið ekki skráð</li>
          )}
        </ul>
        {place.imageurl !== null && (
          <div className='mt-6 flex flex-col space-y-0'>
            <Image
              className='block w-full rounded-lg'
              src={place.imageurl}
              alt={place.name}
              width={400}
              height={300}
            />
            {place.markerphoto !== null && (
              <p className='mt-1 text-right italic text-sm text-gray-600'>
                Mynd: {place.markerphoto}
              </p>
            )}
          </div>
        )}
        {place.description !== null && (
          <p className='mt-2'>{place.description}</p>
        )}

        {place.readmore === true && (
          <Link href={`/${place.id}`} className='inline-block'>
            Meira um verkefnið
          </Link>
        )}

        {/* 
        {place.media !== null && (
          <div className='flex flex-col gap-0 pb-4'>
            <p className='font-semibold mb-0'>Media coverage:</p>
            <ul className='pt-0'>
              {place.media.map((med, index) => (
                <li key={index} className='mt-0'>
                  <a href={med.url} target='_blank'>
                    {med.linktext}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        */}
      </Popup>
    </div>
  );
}
