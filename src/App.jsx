// App.jsx - Main app component 
import { useState } from "react";
import UserA from "./components/UserA";
import UserB from "./components/UserB";

export default function App() {
  const [view, setView] = useState("A");
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${view === "A" ? "bg-blue-600 text-white" : "bg-white border"}`}
          onClick={() => setView("A")}
        >
          User A (Sender)
        </button>
        <button
          className={`px-4 py-2 rounded ${view === "B" ? "bg-blue-600 text-white" : "bg-white border"}`}
          onClick={() => setView("B")}
        >
          User B (Receiver)
        </button>
      </div>
      {view === "A" ? <UserA /> : <UserB />}
    </div>
  );
} 