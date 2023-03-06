require("dotenv").config();

const secret = process.env.SECRET;

exports.checkCookie = function (req, res, next) {
  const serverCookie = req.cookies.serverCookie;

  if (serverCookie === secret) {
    next();
    return;
  }
  res.status(401).send("You have to be logged in to add a country");
  return;
};
