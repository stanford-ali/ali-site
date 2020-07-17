import Faculty from '../models/faculty.model';
import {Request, Response, NextFunction} from 'express';

export default class FacultyController {
  public getFaculty(req: Request, res: Response, next: NextFunction) {
    Faculty.find({}, (error, data) => {
      if (error) {
        next(error);
        return;
      }
      res.json(data);
    })
  }

  public getFacultyByID(req: Request, res: Response, next: NextFunction) {
    Faculty.findById(req.params.facultyid, (error, data) => {
      if (error) {
        next(error);
        return;
      }
      res.json(data);
    })
  }

  public addFaculty(req: Request, res: Response, next: NextFunction) {
    Faculty.insertMany(req.body, (error, data) => {
      if (error) {
        next(error);
        return;
      }
      res.json(data);
    })
  }

  public updateFaculty(req: Request, res: Response, next: NextFunction) {
    Faculty.findOneAndUpdate({_id: req.params.facultyid}, req.body, (error, data) => {
      if (error) {
        next(error);
        return;
      }
      res.json(data);
    })
  }

  public removeFaculty(req: Request, res: Response, next: NextFunction) {
    Faculty.remove({_id: req.params.facultyid}, (error, data) => {
      if (error) {
        next(error);
        return;
      }
      res.json({message: 'Successfully removed faculty member.'});
    })
  }
}