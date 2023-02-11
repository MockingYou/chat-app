import React, { useEffect, useState, useRef} from 'react'
import ChatBar from '../Components/ChatBar'
import ChatBody from '../Components/ChatBody'
import ChatFooter from '../Components/ChatFooter'

const ChatPage = ({socket}) => { 
  const [collapsed, setCollapsed] = useState(false);
  const [smallWindow, setSmallWindow] = useState(false)
  const [debounce, setDebounce] = useState(null)
  const [messages, setMessages] = useState([])
  const [typingStatus, setTypingStatus] = useState("")
  const lastMessageRef = useRef(null);
  const ismobile = (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
  const [roomname, setRoomname] = useState('')
  const [username, setUsername] = useState('')

  const Collapse = () => {
		setCollapsed(!collapsed)
	}

  useEffect(() => {
    setRoomname(localStorage.getItem("roomname"))
    setUsername(localStorage.getItem("username"))
    socket.emit("join", {username: username, room: roomname, socketID: socket.id})
  }, [socket, roomname, username])

	useEffect(() => {
		const checkIsMobile = () => {
			if(smallWindow!==(window.innerWidth<900)) {
				setCollapsed(ismobile||window.innerWidth<900)
			}
			setSmallWindow(window.innerWidth<900)
		}
		const handleResize = () => {
			if(debounce)clearTimeout(debounce)
			setDebounce(setTimeout(() => {checkIsMobile()}, 1000))
		}
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize)
		}
	});


  useEffect(()=> {
    socket.on("message", data => setMessages([...messages, data]))
  }, [socket, messages])
  useEffect(()=> {
    socket.on("typingResponse", data => setTypingStatus(data))
  }, [socket, typingStatus])
  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages, typingStatus]);
  return (
    <div className="chat">
      <ChatBar socket={socket} collapsed={collapsed} Collapse={Collapse}/>
      <div className={collapsed ? "chat__main contentextended" : "chat__main"}>
        <ChatBody messages={messages} typingStatus={typingStatus} lastMessageRef={lastMessageRef}/>
        <ChatFooter socket={socket}/>
      </div>
    </div>
  )
}

export default ChatPage