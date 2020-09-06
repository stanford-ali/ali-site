import { Application } from "express";
import ProjectController from "../controllers/projects.controller";
import { userRoute, adminRoute } from "../routes";

export default class ProjectRouter {
  public projectController: ProjectController = new ProjectController();

  public routes(app: Application): void {
    app.get("/projects", this.projectController.getProjects);
    app.post("/projects", this.projectController.addProject);

    app.get("/projects/:project_id", this.projectController.getProjectByID);

    app.get(
      "/projects/pending",
      adminRoute,
      this.projectController.getPendingProjects
    );
  }
}
