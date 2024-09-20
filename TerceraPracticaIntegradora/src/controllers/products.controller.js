import  productsServices  from "../dao/mongo/services/products.services.js"

const getProducts = async (req, res) => {
    const {page:_page, limit:_limit, category, title, sort} = req.query
    let page = parseInt(_page)
    let limit = parseInt(_limit)
    

    let result = await productsServices.getProducts ({page,limit,title,sort,category})    
    
    res.render('products', {
        user: req.session.user,
        isValid: true,
        ...result             
    })

} 

const getProductsById = async (req, res) => {
    const pid  = req.params
    
    let product = await productsServices.getProductsById(pid)
    
    res.json(product)
}

const createProduct = async (req, res) => {
    let {title, description, code, price, status, stock, category} = req.body
    const owner = req.session.user.email
    
    let productAdded = await productsServices.createProduct({title, description, code, price, status, stock, category, owner})

    if (productAdded.status === 'success') {
        return res.json(productAdded); 
    } else {
        return res.status(400).json(productAdded); 
    }
    

}

const createProductPage = async (req, res) => {
    res.render('createProduct')
}


const modifyProduct = async (req, res) => {
    const {pid}  = req.params
    let productToModify = req.body
    let productModifyed = await productsServices.modifyProduct(pid, productToModify)
    res.json(productModifyed)
}

const deleteProduct = async (req, res) => {
    const pid  = req.params
    
    let productDeleted = await productsServices.deleteProduct(pid)
    
    res.json(productDeleted)
}

export {getProducts, getProductsById, createProduct, createProductPage, modifyProduct, deleteProduct}

