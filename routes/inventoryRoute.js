const router = require('express').Router()
const inventoryController = require('../controllers/inventoryController')
// get
router.get('/inventory',inventoryController.getInventory)
// find
router.get('/inventory/:inventory_id',inventoryController.getInventoryById)
module.exports=router