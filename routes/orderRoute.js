const router = require('express').Router()
const OrderController = require('../controllers/orderController')
// select
router.get('/order',OrderController.getAllOrder)
// find 
router.get('/order/:order_id',OrderController.getOrderByOrderID)
module.exports = router