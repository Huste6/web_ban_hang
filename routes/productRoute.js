const router = require('express').Router()
const ProductController = require('../controllers/productController')
// select
router.get('/product',ProductController.getAllProduct)
// insert into
router.post('/product',ProductController.create_product)
// update
router.put('/product/:product_id', ProductController.update_product)
// delete
router.delete('/product/:product_id',ProductController.delete_product)
// get product by product_id
router.get('/product/:product_id',ProductController.getProductByProduct_id)

module.exports = router