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
import { useEffect, useState } from "react";
import axios from "axios";

L.Icon.Default.imagePath =
  "//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/";
type GeoType = {
  lat: number;
  lng: number;
};
const Map = () => {
  const position = { lat: 35.16249, lng: 136.9843 };

  const fillBlueOptions = { fillColor: "blue" };
  const [polygon, setPolygon] = useState<GeoType[]>([]);
  useEffect(() => {
    (async () => {
      //jsonファイルはpublicフォルダ下に配置
      const response = await axios.get(
        "http://localhost:3000/N03-19_23_190101.geojson"
      );

      const geoDatas: number[][] =
        response.data.features[0].geometry.coordinates[0];

      const LatLngList: GeoType[] = [];
      geoDatas.forEach((geoData: number[]) => {
        LatLngList.push({ lat: geoData[1], lng: geoData[0] });
      });
      setPolygon(LatLngList);
    })();
  }, []);
  console.log(polygon);
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
