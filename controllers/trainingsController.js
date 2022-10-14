const createError = require('../helpers/createError')
const Training = require('../models/training-model')
const User = require('../models/user-model')

const fetchTrainings = async (req, res, next) => {
    try {
        console.log(req.user)
        // const owned = await Training.find({owner: _id})
        const template = await Training.find({owner: "standard"})
        const trainings = [...template]
        res.json(trainings)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    fetchTrainings,
}