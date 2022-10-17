const Schedule = require("../models/schedule-model");

const getSchedule = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { period } = req.params;
    const schedule = await Schedule.find({ owner: _id });
    const date = schedule.filter((el) => el.date.includes(period));
    const payload = date.length > 0 ? date : {};
    res.json(payload);
  } catch (error) {
    next(error);
  }
};

const addScheduleItem = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { name, time, date } = req.body;
    const addedItem = await Schedule.create({
      owner: _id,
      date,
      name,
      time,
    });
    res.status(201).json(addedItem);
  } catch (error) {
    next(error);
  }
};

const deleteScheduleItem = async (req, res, next) => {
    try {
        const {id} = req.params
        const deletedOne = await Schedule.findByIdAndDelete(id)
        res.json(deletedOne)
    } catch (error) {
        next(error)
    }
}

const deleteMultipleScheduleItems = async (req, res, next) => {
  console.log(req.params, 'PRAAMMAMMMMS ffgfgfgfgfgfgfgfgf')
  try {
    console.log(req.params, 'PRAAMMAMMMMS')
    const {name} = req.params
    const itemName = name.split('-').join(' ')
    await Schedule.deleteMany({name: itemName})
   
    res.status(201).json({name: itemName})
} catch (error) {
    next(error)
}
}

module.exports = {
  addScheduleItem,
  getSchedule,
  deleteScheduleItem,
  deleteMultipleScheduleItems
};
