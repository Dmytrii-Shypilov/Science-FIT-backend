const createError = require("../helpers/createError");
const Training = require("../models/training-model");
const { create } = require("../models/user-model");
const User = require("../models/user-model");


const fetchTrainings = async (req, res, next) => {
  try {
    const { id } = req.user;
    const owned = await Training.find({ owner: id });
    res.json(owned);
  } catch (error) {
    next(error);
  }
};

const deleteTraining = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedOne = await Training.findByIdAndDelete(id);
    res.json(deletedOne);
  } catch (error) {
    next(error);
  }
};

const addTraining = async (req, res, next) => {
  try {
    const { notes, name, exercises } = req.body;
    const { id } = req.user;
    const result = await Training.create({
      owner: id,
      name,
      exercises,
      notes,
    });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fetchTrainings,
  addTraining,
  deleteTraining
};
