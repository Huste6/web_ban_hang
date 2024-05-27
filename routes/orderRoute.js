const router = require('express').Router()
const OrderController = require('../controllers/orderController')
// select
router.get('/order',OrderController.getAllOrder)

module.exports = router