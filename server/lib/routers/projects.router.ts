import ProjectController from "../controllers/projects.controller";
import { userRoute, adminRoute } from "../routes";
import { Router } from "express";

let projectRouter: Router = Router();
let projectController: ProjectController = new ProjectController();

projectRouter.get("/", projectController.getProjects);
projectRouter.post("/", projectController.addProject);
projectRouter.get("/pending", userRoute, adminRoute, projectController.getPendingProjects);
// IMPORTANT: might need admin protection or a separate route to prevent owners from patching "approved: true" and approving their own projects
projectRouter.patch("/:project_id", userRoute, projectController.updateProject);
projectRouter.get("/:project_id", projectController.getProjectByID);
projectRouter.get("/owner/:user_id", projectController.getProjectsByOwner);

export default projectRouter;
