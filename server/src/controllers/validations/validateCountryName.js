const joi = require("joi");

exports.validateCountryName = function (requestBody) {
  const postSchema = joi.object({
    country: joi.string().min(4).max(60).required(),
  });

  return postSchema.validate(requestBody);
};
