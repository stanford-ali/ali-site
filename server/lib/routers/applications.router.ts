import { Application } from "express";
import ApplicationController from "../controllers/applications.controller";
import { userRoute, adminRoute } from "../routes/index";

export default class ApplicationRouter {
  public applicationController: ApplicationController = new ApplicationController();

  public routes(app: Application): void {
    app.get(
      "/applications",
      adminRoute,
      this.applicationController.getApplications
    );
    app.get(
      "/applications/user/:user_id",
      userRoute,
      this.applicationController.getApplicationsByUser
    );
    app.get(
      "/applications/owner/:user_id",
      userRoute,
      this.applicationController.getApplicationsByOwner
    );
    app.get(
      "/applications/user/:user_id/project/:project_id",
      userRoute,
      this.applicationController.getApplication
    );
    app.post(
      "/applications/user/:user_id/project/:project_id",
      userRoute,
      this.applicationController.addApplication
    );
  }
}
