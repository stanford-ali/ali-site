import {/*Request, Response,*/ Application} from 'express';
import ApplicationController from '../controllers/applications.controller';

export default class ApplicationRouter {
  public applicationController: ApplicationController = new ApplicationController();

  public routes(app: Application): void {
    app.route('/applications')
      .get(this.applicationController.getApplications)
      .post(this.applicationController.addApplication)

    app.route('/applications/:applicationid')
      .get(this.applicationController.getApplicationByID)
      .put(this.applicationController.updateApplication)
      .delete(this.applicationController.removeApplication)
  }
}