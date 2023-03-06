const { countries } = require("../../database");

exports.getCountryIndex = function (countryName) {
  return countries.findIndex((country) => {
    return country.country === countryName;
  });
};
