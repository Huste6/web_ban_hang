const router = require('express').Router()
const customerController = require('../controllers/customerController')
// select
router.get('/customer',customerController.getAllCustomer)
// insert into
router.post('/customer',customerController.create_customer)
// update
router.put('/customer/:customer_id', customerController.update_customer)
// delete value
router.delete('/customer/:customer_id',customerController.delete_customer)
// get customer by customer_id
router.get('/customer/:customer_id',customerController.getCustomerByCustomer_id)

module.exports = router