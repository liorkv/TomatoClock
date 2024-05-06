const Task = require("../model/Task");
const User = require("../model/User");

const createTask = async (req, res) => {
  const { description } = req.body;

  const username = req.user;

  try {
    const userObj = await User.findOne({ username });

    const newTask = new Task({
      description,
      user: userObj._id,
      completedPomodoros: 0,
      totalTime: 0,
    });

    const result = await newTask.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTasks = async (req, res) => {
  const username = req.user;

  try {
    const userObj = await User.findOne({ username });

    const tasks = await Task.find({ user: userObj._id }).exec();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Task.findByIdAndDelete(id).exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { description, estimatedPomodoros } = req.body;

  try {
    const result = await Task.findByIdAndUpdate(
      id,
      { description, estimatedPomodoros },
      { new: true }
    ).exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const increamentCompletedPomodorosTask = async (req, res) => {
  const { id } = req.params;
  const { pomodoroTime } = req.body;

  try {
    const task = await Task.findById(id).exec();

    task.completedPomodoros += 1;
    task.totalTime += pomodoroTime;
    const result = await task.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const disableEnableTask = async (req, res) => {
  const { id } = req.params;
  const { disableTask } = req.body;

  console.log(disableTask);

  try {
    const task = await Task.findById(id).exec();
    task.disableTask = disableTask;
    const result = await task.save();

    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
  increamentCompletedPomodorosTask,
  disableEnableTask,
};
