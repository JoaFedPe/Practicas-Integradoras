import mongoose from 'mongoose'

const cartsCollection = "Carts"

const cartsSchema = new mongoose.Schema({
    productsInCart: {type: Array, required:true, max:10000},   
})

const cartModel = mongoose.model(cartsCollection, cartsSchema)

export default cartModel