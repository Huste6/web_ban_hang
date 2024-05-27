const router = require('express').Router()
const DeliveryController = require('../controllers/deliveryController')
const { route } = require('./customerRoute')
//select
router.get('/delivery',DeliveryController.getAllDelivery)
// insert into
router.post('/delivery',DeliveryController.create_delivery)
// delete
router.delete('/delivery/:delivery_id',DeliveryController.delete_delivery)

module.exports = router