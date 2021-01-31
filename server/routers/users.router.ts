import UserController from "../controllers/users.controller";
import { userMiddleware, adminMiddleware } from "../middleware";
import { Router } from "express";

let userRouter: Router = Router();
let userController: UserController = new UserController();

userRouter.get("/", userMiddleware, adminMiddleware, userController.getUsers);
userRouter.get("/:user_id", userMiddleware, userController.getUserByID);
userRouter.post("/:user_id", userMiddleware, userController.addUser);
userRouter.patch("/:user_id", userMiddleware, userController.updateUser);
userRouter.delete("/:user_id", userMiddleware, userController.removeUser);
userRouter.patch("/:user_id/follow/project/:project_id", userMiddleware, userController.followProject);
userRouter.patch("/:user_id/unfollow/project/:project_id", userMiddleware, userController.unfollowProject);

export default userRouter;
