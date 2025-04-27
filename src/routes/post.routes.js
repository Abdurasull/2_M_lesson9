import express from "express";
import { postController } from "../controllers/post.controller.js";

export const PostRouter = express.Router();

PostRouter.route("/:userId")
.get(postController.GET)
.post(postController.POST)
.put(postController.PUT)
.delete(postController.DELETE)




