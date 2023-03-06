const { countries } = require("../../database");
const { getCountryIndex } = require("../middleware/getCountryIndex");

exports.countryGet = function (req, res) {
  //   Validate if user enters body or query in the request.
  const query = req.query;
  const body = req.body;

  const queryKeys = Object.keys(query);
  const bodyKeys = Object.keys(body);

  if (queryKeys.length > 0 || bodyKeys.length > 0) {
    res.status(400).send("Please do not send in data");
    return;
  }

  const { country } = req.params;
  if (!country) {
    res.status(200).json(countries);
    return;
  }

  const countryIndex = getCountryIndex(country);

  if (countryIndex === -1) {
    res.status(404).send("Country does not exists in database");
    return;
  }

  res.status(200).json(countries[countryIndex]);
};
