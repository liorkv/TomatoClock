const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd) {
    res.status(400).json({ error: "Missing user or password" });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(pwd, 10);

    const result = await User.create({
      username: user,
      password: hashedPassword,
    });

    console.log(result);

    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

module.exports = { handleNewUser };
