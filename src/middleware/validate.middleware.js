import Joi from "joi";

const validateSignUP = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }).required(),
  password: Joi.string().min(8).required(),
});

const validateSignIn = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export { validateSignUP, validateSignIn };
