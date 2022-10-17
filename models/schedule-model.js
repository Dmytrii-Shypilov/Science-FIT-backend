const { Schema, model } = require("mongoose");

const scheduleSchema = Schema(
  {
    owner: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const Schedule = model("schedule", scheduleSchema);
module.exports = Schedule;
