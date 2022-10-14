const express = require('express')
const Exercise = require('../models/exercises-model')


const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
        const exercises = await Exercise.find()
        res.json(exercises)   
    } catch (error) {
        console.log(error.message)
    }
    })



module.exports = router