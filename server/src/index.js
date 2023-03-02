const express = require("express");
const server = express();
const cors = require("cors");
const { users, countries } = require("../database.js");
const joi = require("joi");
const cookieParser = require("cookie-parser");
server.use(express.json());
server.use(
  cors({
    origin: "http://localhost:3002",
    credentials: true,
  })
);
server.use(cookieParser());

server.get("/", (req, res) => {
  // Validate if user enters body or query in the request.
  const query = req.query;
  const body = req.body;

  const queryKeys = Object.keys(query);
  const bodyKeys = Object.keys(body);

  if (queryKeys.length > 0 || bodyKeys.length > 0) {
    res.status(406).send("Please do not send in data");
    return;
  }
  // All countries are sent
  res.json(countries);
});

server.post("/getCountry", (req, res) => {
  const validation = validateCountryName(req.body);

  if (validation.error) {
    res.status(400).send(validation.error.details[0].message);
    return;
  }

  const countryIndex = checkCountryName(validation.value.country);

  if (countryIndex === -1) {
    res.status(404).send("Country does not exists in database");
    return;
  }

  res.status(200).send(countries[countryIndex]);
  console.log(countries[countryIndex]);
});

server.post("/login", (req, res) => {
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

  res.cookie("serverCookie", "loggedInUser", {
    maxAge: 120000,
    sameSite: "none",
    secure: true,
    httpOnly: true,
  });

  //   console.log("from login:", res.cookie);

  res.status(200).send("User found!");

  //   console.log(validatedUser.value);
});

server.use(checkCookie);

server.post("/addCountry", (req, res) => {
  const validation = validateCountry(req.body);

  if (validation.error) {
    res.status(400).send(validation.error.details[0].message);
    return;
  }

  const countryIndex = checkCountryName(validation.value.country);
  console.log(countryIndex);
  if (countryIndex !== -1) {
    res.status(409).send("Country already exists in database");
    return;
  }

  const newCountry = {
    country: validation.value.country,
    population: validation.value.population,
    capital: validation.value.capital,
    language: validation.value.language,
  };

  countries.push(newCountry);
  console.log(countries);
  res.status(201).json(newCountry);
});

server.patch("/editCountry", (req, res) => {
  const validation = validateCountry(req.body);

  if (validateCountry.error) {
    res.status(400).send(validatedUser.error.details[0].message);
    return;
  }

  const countryIndex = checkCountryName(validation.value.country);

  if (countryIndex === -1) {
    res.status(404).send("Country does not exists in database");
    return;
  }

  const editedCountry = {
    country: validation.value.country,
    population: validation.value.population,
    capital: validation.value.capital,
    language: validation.value.language,
  };

  countries[countryIndex] = editedCountry;
  res.status(200).send(editedCountry);
  console.log(countries);
});

server.delete("/deleteCountry", (req, res) => {
  const validation = validateCountryName(req.body);

  if (validateCountry.error) {
    res.status(400).send(validatedUser.error.details[0].message);
    return;
  }

  const countryIndex = checkCountryName(validation.value.country);

  if (countryIndex === -1) {
    res.status(404).send("Country does not exists in database");
    return;
  }

  countries.splice(countryIndex, 1);
  console.log(countries);
  res.status(200).send("Country has been removed");
});

server.listen(5050, () => {
  console.log("listening on port 5050!");
});

function validateUsernamePassword(requestBody) {
  const postSchema = joi.object({
    username: joi.string().min(3).max(20).required(),
    password: joi.string().min(6).max(30).required(),
  });

  return postSchema.validate(requestBody);
}

function validateCountry(requestBody) {
  const postSchema = joi.object({
    country: joi.string().min(4).max(60).required(),
    population: joi.number().min(100).max(2000000000).required(),
    capital: joi.string().min(4).max(60).required(),
    language: joi.string().min(4).max(100).required(),
  });

  return postSchema.validate(requestBody);
}

function validateCountryName(requestBody) {
  const postSchema = joi.object({
    country: joi.string().min(4).max(60).required(),
  });

  return postSchema.validate(requestBody);
}

function checkCountryName(countryName) {
  return countries.findIndex((country) => {
    return country.country === countryName;
  });
}

function checkCookie(req, res, next) {
  const serverCookie = req.cookies.serverCookie;

  if (serverCookie === "loggedInUser") {
    next();
    return;
  }
  res.status(401).send("You have to be logged in to add a country");
  return;
}
