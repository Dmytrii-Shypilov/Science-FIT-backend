const express = require('express')
const usersAPI = require('../controllers/userControllers')
const authorize = require('../middlewares/authorization')


const router = express.Router()

router.post('/signup', usersAPI.signUp)
router.post('/signin', usersAPI.signInUser)
router.get('/signout', usersAPI.signOut)
router.get('/current', authorize, usersAPI.getCurrentUser)


module.exports = router