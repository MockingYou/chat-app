import './App.css';
import {  BrowserRouter, Route, Routes } from "react-router-dom";
import socketIO from "socket.io-client"
import React from 'react'

import Login from './Pages/Login'
import Chat from './Pages/Chat'

const socket = socketIO.connect("https://chat-server-jvt5.onrender.com:10000");

function App() {
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
