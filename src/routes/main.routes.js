import express from "express";
import { authRouter } from "./auth.routes.js";
import { PostRouter } from "./post.routes.js";
export const mainRouter =express.Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/posts", PostRouter);