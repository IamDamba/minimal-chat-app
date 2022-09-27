// ||||||||||||||||||||||||||||| Dependances ||||||||||||||||||||||||||||||||||||

import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppSelector } from "./reducer/hooks";

import io from "socket.io-client";
import Chat from "./pages/chat/Chat";
import Login from "./pages/login/Login";

const socket = io({
  reconnectionDelayMax: 10000,
  transports: ["websocket", "polling"],
  forceNew: true,
  path: import.meta.env.PROD ? "" : "ws://localhost:3001",
});

// ||||||||||||||||||||||||||||| App Component ||||||||||||||||||||||||||||||||||||

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login socket={socket} />} />
        <Route path="/chat" element={<Chat socket={socket} />} />
      </Routes>
    </div>
  );
};
export default App;
