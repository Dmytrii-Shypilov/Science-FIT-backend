const express = require('express')
const authorize = require('../middlewares/authorization')
const trainingsAPI = require('../controllers/trainingsController')

const router = express.Router()

router.get('/', authorize, trainingsAPI.fetchTrainings)


module.exports = router