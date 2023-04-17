import Joi from "joi";

export const wordSchema = Joi.object<{
  word: string;
  efactor: number;
}>({
  word: Joi.string().required(),
  efactor: Joi.number().required(),
});
