import Student from "../models/students.model";
import { Request, Response, NextFunction } from "express";

export default class StudentController {
  public getStudents(req: Request, res: Response, next: NextFunction) {
    Student.find({}, (error, data) => {
      if (error) {
        next(error);
        return;
      }
      res.json(data);
    });
  }

  public getStudentByID(req: Request, res: Response, next: NextFunction) {
    Student.findById(req.params.studentid, (error, data) => {
      if (error) {
        next(error);
        return;
      }
      res.json(data);
    });
  }

  public getStudentByGoogleID(req: Request, res: Response, next: NextFunction) {
    Student.find({ google_id: req.params.googleid }, (error, data) => {
      if (error) {
        next(error);
        return;
      }
      res.json(data);
    });
  }

  public addStudent(req: Request, res: Response, next: NextFunction) {
    Student.insertMany(req.body, (error, data) => {
      if (error) {
        next(error);
        return;
      }
      res.json(data);
    });
  }

  public updateStudent(req: Request, res: Response, next: NextFunction) {
    Student.replaceOne(
      { google_id: req.params.googleid },
      req.body,
      (error, data) => {
        if (error) {
          next(error);
          return;
        }
        res.json(data);
      }
    );
  }

  public removeStudent(req: Request, res: Response, next: NextFunction) {
    Student.remove({ _id: req.params.studentid }, (error, data) => {
      if (error) {
        next(error);
        return;
      }
      res.json({ message: "Successfully removed student." });
    });
  }
}
