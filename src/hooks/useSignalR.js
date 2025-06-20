// useSignalR.js - Custom hook for SignalR connection 
import { useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";

const HUB_URL = "https://tech-test.raintor.com/Hub";

export function useSignalR() {
  const connectionRef = useRef(null);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(HUB_URL)
      .withAutomaticReconnect()
      .build();

    connectionRef.current = connection;
    connection.start().catch(console.error);

    return () => {
      connection.stop();
    };
  }, []);

  // Send location to the hub
  const sendLocation = (lat, lon, userName) => {
    if (connectionRef.current && connectionRef.current.state === "Connected") {
      connectionRef.current.invoke("SendLatLon", lat, lon, userName).catch(console.error);
    }
  };

  // Register a callback for receiving location
  const onLocationReceived = (callback) => {
    if (connectionRef.current) {
      connectionRef.current.on("ReceiveLatLon", callback);
    }
  };

  // Remove the callback
  const offLocationReceived = (callback) => {
    if (connectionRef.current) {
      connectionRef.current.off("ReceiveLatLon", callback);
    }
  };

  return { sendLocation, onLocationReceived, offLocationReceived };
} 