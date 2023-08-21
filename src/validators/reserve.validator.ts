import Joi from "joi";
import { IReserveFormInputs } from "@/interfaces/reserve.interface";

export const reserveValidator: Joi.ObjectSchema<IReserveFormInputs> =
  Joi.object({
    bookerFirstName: Joi.string().required().messages({
      "string.empty": "First name is required",
    }),
    bookerLastName: Joi.string().required().messages({
      "string.empty": "Last name is required",
    }),
    bookerEmail: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.email": "Email must be valid. Example: example@gmail.com",
        "string.empty": "Email is required",
      }),
    bookerPhone: Joi.string().regex(/^\d+$/).required().messages({
      "string.pattern.base": "Phone must contain only numbers",
      "string.empty": "Phone is required",
    }),
    bookerOccasion: Joi.string().allow("").optional(),
    bookerRequest: Joi.string().allow("").optional(),
  });
