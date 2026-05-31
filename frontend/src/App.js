import './App.css';
import {  BrowserRouter, Route, Routes } from "react-router-dom";
import socketIO from "socket.io-client"
import React, { useEffect } from 'react'

import Login from './Pages/Login'
import Chat from './Pages/Chat'

const socket = socketIO.connect("https://chat-server-jvt5.onrender.com", {
  withCredentials: true, 
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5
});

// Add socket error handlers
socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error);
});

socket.on('disconnect', (reason) => {
  console.warn('Socket disconnected:', reason);
});

function App() {
  // Cleanup socket on component unmount
  useEffect(() => {
    return () => {
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, []);

  return (
    <BrowserRouter> 
      <Routes>
        <Route element={<Login socket={socket} />} path="/" />
        <Route element={<Chat socket={socket} />} path="/chat" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
