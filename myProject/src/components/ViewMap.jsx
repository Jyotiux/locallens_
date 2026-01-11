import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";


const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapView = ({ onAddLocation }) => {
  const [markers, setMarkers] = useState([]);


  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMarkers([...markers, { lat, lng }]);
        onAddLocation({ lat, lng });
      },
    });
    return null;
  };

  return (
    <MapContainer center={[26.2183, 78.1828]} zoom={13} className="h-[500px] w-full rounded-md">

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
      />
      <MapClickHandler />
      {markers.map((pos, idx) => (
        <Marker key={idx} position={[pos.lat, pos.lng]} icon={markerIcon} />
      ))}
    </MapContainer>
  );
};

export default MapView;
