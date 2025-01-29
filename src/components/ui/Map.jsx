import { APIProvider, Map } from "@vis.gl/react-google-maps";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function GoogleMap() {
  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        defaultZoom={13}
        defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
      />
    </APIProvider>
  );
}
