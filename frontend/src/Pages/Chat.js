import React, { useEffect, useState, useRef } from 'react'
import ChatBar from '../Components/ChatBar'
import ChatBody from '../Components/ChatBody'
import ChatFooter from '../Components/ChatFooter'

// Derived once at module level — never changes, no need to be inside the component
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

const ChatPage = ({ socket }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [messages, setMessages] = useState([])
  const [typingStatus, setTypingStatus] = useState("")
  const lastMessageRef = useRef(null)
  const [roomname, setRoomname] = useState('')
  const [username, setUsername] = useState('')

  const Collapse = () => setCollapsed(prev => !prev)

  // On mount: collapse if mobile or narrow window
  useEffect(() => {
    setCollapsed(isMobile || window.innerWidth < 900)
  }, [])

  // Resize handler: re-evaluate collapse on window width change
  useEffect(() => {
    let timer = null
    const handleResize = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        setCollapsed(isMobile || window.innerWidth < 900)
      }, 200)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    setRoomname(localStorage.getItem("roomname"))
    setUsername(localStorage.getItem("username"))
  }, [])

  useEffect(() => {
    if (username && roomname) {
      socket.emit("join", { username, room: roomname, socketID: socket.id })
    }
  }, [socket, username, roomname])

  useEffect(() => {
    const handleMessage = (data) => setMessages(prev => [...prev, data])
    socket.on("message", handleMessage)
    return () => socket.off("message", handleMessage)
  }, [socket])

  useEffect(() => {
    const handleTypingResponse = (data) => setTypingStatus(data)
    socket.on("typingResponse", handleTypingResponse)
    return () => socket.off("typingResponse", handleTypingResponse)
  }, [socket])

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typingStatus])

  return (
    <div className="chat">
      <ChatBar socket={socket} collapsed={collapsed} Collapse={Collapse} />
      <div className={`chat__main${collapsed ? " contentextended" : ""}`}>
        <ChatBody
          messages={messages}
          typingStatus={typingStatus}
          lastMessageRef={lastMessageRef}
        />
        <ChatFooter socket={socket} />
      </div>
    </div>
  )
}

export default ChatPage