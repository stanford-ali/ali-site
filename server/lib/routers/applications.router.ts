import ApplicationController from "../controllers/applications.controller";
import { userRoute, adminRoute } from "../routes/index";
import { Router } from "express";

let applicationRouter: Router = Router();
let applicationController: ApplicationController = new ApplicationController();

applicationRouter.get("/", userRoute, adminRoute, applicationController.getApplications);
applicationRouter.get("/user/:user_id", userRoute, applicationController.getApplicationsByUser);
applicationRouter.get("/owner/:user_id", userRoute, applicationController.getApplicationsByOwner);
applicationRouter.get("/user/:user_id/project/:project_id", userRoute, applicationController.getApplication);
applicationRouter.get("/user/:user_id/selfproject/:project_id/", userRoute, applicationController.getSelfProjectApplications);
applicationRouter.post("/user/:user_id/project/:project_id", userRoute, applicationController.addApplication);

export default applicationRouter;
