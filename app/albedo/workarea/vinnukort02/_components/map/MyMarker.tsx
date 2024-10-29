import Image from 'next/image';
import Link from 'next/link';
import { Popup } from 'react-leaflet';
//import { Vedurstodvar } from '@/types/collection';
import { Stodvartj } from '@/types/collection';

export default function MyMarker(place: Stodvartj) {
  return (
    <div className='h-[200px] w-[300px]'>
      <Popup>
        <ul className='mb-2'>
          <li className='font-bold'>{place.name}</li>
        </ul>
      </Popup>
    </div>
  );
}
