import React, {useState, useEffect} from 'react'
import {SyncAlt} from "@mui/icons-material";

const ChatBar = ({socket, collapsed, Collapse}) => {
    const [users, setUsers] = useState([])
    // const [room, setRoom] = useState('')
    
    useEffect(()=> {
        socket.on("roomData", (data) => setUsers(data))
    }, [socket, users])

  return (
    <>
        <div className= {collapsed ? "chat__sidebar leftmenucollapsed" : "chat__sidebar"}>
            <div style={{float:"right",marginRight:"20px",cursor:"pointer", fontSize: "25px"}}>
                <SyncAlt
			        onClick ={ () => Collapse() }
			        className="syncalt"
			    />
            </div>
            <h2>Open Chat</h2>
            <div>
                <h4  className='chat__header'>ACTIVE USERS</h4>
                <div className='chat__users'>
                    {users.map(user => <p key={user.id}>{user.username}</p>)}
                </div>
            </div>
        </div>
    </>
  )
}

export default ChatBar