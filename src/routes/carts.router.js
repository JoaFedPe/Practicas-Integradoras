import { Router } from 'express'
import cartModel from '../dao/models/carts.model.js'
import productModel from '../dao/models/products.model.js'

const router = Router()

router.get('/carts', async (req, res) => {
    try {
        let carts = await cartModel.find()
        res.send({result: "success", payload: carts})
        
    } catch (error) {
        console.log(error)
    }
})

router.get('/carts/:cid', async (req, res) => {
    let { cid } = req.params
    try {
        let cart = await cartModel.findOne({_id:cid})
        res.send({result: "success", payload: cart})
        
    } catch (error) {
        res.send ({ status: "error", error: "No existe el carrito con la ID ingresada"})
    }
})

router.post('/carts', async (req, res) => {
    let {productsInCart} = req.body
    if (productsInCart) {
        let cart = await cartModel.create({productsInCart})
        res.send ({result: "success", payload: cart})
                
    }else{
        res.send ({ status: "error", error: "Error al crear el Carrito"})
        }
    }
)

router.put('/carts/:cid/product/:pid', async (req, res) => {
    let { cid,  pid } = req.params
    const productToAdd = await productModel.findOne({_id:pid})

    if (!productToAdd) {
        res.send({ status: "error", error: "Producto no encontrado" })
    }

    const updatedCart = await cartModel.findOne({ _id: cid })
    const productAllReadyInCart = updatedCart.productsInCart.findIndex(product => product.productId.equals(productToAdd._id))
     
    if (productAllReadyInCart !== -1) {       
        await cartModel.updateOne(
            {_id: cid, "productsInCart.productId": productToAdd._id},
            {$inc: { "productsInCart.$.quantity": 1}}
        )
    } else {        
        await cartModel.updateOne(
            {_id: cid},
            {$push: { productsInCart: { productId: productToAdd._id, quantity: 1}}}
        )
    }

    res.send({result: "success", payload: updatedCart})  

})

router.delete('/carts/:cid', async (req, res) => {
    let { cid } = req.params
    try {
        let cart = await cartModel.deleteOne({_id:cid})
        res.send({result: "success", payload: cart})
        
    } catch (error) {
        res.send ({ status: "error", error: "No existe el carrito que quieres eliminar"})
    }
})

export default router