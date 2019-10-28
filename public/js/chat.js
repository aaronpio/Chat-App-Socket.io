const socket = io()

// ------- Elements -------
const $messageForm = document.querySelector('#messageForm')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#sendLocation')
const $messages = document.querySelector('#messages')

// -------- Templates ---------
const messageTemplate = document.querySelector('#message-template').innerHTML


socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(messageTemplate, {
        message: message
    })

    $messages.insertAdjacentHTML('beforeend', html)
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault() //prevents full page refresh on event
    
    // disables form once its submitted
    $messageFormButton.setAttribute('disabled', 'disabled')

    const message = e.target.elements.message.value  //selects the input form
    
    socket.emit('sendMessage', message, (error) => {
        //enables button after message delivered. clears input, refocuses cursor on input form
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value =''
        $messageFormInput.focus()

        if (error) {
            return console.log(error)
        }

        console.log('Message Delivered!')
    })
})

$sendLocationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }

    //disable button until acknowledgement callback
    $sendLocationButton.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {

        socket.emit('sendLocation', {
            long: position.coords.longitude, 
            lat: position.coords.latitude
        }, (msg) => {
            console.log(msg)
            //enables button after location send
            $sendLocationButton.removeAttribute('disabled')
        })
        
    })
})

