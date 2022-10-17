const express = require('express')
const authorize = require('../middlewares/authorization')
const trainingsAPI = require('../controllers/trainingsControllers')

const router = express.Router()

router.get('/', authorize, trainingsAPI.fetchTrainings)
router.post('/add', authorize, trainingsAPI.addTraining)
router.delete('/:id', authorize, trainingsAPI.deleteTraining)


module.exports = router