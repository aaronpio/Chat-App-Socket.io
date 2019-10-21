const socket = io()

socket.on('message', (message) => {
    console.log(message)
})

document.querySelector('#messageForm').addEventListener('submit', (e) => {
    e.preventDefault() //prevents full page refresh on event

    const message = e.target.elements.message.value  //selects the input form
    
    socket.emit('sendMessage', message)
})

