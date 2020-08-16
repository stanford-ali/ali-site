import { /*Request, Response,*/ Application } from "express";
import StudentController from "../controllers/students.controller";

export default class StudentRouter {
  public studentController: StudentController = new StudentController();

  public routes(app: Application): void {
    app
      .route("/students")
      .get(this.studentController.getStudents)
      .post(this.studentController.addStudent);

    app
      .route("/students/:studentid")
      .get(this.studentController.getStudentByID)
      .delete(this.studentController.removeStudent);

    app
      .route("/students/auth/:googleid")
      .get(this.studentController.getStudentByGoogleID)
      .put(this.studentController.updateStudent);
  }
}
