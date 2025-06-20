// UserB.jsx - User B interface for receiving and displaying location 
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useSignalR } from "../hooks/useSignalR";

function AutoPan({ lat, lon }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lon) {
      map.setView([lat, lon], 13);
    }
  }, [lat, lon, map]);
  return null;
}

export default function UserB() {
  const [location, setLocation] = useState(null);
  const { onLocationReceived, offLocationReceived } = useSignalR();

  useEffect(() => {
    const handler = (payload) => {
      setLocation({
        lat: payload.lat,
        lon: payload.lon,
        userName: payload.userName,
        timestamp: new Date(),
      });
    };
    onLocationReceived(handler);
    return () => offLocationReceived(handler);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow max-w-md mx-auto mt-4">
      <h2 className="text-xl font-bold mb-2">User B: Live Location</h2>
      {location ? (
        <>
          <div className="mb-2">
            <b>User:</b> {location.userName} <br />
            <b>Lat:</b> {location.lat} <br />
            <b>Lon:</b> {location.lon} <br />
            <b>Last update:</b> {location.timestamp.toLocaleTimeString()}
          </div>
          <MapContainer
            center={[location.lat, location.lon]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "300px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <Marker position={[location.lat, location.lon]}>
              <Popup>
                {location.userName}<br />
                {location.lat}, {location.lon}
              </Popup>
            </Marker>
            <AutoPan lat={location.lat} lon={location.lon} />
          </MapContainer>
        </>
      ) : (
        <div>No location received yet.</div>
      )}
    </div>
  );
} 