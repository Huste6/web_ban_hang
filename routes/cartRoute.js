const router = require('express').Router()
const cartController = require('../controllers/cartController')

router.get('/cart',cartController.getCart)
router.get('/cart/:cart_id',cartController.getCartByCartID)

module.exports = router