import ApplicationController from "../controllers/applications.controller";
import { userMiddleware, adminMiddleware } from "../middleware/index";
import { Router } from "express";

let applicationRouter: Router = Router();
let applicationController: ApplicationController = new ApplicationController();

applicationRouter.get("/", userMiddleware, adminMiddleware, applicationController.getApplications);
applicationRouter.get("/user/:user_id", userMiddleware, applicationController.getApplicationsByUser);
applicationRouter.get("/owner/:user_id", userMiddleware, applicationController.getApplicationsByOwner);
applicationRouter.get("/user/:user_id/project/:project_id", userMiddleware, applicationController.getApplication);
applicationRouter.get("/user/:user_id/selfproject/:project_id/", userMiddleware, applicationController.getSelfProjectApplications);
applicationRouter.post("/user/:user_id/project/:project_id", userMiddleware, applicationController.addApplication);

export default applicationRouter;
