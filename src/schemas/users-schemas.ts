import { CreateUserParams } from "@/services/users-service";
import Joi from "joi";

export const createUserSchema = Joi.object<CreateUserParams>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().required(),
  whatsapp: Joi.string()
    .pattern(
      /^((\+55[1-9]{2})|(55[1-9]{2})|([1-9]{2}))(9[1-9][0-9]{7}|[1-9][0-9]{7})$/
    )
    .required(),
  //formato '+55-31-99999-9999'
});
