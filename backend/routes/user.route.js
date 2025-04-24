import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  followUser,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
const userRouter = Router();
userRouter.post("/:username", getUser);
userRouter.post("/auth/register", registerUser);
userRouter.post("/auth/login", loginUser);
userRouter.post("/auth/logout", logoutUser);
userRouter.post("/follow/:username", verifyToken, followUser);

export default userRouter;
