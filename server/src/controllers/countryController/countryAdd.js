const { validateCountry } = require("../validations/validateCountry");
const { getCountryIndex } = require("../middleware/getCountryIndex");
const { countries } = require("../../database");

exports.countryAdd = function (req, res) {
  const validation = validateCountry(req.body);

  if (validation.error) {
    res.status(400).send(validation.error.details[0].message);
    return;
  }

  const countryIndex = getCountryIndex(validation.value.country);
  if (countryIndex !== -1) {
    res.status(409).send("Country already exists in database");
    return;
  }

  const newCountry = {
    country: validation.value.country,
    flag: validation.value.flag,
    population: validation.value.population,
    capital: validation.value.capital,
    language: validation.value.language,
  };

  countries.push(newCountry);
  res.status(201).json(newCountry);
};
