'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression, LatLngTuple } from 'leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { Icon } from 'leaflet';

import { Skogarkolefni } from '@/types/collection';
import MyMarker from './MyMarker';

interface MapProps {
  posix: LatLngExpression | LatLngTuple;
  zoom?: number;
  minZoom?: number;
  places: Skogarkolefni[];
  maxBounds: [[number, number], [number, number]];
}

const defaults = {
  zoom: 7,
  minZoom: 6,
};

const redIcon = new Icon({
  iconUrl: '/markers/red-icons8-map-marker-52.png',
  iconSize: [35, 35], // size of the icon
  iconAnchor: [18, 35], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -36], // point from which the popup should open relative to the iconAnchor
});

const yellowIcon = new Icon({
  iconUrl: '/markers/yellow-icons8-map-marker-52.png',
  iconSize: [35, 35], // size of the icon
  iconAnchor: [18, 35], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -36], // point from which the popup should open relative to the iconAnchor
});

const greenIcon = new Icon({
  iconUrl: '/markers/green-icons8-map-marker-52.png',
  iconSize: [35, 35], // size of the icon
  iconAnchor: [18, 35], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -36], // point from which the popup should open relative to the iconAnchor
});

const blackIcon = new Icon({
  iconUrl: '/markers/black-icons8-map-marker-52.png',
  iconSize: [35, 35], // size of the icon
  iconAnchor: [18, 35], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -36], // point from which the popup should open relative to the iconAnchor
});

const Map = (Map: MapProps) => {
  const {
    zoom = defaults.zoom,
    posix,
    minZoom = defaults.minZoom,
    maxBounds,
  } = Map;
  const places = Map.places;

  return (
    <MapContainer
      center={posix}
      zoom={zoom}
      minZoom={minZoom}
      maxBounds={maxBounds}
      maxBoundsViscosity={1.0} // Controls the "stickiness" of the bounding box
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='Google Maps Satellite'
        url='https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}'
      />
      {places.map((place) => (
        <div key={place.id}>
          {place.status === 'certified' ? (
            <Marker position={place.latlng} draggable={false} icon={greenIcon}>
              <MyMarker {...place} />
            </Marker>
          ) : place.status === 'registered' ? (
            <Marker position={place.latlng} draggable={false} icon={yellowIcon}>
              <MyMarker {...place} />
            </Marker>
          ) : place.status === 'illegal' ? (
            <Marker position={place.latlng} draggable={false} icon={blackIcon}>
              <MyMarker {...place} />
            </Marker>
          ) : (
            <Marker position={place.latlng} draggable={false} icon={redIcon}>
              <MyMarker {...place} />
            </Marker>
          )}
        </div>
      ))}
    </MapContainer>
  );
};

export default Map;

/*
  OTHER TILE LAYERS
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <TileLayer
        attribution='Google Maps'
        url='https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}'
      />
  */
