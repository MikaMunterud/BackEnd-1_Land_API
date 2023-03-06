const express = require("express");
const { countryAdd } = require("../controllers/countryController/countryAdd");
const {
  countryDelete,
} = require("../controllers/countryController/countryDelete");
const { countryEdit } = require("../controllers/countryController/countryEdit");
const { countryGet } = require("../controllers/countryController/countryGet");
const { checkCookie } = require("../controllers/middleware/checkCookie");

const countryRoute = express.Router();

countryRoute.get("/:country?", countryGet);

countryRoute.post("/", checkCookie, countryAdd);

countryRoute.delete("/", checkCookie, countryDelete);

countryRoute.patch("/", checkCookie, countryEdit);

exports.countryRoute = countryRoute;
