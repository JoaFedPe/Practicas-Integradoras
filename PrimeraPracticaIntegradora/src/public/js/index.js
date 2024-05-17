
const socket = io()

/* function enviarMensaje() {
    const mensaje = document.getElementById('mensaje').value
    socket.emit('mensaje', mensaje)
}

const boton = document.getElementById('btn-send')
    boton.addEventListener('click', () => {
    console.log('click en boton')
})

socket.on('mensaje', (data) => {
    console.log(`mensaje recibido del servidor ${data}`)
}) */

socket.on('evento_para_todos', data => {
    console.log(data)
})
