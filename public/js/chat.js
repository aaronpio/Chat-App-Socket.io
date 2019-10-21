const socket = io()

socket.on('message', (message) => {
    console.log(message)
})

document.querySelector('#messageForm').addEventListener('submit', (e) => {
    e.preventDefault() //prevents full page refresh on event

    const message = e.target.elements.message.value  //selects the input form
    
    socket.emit('sendMessage', message)
})

document.querySelector('#sendLocation').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }

    navigator.geolocation.getCurrentPosition((position) => {

        socket.emit('sendLocation', {
            long: position.coords.longitude, 
            lat: position.coords.latitude
        })
    })
})

