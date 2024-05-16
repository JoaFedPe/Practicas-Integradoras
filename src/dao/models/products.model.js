import mongoose from 'mongoose'

const productCollection = "Products"

const productSchema = new mongoose.Schema({
    title: {type: String, required:true, max:100},
    description: {type: String, required:true, max:100},
    code: {type: String, required:true, max:100},
    price: {type: String, required:true, max:100},
    status: {type: String, required:true, max:100},
    stock: {type: Number, required:true, max:100},
    category: {type: String, required:true, max:100}, 
})

const productModel = mongoose.model(productCollection, productSchema)

export default productModel