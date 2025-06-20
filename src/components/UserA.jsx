// UserA.jsx - User A interface for sending location 
import { useState } from "react";
import { useSignalR } from "../hooks/useSignalR";

export default function UserA() {
  const [userName, setUserName] = useState("dev@example.com");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [status, setStatus] = useState("");
  const { sendLocation } = useSignalR();

  // Get browser location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation not supported.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLon(pos.coords.longitude);
        setStatus("Location fetched.");
      },
      (err) => setStatus("Failed to get location.")
    );
  };

  // Send location to SignalR
  const handleSend = () => {
    if (!lat || !lon || !userName) {
      setStatus("Please fill all fields.");
      return;
    }
    sendLocation(Number(lat), Number(lon), userName);
    setStatus("Location sent!");
  };

  return (
    <div className="p-4 bg-white rounded shadow max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">User A: Send Location</h2>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Your Email"
        value={userName}
        onChange={e => setUserName(e.target.value)}
      />
      <div className="flex gap-2 mb-2">
        <input
          className="border p-2 flex-1"
          placeholder="Latitude"
          value={lat}
          onChange={e => setLat(e.target.value)}
        />
        <input
          className="border p-2 flex-1"
          placeholder="Longitude"
          value={lon}
          onChange={e => setLon(e.target.value)}
        />
      </div>
      <div className="flex gap-2 mb-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={getCurrentLocation}
        >
          Use My Location
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleSend}
        >
          Send Location
        </button>
      </div>
      <div className="text-sm text-gray-600">{status}</div>
    </div>
  );
} 