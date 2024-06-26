import express from 'express'
import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
import messagesRouter from './routes/messages.router.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import { Server } from 'socket.io'
import messageModel from './dao/models/messages.model.js'

const app = express()
const PORT = 8080
const httpServer = app.listen(PORT, console.log(`Server running on port ${PORT}`))

const socketServer = new Server(httpServer)
app.use(express.json())
app.use(express.urlencoded({extended : true}))

mongoose.connect("mongodb+srv://joafedpe:Emperor1527@cluster0.izy0ekx.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0").then(()=> 
    {console.log("Conectado a la base de datos")}).catch(error => console.error("Error en la conexion", error))

app.use('/', productsRouter)
app.use('/', cartsRouter)
app.use('/', messagesRouter)

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

let messages = []

socketServer.on('connection', socket => {
    socket.emit("messageList", messages)
    console.log("Nuevo cliente conectado")

    socket.on("newMessage", async (message) => {
        messages.push(message)
        const newMessage = new messageModel({
            user: "Joaquin",
            message
        })
        await newMessage.save()
        socketServer.emit("newMessage", {
            socketId: socket.id,
            message: message
        })
    }) 
})