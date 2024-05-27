const router = require('express').Router()
const inventoryController = require('../controllers/inventoryController')
// get
router.get('/inventory',inventoryController.getInventory)

module.exports=router