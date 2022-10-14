const { Schema, model } = require("mongoose");

const trainingSchema = Schema(
  {
    owner: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    exercises: {
      type: Array,
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const Training = model('training', trainingSchema)
module.exports = Training