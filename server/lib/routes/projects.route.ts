import {/*Request, Response,*/ Application} from 'express';
import ProjectController from '../controllers/projects.controller';

export default class ProjectRouter {
  public projectController: ProjectController = new ProjectController();

  public routes(app: Application): void {
    app.route('/projects')
      .get(this.projectController.getProjects)
      .post(this.projectController.addProject)

    app.route('/projects/:projectid')
      .get(this.projectController.getProjectByID)
      .put(this.projectController.updateProject)
      .delete(this.projectController.removeProject)
  }
}