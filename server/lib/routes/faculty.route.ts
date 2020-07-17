import {/*Request, Response,*/ Application} from 'express';
import FacultyController from '../controllers/faculty.controller';

export default class FacultyRouter {
  public facultyController: FacultyController = new FacultyController();

  public routes(app: Application): void {
    app.route('/faculty')
      .get(this.facultyController.getFaculty)
      .post(this.facultyController.addFaculty);

    app.route('/faculty/:facultyid')
      .get(this.facultyController.getFacultyByID)
      .put(this.facultyController.updateFaculty)
      .delete(this.facultyController.removeFaculty);
  }
}