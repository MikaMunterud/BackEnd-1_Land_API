const { countries } = require("../../database");
const { getCountryIndex } = require("../middleware/getCountryIndex");
const { validateCountryName } = require("../validations/validateCountryName");

exports.countryDelete = function (req, res) {
  const validation = validateCountryName(req.body);

  if (validation.error) {
    res.status(400).send(validation.error.details[0].message);
    return;
  }

  const countryIndex = getCountryIndex(validation.value.country);

  if (countryIndex === -1) {
    res.status(404).send("Country does not exists in database");
    return;
  }

  countries.splice(countryIndex, 1);
  res.status(200).send("Country has been removed");
};
