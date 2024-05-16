import { Router } from 'express'
import productModel from '../dao/models/products.model.js'


const router = Router()

router.get('/products', async (req, res) => {
    try {
        let products = await productModel.find()
        res.send({result: "success", payload: products})
        
    } catch (error) {
        console.log(error)
    }
})

router.get('/products/:pid', async (req, res) => {
    let { pid } = req.params
    try {
        let product = await productModel.findOne({_id:pid})
        res.send({result: "success", payload: product})
        
    } catch (error) {
        res.send ({ status: "error", error: "No existe producto con la ID ingresada"})
    }
})

router.post('/products', async (req, res) => {
    let {title, description, code, price, status, stock, category,} = req.body
    if (!title || !description || !code || !price || !status || !stock || !category) {
        res.send ({ status: "error", error: "Faltan caracteristicas del producto"})        
    }
    let existeProducto = await productModel.findOne({ code })
    if(existeProducto) {
        res.send ({ status: "error", error: "El producto que quieres agregar ya existe"})}
        else {
            let product = await productModel.create({title, description, code, price, status, stock, category,})
            res.send ({result: "success", payload: product})
        }
    }
)

router.put('/products/:pid', async (req, res) => {
    let { pid } = req.params
    let productToReplace = req.body
    if (!productToReplace.title || !productToReplace.description || !productToReplace.code || !productToReplace.price || !productToReplace.status || !productToReplace.stock || !productToReplace.category) {
        res.send ({ status: "error", error: "Faltan caracteristicas del producto que quieres modificar"})        
    }
    let replacedProduct = await productModel.updateOne({_id:pid}, productToReplace)
    res.send ({result: "success", payload: replacedProduct})

})

router.delete('/products/:pid', async (req, res) => {
    let { pid } = req.params
    try {
        let product = await productModel.deleteOne({_id:pid})
        res.send({result: "success", payload: product})
        
    } catch (error) {
        res.send ({ status: "error", error: "No existe el producto que quieres eliminar"})
    }
})

export default router