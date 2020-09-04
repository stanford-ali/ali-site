import Application from "../models/applications.model";
import { Request, Response, NextFunction } from "express";
import App from "../App";

export default class ApplicationController {
  public getApplications(req: Request, res: Response, next: NextFunction) {
    Application.find({}, (error, data) => {
      if (error) {
        next(error);
        return;
      }
      res.json(data);
    });
  }

  public getApplicationsByUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    Application.find(
      {
        user_id: req.params.user_id,
      },
      (error, data) => {
        if (error) {
          next(error);
          return;
        }
        res.json(data);
      }
    );
  }

  public getApplicationsByOwner(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    Application.find(
      {
        owner_id: req.params.user_id,
      },
      (error, data) => {
        if (error) {
          next(error);
          return;
        }
        res.json(data);
      }
    );
  }

  public getApplication(req: Request, res: Response, next: NextFunction) {
    Application.findOne(
      {
        user_id: req.params.user_id,
        project_id: req.params.project_id,
      },
      (error, data) => {
        if (error) {
          next(error);
          return;
        }
        res.json(data);
      }
    );
  }

  public addApplication(req: Request, res: Response, next: NextFunction) {
    Application.create(
      {
        user_id: req.params.user_id,
        project_id: req.params.project_id,
        answers: req.body,
      },
      (error, data) => {
        if (error) {
          next(error);
          return;
        }
        res.json(data);
      }
    );
  }
}
