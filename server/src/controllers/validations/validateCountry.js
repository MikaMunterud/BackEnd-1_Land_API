const joi = require("joi");

exports.validateCountry = function (requestBody) {
  const postSchema = joi.object({
    country: joi.string().min(4).max(60).required(),
    flag: joi.string().min(1).max(8),
    population: joi.number().min(100).max(2000000000).required(),
    capital: joi.string().min(4).max(60).required(),
    language: joi.string().min(4).max(100).required(),
  });

  return postSchema.validate(requestBody);
};
