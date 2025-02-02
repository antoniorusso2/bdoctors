/* eslint-disable react/prop-types */
// import { Marker } from '@react-google-maps/api';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

export default function GoogleMap({ coordinates }) {
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  console.log(coordinates);
  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        defaultZoom={13}
        defaultCenter={{ lat: coordinates.lat, lng: coordinates.lng }}
      >
        <Marker position={{ lat: coordinates.lat, lng: coordinates.lng }} />
      </Map>
    </APIProvider>
  );
}
