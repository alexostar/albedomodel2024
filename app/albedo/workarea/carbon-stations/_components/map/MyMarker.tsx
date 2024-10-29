import React from 'react';

import { Popup } from 'react-leaflet';
import { Places } from '../../page';

// Add a new prop to receive the station names

export default function MyMarker(place: Places) {
  return (
    <div className='h-[200px] w-[300px]'>
      <Popup>
        <ul className='mb-2'>
          {place.origin === 'Carbon' ? (
            <>
              <li>Verkefni: {place.name}</li>
              {/*<li>TDEE: {place.albedopine} tCO2/ha</li>
              <li>Snjóþekjugögn: {place.vedurstod} </li>*/}
              {place.stationNames && place.stationNames.length > 0 && (
                <li>
                  Snjóþekjugögn:
                  <ul>
                    {place.stationNames.map((station, index) => (
                      <li className='ml-2' key={index}>
                        {station.name}
                      </li>
                    ))}
                  </ul>
                </li>
              )}
            </>
          ) : (
            <>
              <li className='font-semibold'>
                Veðurstöð {place.station}: {place.name}
              </li>
              <li>Fyrsta ár: {place.first_year}</li>
              <li>Síðasta ár: {place.last_year}</li>
              <li>Snjóþekja % janúar - desember:</li>
              <li>
                {place.jan} {place.feb} {place.mar} {place.apr} {place.may}{' '}
                {place.jun} {place.jul} {place.aug} {place.sep} {place.oct}{' '}
                {place.nov} {place.dec}
              </li>
              <li className='font-semibold'>
                Meðaltal: {place.averageMonthly}
              </li>
            </>
          )}
        </ul>
      </Popup>
    </div>
  );
}
