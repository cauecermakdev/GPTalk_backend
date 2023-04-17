import { ApplicationError } from "@/protocols";

export function duplicatedWordError(): ApplicationError {
  return {
    name: "DuplicatedWordError",
    message: "There is already an word",
  };
}

export function noWordError(): ApplicationError {
  return {
    name: "noWordError",
    message: "There isnt any word",
  };
}
