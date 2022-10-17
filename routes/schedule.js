const express = require('express')
const scheduleAPI = require('../controllers/scheduleControllers')
const authorize = require('../middlewares/authorization')


const router = express.Router()

router.post('/add', authorize, scheduleAPI.addScheduleItem)
router.get('/:period', authorize, scheduleAPI.getSchedule)
router.delete('/delete/:id', authorize, scheduleAPI.deleteScheduleItem)
router.delete('/delete/multiple/:name', authorize, scheduleAPI.deleteMultipleScheduleItems)


module.exports = router