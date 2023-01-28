import './App.css';
import {  BrowserRouter, Route, Routes } from "react-router-dom";
import socketIO from "socket.io-client"
import { useState, useEffect } from 'react'

import Login from './Pages/Login'
import Chat from './Pages/Chat'

const socket = socketIO.connect("http://localhost:5000")

function App() {
  // const [roomname, setRoomname] = useState('')
  // const [username, setUsername] = useState('')

  // useEffect(() => {
  //   setRoomname(localStorage.getItem("roomname"))
  //   setUsername(localStorage.getItem("username"))
  // }, [])

  // {"/chat/username="{username}"&room="{roomname}}
  return (
    <BrowserRouter> 
              <Routes>
                <Route element={<Login socket={socket} />} path="/" />
                <Route element={<Chat socket={socket} />} path="/chat" />
            </Routes>
          </BrowserRouter>
    // <Chat />
  );
}

export default App;
