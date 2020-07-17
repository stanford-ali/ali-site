import Application from '../models/applications.model';
import {Request, Response, NextFunction} from 'express';

export default class ApplicationController {
  public getApplications(req: Request, res: Response, next: NextFunction) {
    Application.find({}, (error, data) => {
      if (error) {
        next(error);
        return;
      }
      res.json(data);
    })
  }

  public getApplicationByID(req: Request, res: Response, next: NextFunction) {
    Application.findById(req.params.applicationid, (error, data) => {
      if (error) {
        next(error);
        return;
      }
      res.json(data);
    })
  }

  public addApplication(req: Request, res: Response, next: NextFunction) {
    Application.insertMany(req.body, (error, data) => {
      if (error) {
        next(error);
        return;
      }
      res.json(data);
    })
  }

  public updateApplication(req: Request, res: Response, next: NextFunction) {
    Application.findOneAndUpdate({_id: req.params.applicationid}, req.body, (error, data) => {
      if (error) {
        next(error);
        return;
      }
      res.json(data);
    })
  }

  public removeApplication(req: Request, res: Response, next: NextFunction) {
    Application.remove({_id: req.params.applicationid}, (error, data) => {
      if (error) {
        next(error);
        return;
      }
      res.json({message: 'Successfully removed faculty member.'});
    })
  }
}