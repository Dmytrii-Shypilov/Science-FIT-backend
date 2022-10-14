const { Schema, model } = require("mongoose")

const exersiceSchema = Schema({
    exercise: {
        type: String,
        required: true,
    }
},
    {versionKey: false}
)

const Exercise = model("exercise", exersiceSchema)
module.exports = Exercise