const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const Filter = require('bad-words');
const { generateMessage } = require('./utils/messages');
const moment = require('moment');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

const port = process.env.PORT || 5000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));
app.use(cors());

let welcomeMessage = "Hello, friend";

io.on('connection', (socket) => {
    try {
        socket.on('join', (options, callback = () => {}) => {
            try {
                const { error, user } = addUser({ id: socket.id, ...options });
                if (error) {
                    return callback(error);
                }
                socket.join(user.room);
                const createdAt = moment(new Date().getTime()).format('H:mm:ss');
                socket.emit('message', generateMessage('Admin', welcomeMessage, createdAt, socket.id + Math.random(), 'text'));
                socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username} has joined!`, createdAt, user.id + Math.random(), 'text'));

                io.to(user.room).emit('roomData', getUsersInRoom(user.room));
                callback();
            } catch (error) {
                console.error('Error in join event:', error);
                callback('An error occurred while joining the room.');
            }
        });

        socket.on('typing', (data) => {
            try {
                socket.broadcast.emit('typingResponse', data);
            } catch (error) {
                console.error('Error in typing event:', error);
            }
        });

        socket.on('sendMessage', (messageObject, callback = () => {}) => {
            try {
                const user = getUser(socket.id);
                const filter = new Filter();
                const createdAt = moment(new Date().getTime()).format('H:mm:ss');
                if (filter.isProfane(messageObject.message)) {
                    io.emit('message', generateMessage('Admin', 'https://www.youtube.com/watch?v=25f2IgIrkD4', createdAt, socket.id + Math.random(), 'text'));
                    return callback('https://www.youtube.com/watch?v=25f2IgIrkD4');
                }
                if (user) {
                    io.to(user.room).emit('message', generateMessage(user.username, messageObject.body, createdAt, messageObject.id, messageObject.type, messageObject.fileName));
                } else {
                    io.to(messageObject.roomname).emit('message', generateMessage(user.username, messageObject.body, createdAt, messageObject.id, messageObject.type, messageObject.fileName));
                }
                callback();
            } catch (error) {
                console.error('Error in sendMessage event:', error);
                callback('An error occurred while sending the message.');
            }
        });

        socket.on('disconnect', () => {
            try {
                const user = removeUser(socket.id);
                const createdAt = moment(new Date().getTime()).format('H:mm:ss');

                if (user) {
                    io.to(user.room).emit('message', generateMessage('Admin', `${user.username} has left!`, createdAt, user.id + Math.random(), 'text'));
                    io.to(user.room).emit('typingResponse', '');
                }
                setTimeout(() => {
                    socket.disconnect();
                }, 10000);
            } catch (error) {
                console.error('Error in disconnect event:', error);
            }
        });
    } catch (error) {
        console.error('Error in connection event:', error);
    }
});

app.get('/api', (req, res) => {
    res.json({ message: 'Hello' });
});

server.listen(port, () => {
    console.log('Server is on port ' + port);
});
