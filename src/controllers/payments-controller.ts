// import userService from "@/services/users-service";
// import { Request, Response } from "express";
// import httpStatus from "http-status";

// export async function paymentPost(req: Request, res: Response) {
//   const { email, password, name, whatsapp } = req.body;

//   try {
//     const user = await userService.createUser({
//       email,
//       password,
//       name,
//       whatsapp,
//     });
//     return res.status(httpStatus.CREATED).json({
//       id: user.id,
//       name: user.name,
//       email: user.email,
//       whatsapp: user.whatsapp,
//     });
//   } catch (error) {
//     if (error.name === "DuplicatedEmailError") {
//       return res.status(httpStatus.CONFLICT).send(error);
//     }
//     return res.status(httpStatus.BAD_REQUEST).send(error);
//   }
// }

// export async function paymentsGet(req: Request, res: Response) {
// }
