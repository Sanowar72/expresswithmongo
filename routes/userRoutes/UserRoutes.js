import express from "express";
import { login, signout, signup } from "../../controller/UserController.js";

const userRouter = express.Router();
userRouter.post("/signin", login);
userRouter.post("/signup", signup);
userRouter.post("/signout", signout);
export default userRouter;
