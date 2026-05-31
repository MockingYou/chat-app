import React, { useState, useEffect } from 'react'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { compressImage } from './compressImage'
// import { YoutubeSearchedForOutlined } from '@mui/icons-material';
// import moment from 'moment'

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState("")
  const [file, setFile] = useState()

  const selectFile = (e) => {
    setMessage(e.target.files[0].name)
    setFile(e.target.files[0])
  }
  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (file) {
      try {
        let body
        if (file.type.startsWith('image/')) {
          body = await compressImage(file, { maxWidth: 1024, quality: 0.7 })
        } else {
          body = await new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = () => resolve(reader.result)
            reader.onerror = reject
          })
        }

        console.log("Final size:", (body.length / 1024 / 1024).toFixed(2), "MB")

        const messageObject = {
          id: `${socket.id}${Math.random()}`,
          type: "file",
          body,
          roomname: localStorage.getItem('roomname'),
          mimeType: 'image/jpeg',
          fileName: file.name
        }
        socket.emit("sendMessage", messageObject, (ack) => {
          console.log("Server ack:", ack)
        })
      } catch (err) {
        console.error("Compression failed:", err)
      }
      setMessage("")
      setFile(undefined)
    } else if (message.trim() && localStorage.getItem("username")) {
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
    const typingTimer = setTimeout(() => {
      if (message !== "") {
        socket.emit("typing", `${localStorage.getItem("username")} is typing...`);
      } else {
        socket.emit("typing", '');
      }
    }, 300);

    return () => clearTimeout(typingTimer);
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
            <span className='icon'><AttachFileIcon /></span>
          </label>
          <input id="file-input" className="file-input" type="file" onChange={selectFile} />
        </div>
        <button className="sendBtn">Send</button>
      </form>
    </div>
  )
}

export default ChatFooter