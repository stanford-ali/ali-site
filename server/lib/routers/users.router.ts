import { Application } from "express";
import UserController from "../controllers/users.controller";
import { userRoute, adminRoute } from "../routes";

export default class UserRouter {
  public userController: UserController = new UserController();

  public routes(app: Application): void {
    app.get("/users", adminRoute, this.userController.getUsers);

    app.get("/users/:user_id", userRoute, this.userController.getUserByID);
    app.post("/users/:user_id", userRoute, this.userController.addUser);
    app.patch("/users/:user_id", userRoute, this.userController.updateUser);
    app.delete("/users/:user_id", userRoute, this.userController.removeUser);

    app.patch(
      "/users/:user_id/follow/project/:project_id",
      userRoute,
      this.userController.followProject
    );
    app.patch(
      "/users/:user_id/unfollow/project/:project_id",
      userRoute,
      this.userController.unfollowProject
    );
  }
}
