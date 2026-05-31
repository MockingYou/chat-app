import React, { useState, useEffect } from 'react'
 
const ChatBar = ({ socket, collapsed, Collapse }) => {
  const [users, setUsers] = useState([])
 
  useEffect(() => {
    const handleRoomData = (data) => setUsers(data)
    socket.on("roomData", handleRoomData)
    return () => socket.off("roomData", handleRoomData)
  }, [socket])
 
  return (
    <div className={`chat__sidebar${collapsed ? " leftmenucollapsed" : ""}`}>
      <div className="sidebar__header">
        <h2>Open Chat</h2>
        <button
          className="collapse__btn"
          onClick={Collapse}
          title="Toggle sidebar"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg
            width="18" height="18" viewBox="0 0 18 18"
            fill="none" stroke="currentColor"
            strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
          >
            {collapsed
              ? <path d="M7 4l5 5-5 5" />
              : <path d="M11 4L6 9l5 5" />
            }
          </svg>
        </button>
      </div>
 
      <div className="sidebar__content">
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {users.map(user => <p key={user.id}>{user.username}</p>)}
        </div>
      </div>
    </div>
  )
}
 
export default ChatBar
 
