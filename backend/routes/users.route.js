import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { getUser, registerUser } from "../controllers/users.controller.js";

const userRouter = new Router();

userRouter.post("/register", upload.fields([
    {
        name: "avatar",
        maxCount: 1
    },
    {
        name: "userImage",
        maxCount: 1
    }
]), registerUser);

userRouter.get("/:id", getUser);

export { userRouter };