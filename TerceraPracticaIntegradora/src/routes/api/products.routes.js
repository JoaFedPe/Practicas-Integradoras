import { Router } from 'express'
import {getProducts, getProductsById, modifyProduct, createProduct, createProductPage, deleteProduct} from '../../controllers/products.controller.js'
import {isAdmin, isAdminOrPremium, isPremium} from '../../middleware/auth.js'

const router = Router()

router.get('/products', getProducts)

router.get('/products/:pid', getProductsById) 

router.get('/createProduct', isAdminOrPremium, createProductPage)

router.post('/createProduct', createProduct) 

router.put('/products/:pid', isAdmin, modifyProduct) 

router.delete('/products/:pid', isAdmin, deleteProduct) 

export default router