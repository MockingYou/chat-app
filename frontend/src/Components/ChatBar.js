import React, {useState, useEffect} from 'react'

const ChatBar = ({socket}) => {
    const [users, setUsers] = useState([])
    // const [room, setRoom] = useState('')

    useEffect(()=> {
        socket.on("roomData", (users) => setUsers(users))
        console.log(users)
    }, [socket, users])

  return (
    <div className='chat__sidebar'>
        <h2>Open Chat</h2>
        <div>
            <h4  className='chat__header'>ACTIVE USERS</h4>
            <div className='chat__users'>
                {users.map(user => <p key={user.id}>{user.username}</p>)}
            </div>
        </div>
  </div>
  )
}

export default ChatBar