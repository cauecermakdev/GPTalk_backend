//import { cannotEnrollBeforeStartDateError } from "@/errors";
import userRepository from "@/repositories/user-repository";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
//import eventsService from "../events-service";
import { duplicatedEmailError } from "./errors";

export async function createUser({
  email,
  password,
  name,
  whatsapp,
}: CreateUserParams): Promise<User> {
  // await canEnrollOrFail();

  await validateUniqueEmailOrFail(email);

  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.create({
    email,
    password: hashedPassword,
    name,
    whatsapp,
  });
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

export type CreateUserParams = Pick<
  User,
  "email" | "password" | "name" | "whatsapp"
>;

const userService = {
  createUser,
};

export * from "./errors";
export default userService;
