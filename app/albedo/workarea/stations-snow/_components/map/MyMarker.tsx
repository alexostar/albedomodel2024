import { Popup } from 'react-leaflet';

import { Stations2 } from '@/types/collection';

export default function MyMarker(place: Stations2) {
  return (
    <div className='h-[200px] w-[300px]'>
      <Popup>
        <ul className='mb-2'>
          <li className='font-bold'>{place.name}</li>
          <li className=''>TDEE: {place.tdee_055_006} tCO2/ha</li>
        </ul>
      </Popup>
    </div>
  );
}
