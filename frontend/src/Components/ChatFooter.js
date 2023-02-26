import React, { useState, useEffect } from 'react'
import AttachFileIcon from '@mui/icons-material/AttachFile';
// import { YoutubeSearchedForOutlined } from '@mui/icons-material';
// import moment from 'moment'

const ChatFooter = ({socket}) => {
    const [message, setMessage] = useState("")
    const [file, setFile] = useState()

  const selectFile = (e) => {
    setMessage(e.target.files[0].name)
    setFile(e.target.files[0])
  }
    const handleSendMessage = (e) => {
        e.preventDefault()
        if(file) {
          const messageObject = {
            id: `${socket.id}${Math.random()}`, 
            type: "file",
            body: file,
            roomname: localStorage.getItem('roomname'),
            mimeType: file.type,
            fileName: file.name
          }
          setMessage("")
          setFile()
          socket.emit("sendMessage", messageObject)
        } else if(message.trim() && localStorage.getItem("username")) {
          const messageObject = {
            id: `${socket.id}${Math.random()}`, 
            type: "text",
            body: message,
            roomname: localStorage.getItem('roomname'),
          }
            socket.emit("sendMessage", messageObject)
            setMessage("")
          }
    }
    useEffect(() => {
      if(message !== "") {
        socket.emit("typing",`${localStorage.getItem("username")} is typing...`)
      } else {
        socket.emit("typing",'')
      }
    }, [message, socket])

  return (
    <div className='compose'>
        <form onSubmit={handleSendMessage}>
          <div className='message__form'>
            <input 
              type="text" 
              placeholder='Write message' 
              className='message' 
              value={message} 
              onChange={e => setMessage(e.target.value)}
            />
            <label htmlFor="file-input">
              <span className='icon'><AttachFileIcon/></span>
            </label>
            <input id="file-input" className="file-input" type="file" onChange={selectFile} />
          </div>
            <button className="sendBtn">Send</button>
        </form>
     </div>
  )
}

export default ChatFooter