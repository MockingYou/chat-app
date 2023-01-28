const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const cors = require("cors")
const Filter = require('bad-words')
const { generateMessage } = require('./utils/messages')
const moment = require('moment')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')

const app = express();
const server = http.createServer(app)
const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000"
    }
})

const port = process.env.PORT || 5000;
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))
app.use(cors())

let welcomeMessage = "Hello, friend"


io.on('connection', (socket) => {
    console.log('New WbSocket connection')
    
    socket.on('join', (options, callback= () => {}) => {
        const { error, user } = addUser({ id: socket.id, ...options })
        if (error) {
            return callback(error)
        }
        socket.join(user.room)
        const createdAt = moment(new Date().getTime()).format('H:mm:ss')
        socket.emit('message', generateMessage('Admin', welcomeMessage, createdAt, socket.id+ Math.random()))
        socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username} has joined!`, createdAt, user.id+ Math.random()))   

        io.to(user.room).emit('roomData', getUsersInRoom(user.room))
        callback()
    })

    socket.on("typing", data => (
        socket.broadcast.emit("typingResponse", data)
      ))

    socket.on('sendMessage', (message, id, callback = () => {}) => {
        const user = getUser(socket.id)
        const filter = new Filter()
        const createdAt = moment(new Date().getTime()).format('H:mm:ss')
        if(filter.isProfane(message)) {
            io.emit('message', generateMessage('Admin', 'https://www.youtube.com/watch?v=25f2IgIrkD4', createdAt, socket.id + Math.random()))
            return callback('https://www.youtube.com/watch?v=25f2IgIrkD4')
        }
        io.to(user.room).emit('message', generateMessage(user.username, message, createdAt, id))
        callback()
    }) 
    // socket.on('sendLocation', (coords, callback) => {
    //     const user = getUser(socket.id)

    //     io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`))
    //     callback()
    // })
    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        const createdAt = moment(new Date().getTime()).format('H:mm:ss')

        if(user) {
            io.to(user.room).emit('message', generateMessage('Admin', `${user.username} has left!`,  createdAt, user.id+ Math.random()))
            io.to(user.room).emit('roomData', getUsersInRoom(user.room))
        }
    })
})

app.get("/api", (req, res) => {
    res.json({message: "Hello"})
  });

server.listen(port, () => {
    console.log('Server is on port ' + port)
})