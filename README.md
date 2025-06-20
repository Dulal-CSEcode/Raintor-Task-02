# 🌍 Real-Time Location Sharing App (SignalR + React)

A React application demonstrating real-time GPS location sharing between users using SignalR and Leaflet maps.

## 🎯 Features

- **Real-time location sharing** between multiple users
- **Interactive map** with live position updates
- **Custom SignalR hook** for clean connection management
- **Responsive design** works on desktop and mobile
- **Mock location** simulation for testing

## 🔧 Technologies

![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white)
![SignalR](https://img.shields.io/badge/-SignalR-%235C2D91?logo=.net&logoColor=white)
![Leaflet](https://img.shields.io/badge/-Leaflet-199900?logo=leaflet&logoColor=white)

- **Frontend**: React 18
- **Realtime**: @microsoft/signalr
- **Mapping**: Leaflet + React-Leaflet
- **State Management**: React Context
- **Styling**: CSS Modules

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ v18
- npm or yarn

### Installation
```bash
git clone https://github.com/yourusername/realtime-location-signalr.git
cd realtime-location-signalr
npm install
```
# Running the App
```bash
npm start
```

Open http://localhost:3000 in your browser.

## 📁 Project Structure
```bash
├── public/
│   └── index.html          # Base HTML template
├── src/
│   ├── components/         # React components
│   │   ├── MapReceiver.tsx # Location display
│   │   └── SenderPanel.tsx # Location controls
│   ├── hooks/
│   │   └── useSignalR.ts   # Custom SignalR hook
│   ├── contexts/           # Shared state
│   ├── utils/              # Helper functions
│   ├── App.tsx             # Main component
│   └── index.tsx           # Entry point
├── package.json
└── README.md
```
## 🛠️ Implementation Details
# SignalR Hub Connection
```bash
// useSignalR.ts
const { connection } = useSignalR(process.env.REACT_APP_SIGNALR_HUB);

// Send location
connection.invoke("SendLatLon", lat, lon, userName);

// Receive location
connection.on("ReceiveLatLon", (location) => {
  setLatestLocation(location);
});
```
# Leaflet Map Component
```bash
// MapReceiver.tsx
<MapContainer center={[lat, lon]} zoom={13}>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  />
  <Marker position={[lat, lon]}>
    <Popup>{userName}'s location</Popup>
  </Marker>
</MapContainer>
```
📡 API Endpoints
Method	Hub URL	Parameters
SendLatLon	https://tech-test.raintor.com/Hub	lat (number), lon (number), userName (string)
ReceiveLatLon	Same as above	Returns JSON location object
Sample Payload:
```bash
{
  "userName": "user@example.com",
  "lat": 25.73736464,
  "lon": 90.3644747
}
```
🌐 Environment Variables
Create a .env file:
```bash

REACT_APP_SIGNALR_HUB=https://tech-test.raintor.com/Hub
REACT_APP_MAP_TILE_URL=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
```
📦 Dependencies
```bash
npm install @microsoft/signalr react-leaflet leaflet
```
Add Leaflet CSS in index.html:

```bash
<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
/>
📸 Screenshots
Sender View	Receiver View
https://sender-screenshot.png	https://receiver-screenshot.png
```
📄 License
MIT License © 2025 [MD Dulal Hossain]
