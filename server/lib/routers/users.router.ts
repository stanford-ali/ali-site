import UserController from "../controllers/users.controller";
import { userRoute, adminRoute } from "../routes";
import { Router } from "express";

let userRouter: Router = Router();
let userController: UserController = new UserController();

userRouter.get("/", userRoute, adminRoute, userController.getUsers);
userRouter.get("/:user_id", userRoute, userController.getUserByID);
userRouter.post("/:user_id", userRoute, userController.addUser);
userRouter.patch("/:user_id", userRoute, userController.updateUser);
userRouter.delete("/:user_id", userRoute, userController.removeUser);
userRouter.patch("/:user_id/follow/project/:project_id", userRoute, userController.followProject);
userRouter.patch("/:user_id/unfollow/project/:project_id", userRoute, userController.unfollowProject);

export default userRouter;
