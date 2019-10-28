const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')


app.use(express.static(publicDirectoryPath))



io.on('connection', (socket) => {
    console.log('new web socket connection, dog')

    socket.emit('message', 'Hey Friend')  
    socket.broadcast.emit('message', 'A new user has joined')  //emits to every client, except this one

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }

        io.emit('message', message)  //sends message to all clients
        callback()
    })

    socket.on('disconnect', () => {  //runs when client disconnects
        io.emit('message', 'A user has left')
    })  

    socket.on('sendLocation', (location, callback) => {
        io.emit('message', `Location: https://google.com/maps?q=${location.lat},${location.long}`)
        callback('Location Shared!')
    })

})

//----------------- Starts server -----------------

server.listen(port, () => {
    console.log(`Server is running on ${port}`)
}) 

