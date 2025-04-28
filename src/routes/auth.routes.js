import express from "express";
import authController from "../controllers/auth.controller.js";
import { userValidatorLogin, userValidatorRegister } from "../middlewares/validator.js";
export const authRouter = express.Router();

authRouter.post("/register", userValidatorRegister, authController.REGISTER);

authRouter.post("/login", userValidatorLogin, authController.LOGIN);