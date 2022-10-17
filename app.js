const express = require('express')
const cors = require("cors")
require("dotenv").config()

const exerciseRouter = require('./routes/exercises')
const usersRouter = require('./routes/users')
const trainingsRouter = require('./routes/trainings')
const scheduleRouter = require('./routes/schedule')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/exercises', exerciseRouter)

app.use('/users', usersRouter)
app.use('/trainings', trainingsRouter)
app.use('/schedules', scheduleRouter)


app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
    res.status(err.status).json({ message: err.message })
  })

module.exports = app