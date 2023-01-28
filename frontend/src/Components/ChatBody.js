import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"

const ChatBody = ({messages, typingStatus, lastMessageRef}) => { 
  const navigate = useNavigate()
  const [roomname, setRoomname] = useState('')
  // console.log(messages)
  
  useEffect(() => {
    setRoomname(localStorage.getItem("roomname"))
  }, [])

  const handleLeaveChat = () => {
    localStorage.removeItem("username")
    localStorage.removeItem("roomname")
    navigate("/")
    window.location.reload()
  }

  return (
    <>
      <header className='chat__mainHeader'>
        <p className='chat__title'>{roomname}</p>
        <button className='leaveChat__btn' onClick={handleLeaveChat}>LEAVE CHAT</button>
      </header>

        <div className='chat__messages'>
          {messages.map(message => (
            message.username === localStorage.getItem("username") ? (
              <div className="message__sender" key={message.id}>
                  <p>
                    <span className="message__name">{message.username}</span>
                    <span className="message__meta">{message.createdAt}</span>
                  </p>
                  { message.text.includes('http') ? <a href={message.text} target="_blank" rel="noreferrer">{message.text}</a> : <p>{message.text}</p> } 
              </div>
            ): (
              <div className="message__recipient" key={message.id}>
                  <p>
                    <span className="message__name">{message.username}</span>
                    <span className="message__meta">{message.createdAt}</span>
                  </p>
                  { message.text.includes('http') ? <a href={message.text} target="_blank" rel="noreferrer">{message.text}</a> : <p>{message.text}</p> }
              </div>
            )
          ))}
          <div className='message__status'>
            <p>{typingStatus}</p>
          </div>
          <div ref={lastMessageRef} />   
        </div>
    </>
  )
}

export default ChatBody