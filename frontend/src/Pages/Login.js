import { useNavigate } from "react-router-dom";
import React, { useState } from 'react'


function Login({socket}) {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [roomname, setRoomname] = useState("")
    // function enterChat() {
    //     navigate('/chat')
    // }

    const handleSubmit = (e) => {
        e.preventDefault()
        localStorage.setItem("username", username)
        localStorage.setItem("roomname", roomname)
        socket.emit("join", {username: username, room: roomname, socketID: socket.id})
        // navigate("/chat/username=" + username + "&room=" + roomname)
        navigate("/chat")
    }

    return (
        <>
            <div className="centered-form">
                <div className="centered-form__box">
                    <h1>No time to explain, get in!</h1>
                    <form action="/chat" onSubmit={handleSubmit}>
                        <label>Display name</label>
                        <input type="text" name="username" placeholder="Display name" required  onChange={e => setUsername(e.target.value)} />
                        <label>Room</label>
                        <input type="text" name="room" placeholder="Room name" required  onChange={e => setRoomname(e.target.value)} />
                        <button>Enter</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;