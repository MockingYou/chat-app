import React, {useState} from 'react'
import moment from 'moment'

const ChatFooter = ({socket}) => {
    const [message, setMessage] = useState("")
    const handleTyping = () => {
      socket.emit("typing",`${localStorage.getItem("username")} is typing...`)
    }

    const handleSendMessage = (e) => {
        e.preventDefault()
        if(message.trim() && localStorage.getItem("username")) {
          socket.emit("sendMessage", message, `${socket.id}${Math.random()}`
              // {
              //   text: message, 
              //   name: localStorage.getItem("username"), 
              //   id: socket.id,
              //   // createdAt: moment(new Date().getTime()).format('H:mm:ss')
              // }
          )
        }
        // console.log(message + '           ' + localStorage.getItem("username") + '              ' + `${socket.id}${Math.random()}` + '       ' + moment(new Date().getTime()).format('H:mm:ss'))
        setMessage("")
    }
  return (
    <div className='compose'>
        <form className='message-form' onSubmit={handleSendMessage}>
          <input 
            type="text" 
            placeholder='Write message' 
            className='message' 
            value={message} 
            onChange={e => setMessage(e.target.value)}
            onKeyDown={handleTyping}
            />
            <button className="sendBtn">Send</button>
        </form>
     </div>
  )
}

export default ChatFooter