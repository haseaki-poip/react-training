import {
  MapContainer,
  Marker,
  Polygon,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLng } from "leaflet";
L.Icon.Default.imagePath =
  "//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/";

const Map = () => {
  const position = { lat: 51.505, lng: -0.09 };
  const polygon = [
    { lat: 51.505, lng: -0.09 },
    { lat: 51.51, lng: -0.01 },
    { lat: 51.52, lng: -0.09 },
    { lat: 51.51, lng: -0.12 },
  ];
  const fillBlueOptions = { fillColor: "blue" };
  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "50vh", width: "50%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polygon pathOptions={fillBlueOptions} positions={polygon} />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
