const { users } = require("../../database");
require("dotenv").config();

const secret = process.env.SECRET;

const {
  validateUsernamePassword,
} = require("../validations/validateUsernamePassword");

exports.login = (req, res) => {
  const validatedUser = validateUsernamePassword(req.body);

  if (validatedUser.error) {
    res.status(400).send(validatedUser.error.details[0].message);
    return;
  }

  const { username, password } = validatedUser.value;

  const dbUser = users.find((currentUser) => {
    return (
      currentUser.username === username && currentUser.password === password
    );
  });

  if (!dbUser) {
    res.status(404).send("User not found!");
    return;
  }

  res.cookie("serverCookie", secret, {
    maxAge: 120000,
    sameSite: "none",
    secure: true,
    httpOnly: true,
  });

  res.status(200).send("User found!");
};
