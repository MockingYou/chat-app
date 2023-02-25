import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import Image from "./Image"

const ChatBody = ({messages, typingStatus, lastMessageRef}) => { 
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
    if(message.type === "file") {
      const blob = new Blob([message.body], { type: message.type})
      if(message.username === localStorage.getItem("username")) {
        
        return (
          <div className="message__sender" key={message.id}>
            <p>
              <span className="message__name">{message.username}</span>
              <span className="message__meta">{message.createdAt}</span>
            </p>
              <Image fileName={message.fileName} blob={blob}/>
          </div>
          )
      } else {
        return (
          <div className="message__recipient" key={message.id}>
            <p>
              <span className="message__name">{message.username}</span>
              <span className="message__meta">{message.createdAt}</span>
            </p>
              <Image fileName={message.fileName} blob={blob}/>
          </div>
        )
      }
    } else {
      if(message.username === localStorage.getItem("username")) {
        return (
          <div className="message__sender" key={message.id}>
            <p>
              <span className="message__name">{message.username}</span>
              <span className="message__meta">{message.createdAt}</span>
            </p>
              { message.body.includes('http') ? <a href={message.body} target="_blank" rel="noreferrer">{message.body}</a> : <p>{message.body}</p> } 
          </div>
          )
      } else {
        return (
          <div className="message__recipient" key={message.id}>
            <p>
              <span className="message__name">{message.username}</span>
              <span className="message__meta">{message.createdAt}</span>
            </p>
              { message.body.includes('http') ? <a href={message.body} target="_blank" rel="noreferrer">{message.body}</a> : <p>{message.body}</p> } 
          </div>
        )
      }
    }
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