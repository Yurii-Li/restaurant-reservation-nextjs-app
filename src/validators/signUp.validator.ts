import Joi from "joi";
import { IAuthFormInputs } from "@/interfaces/auth.interface";

export const signUpValidator: Joi.ObjectSchema<IAuthFormInputs> = Joi.object({
  firstName: Joi.string().required().messages({
    "string.empty": "First name is required",
  }),
  lastName: Joi.string().required().messages({
    "string.empty": "Last name is required",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Email must be valid. Example: example@gmail.com",
      "string.empty": "Email is required",
    }),
  password: Joi.string()
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Password should have at least 1 digit, 1 lowercase and 1 uppercase letter, and 8+ characters.",
      "string.empty": "Password is required",
    }),
  city: Joi.string().required().messages({
    "string.empty": "City is required",
  }),
  phone: Joi.string().regex(/^\d+$/).required().messages({
    "string.pattern.base": "Phone must contain only numbers",
    "string.empty": "Phone is required",
  }),
});
