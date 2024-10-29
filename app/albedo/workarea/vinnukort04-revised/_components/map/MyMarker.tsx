import Image from 'next/image';
import Link from 'next/link';
import { Popup } from 'react-leaflet';
//import { Vedurstodvar } from '@/types/collection';
//import { Stations_latlng } from '@/types/collection';
import { Stations2 } from '@/types/collection';

export default function MyMarker(place: Stations2) {
  return (
    <div className='h-[200px] w-[300px]'>
      <Popup>
        <ul className='mb-2'>
          <li className='font-bold'>{place.name}</li>
          <li className=''>Snjóþekja: {place.avg_monthly_value}</li>
        </ul>
      </Popup>
    </div>
  );
}
