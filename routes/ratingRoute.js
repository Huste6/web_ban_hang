const router = require('express').Router()
const ratingController = require('../controllers/ratingController')
// select 
router.get('/rating',ratingController.getAllrating)
// update 
router.put('/rating/:rate_id',ratingController.update_rating)
// delete value
router.delete('/rating/:rate_id',ratingController.delete_rate)

module.exports = router