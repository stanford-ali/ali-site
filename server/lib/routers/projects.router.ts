import { Application } from "express";
import ProjectController from "../controllers/projects.controller";
import { userRoute, adminRoute } from "../routes";

export default class ProjectRouter {
  public projectController: ProjectController = new ProjectController();

  public routes(app: Application): void {
    app.get("/projects", this.projectController.getProjects);
    app.post("/projects", this.projectController.addProject);
    app.get(
      "/projects/pending",
      adminRoute,
      this.projectController.getPendingProjects
    );
    // IMPORTANT: might need admin protection or a separate route 
    // to prevent owners from patching "approved: true" and approving their own projects
    app.patch(
      "/projects/:project_id",
      userRoute,
      this.projectController.updateProject
    );
    app.get("/projects/:project_id", this.projectController.getProjectByID);
    app.get(
      "/projects/owner/:user_id",
      this.projectController.getProjectsByOwner
    );
  }
}
