import express from"express";
import path from "path";
import { serverConfig } from "../config.js";
import viewsController from "../controllers/views.controller.js";

const {viewPath} = serverConfig;

export const viewsRouter = express.Router();

viewsRouter.get("/", viewsController.MAIN);
viewsRouter.get("/register", viewsController.REGISTER);
viewsRouter.get("/login", viewsController.LOGIN);
viewsRouter.get("/user", viewsController.USER);
viewsRouter.get("/newPost", viewsController.NEWPOST);
viewsRouter.get("/editPost", viewsController.EDITPOST);

