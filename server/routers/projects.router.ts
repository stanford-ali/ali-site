import ProjectController from "../controllers/projects.controller";
import { userMiddleware, adminMiddleware } from "../middleware";
import { Router } from "express";

let projectRouter: Router = Router();
let projectController: ProjectController = new ProjectController();

projectRouter.get("/", projectController.getProjects);
projectRouter.post("/", projectController.addProject);
projectRouter.get("/pending", userMiddleware, adminMiddleware, projectController.getPendingProjects);
// TODO (IMPORTANT): might need admin protection or a separate route to prevent owners from patching "approved: true" and approving their own projects
projectRouter.patch("/:project_id", userMiddleware, projectController.updateProject);
projectRouter.get("/:project_id", projectController.getProjectByID);
projectRouter.get("/owner/:user_id", projectController.getProjectsByOwner);

export default projectRouter;
