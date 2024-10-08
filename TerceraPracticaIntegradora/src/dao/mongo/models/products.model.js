import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const productCollection = "Products"

const productSchema = new mongoose.Schema({
    title: {type: String, required:true, max:100},
    description: {type: String, required:true, max:100},
    code: {type: String, required:true, max:100},
    price: {type: Number, required:true, max:10000000},
    status: {type: String, required:true, max:100},
    stock: {type: Number, required:true, max:10000000},
    category: {type: String, required:true, max:100},
    owner: { type: String, required: true } 
})

productSchema.plugin(mongoosePaginate)
const productModel = mongoose.model(productCollection, productSchema)

export default productModel