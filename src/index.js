const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')


app.use(express.static(publicDirectoryPath))


io.on('connection', (socket) => {
    console.log('new web socket connection, dog')

    socket.emit('message', 'Hey Friend')  

    socket.on('sendMessage', (message) => {
        io.emit('message', message)  //sends message to all clients
    })

})

server.listen(port, () => {
    console.log(`Server is running on ${port}`)
}) 