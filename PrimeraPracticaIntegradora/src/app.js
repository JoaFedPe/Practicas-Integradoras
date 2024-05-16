import express from 'express'
import mongoose from 'mongoose'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended : true}))

mongoose.connect("mongodb+srv://joafedpe:Emperor1527@cluster0.izy0ekx.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0").then(()=> {console.log("Conectado a la base de datos")}).catch(error => console.error("Error en la conexion", error))

app.use('/', productsRouter)
app.use('/', cartsRouter)


app.listen(PORT, () => {
    console.log(`Server running on port PORT`)
})