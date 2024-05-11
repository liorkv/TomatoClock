const User = require("../model/User");

const getUserSettings = async (req, res) => {
  const user = req.user;

  try {
    const foundUser = await User.findOne({ username: user }).exec();

    if (!foundUser) return res.sendStatus(404);

    const { pomodoroTime, shortBreakTime, longBreakTime } = foundUser;

    console.log(foundUser);

    res.json({ pomodoroTime, shortBreakTime, longBreakTime });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUserSettings };
