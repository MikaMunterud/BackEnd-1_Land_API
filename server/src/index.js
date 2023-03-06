const express = require("express");
const server = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { countryRoute } = require("./routes/countryRoute.js");
const { authenticationRoute } = require("./routes/authenticationRoute.js");

server.use(express.json());
server.use(cookieParser());

server.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

server.use("/authentication", authenticationRoute);
server.use("/countries", countryRoute);

server.listen(5050);
