import { Router } from "express";

//import { createWordSchema } from "@/schemas";
//import { validateBody } from "@/middlewares";
import { wordsGet, wordsPost, wordsExist } from "@/controllers";

const wordRouter = Router();
// usersRouter.post("/", validateBody(createUserSchema), usersPost);
//*******authenticate aqui ou no app
wordRouter.post("/", wordsPost);
wordRouter.get("/", wordsGet);
wordRouter.get("/:word", wordsExist);

export { wordRouter };
