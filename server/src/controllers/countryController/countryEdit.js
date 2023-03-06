const { countries } = require("../../database");
const { getCountryIndex } = require("../middleware/getCountryIndex");
const { validateCountry } = require("../validations/validateCountry");

exports.countryEdit = function (req, res) {
  const validation = validateCountry(req.body);

  if (validation.error) {
    res.status(400).send(validation.error.details[0].message);
    return;
  }

  const countryIndex = getCountryIndex(validation.value.country);

  if (countryIndex === -1) {
    res.status(404).send("Country does not exists in database");
    return;
  }

  const editedCountry = {
    country: validation.value.country,
    flag: validation.value.flag,
    population: validation.value.population,
    capital: validation.value.capital,
    language: validation.value.language,
  };

  countries[countryIndex] = editedCountry;
  res.status(200).send(editedCountry);
};
