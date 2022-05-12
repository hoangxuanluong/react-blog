const Joi = require('joi')

module.exports.postSchema = Joi.object({
  title: Joi.string().required(),
  desc: Joi.string().required(),
  photo: Joi.string(),
})
