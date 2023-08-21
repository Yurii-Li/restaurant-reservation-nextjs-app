import Joi from "joi";
import { IAuthFormInputs } from "@/interfaces/auth.interface";

export const signInValidator: Joi.ObjectSchema<IAuthFormInputs> = Joi.object({
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
});
