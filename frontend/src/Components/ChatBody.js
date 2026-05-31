import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import Image from "./Image"

const ChatBody = ({ messages, typingStatus, lastMessageRef }) => {
  const navigate = useNavigate()
  const [roomname, setRoomname] = useState('')

  useEffect(() => {
    setRoomname(localStorage.getItem("roomname"))
  }, [])

  const handleLeaveChat = () => {
    localStorage.removeItem("username")
    localStorage.removeItem("roomname")
    navigate("/")
    window.location.reload()
  }

  function renderMessages(message) {
    const isOwnMessage = message.username === localStorage.getItem("username")
    const wrapperClass = isOwnMessage ? "message__sender" : "message__recipient"

    return (
      <div className={wrapperClass} key={message.id}>
        <p>
          <span className="message__name">{message.username}</span>
          <span className="message__meta">{message.createdAt}</span>
        </p>
        {message.type === "file"
          ? <Image fileName={message.fileName} src={message.body} />
          : message.body.includes('http')
            ? <a href={message.body} target="_blank" rel="noreferrer">{message.body}</a>
            : <p>{message.body}</p>
        }
      </div>
    )
  }

  return (
    <>
      <header className='chat__mainHeader'>
        <p className='chat__title'>{roomname}</p>
        <button className='leaveChat__btn' onClick={handleLeaveChat}>LEAVE CHAT</button>
      </header>
      <div className='chat__messages'>
        {messages.map(renderMessages)}
        <div className='message__status'>
          <p>{typingStatus}</p>
        </div>
        <div ref={lastMessageRef} />
      </div>
    </>
  )
}

export default ChatBody