const { users } = require("../../database");
const {
  validateUsernamePassword,
} = require("../validations/validateUsernamePassword");

exports.register = (req, res) => {
  const validatedUser = validateUsernamePassword(req.body);

  if (validatedUser.error) {
    res.status(400).send(validatedUser.error.details[0].message);
    return;
  }

  const { username, password } = validatedUser.value;

  const dbUser = users.find((currentUser) => {
    return currentUser.username === username;
  });

  if (dbUser) {
    res.status(404).send(`Username: ${username} already exists!`);
    return;
  }

  users.push({ username, password });
  res.status(201).send(`User ${username} has been registered!`);
};
