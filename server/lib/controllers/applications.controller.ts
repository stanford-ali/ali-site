import Application from "../models/applications.model";
import Project from "../models/projects.model";
import Users from "../models/users.model";
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
      async (error, data) => {
        for (const app of data) {
          let project = await Project.find({ _id: app.project_id });
          app.project_id = project[0];
        }
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
      async (error, data) => {
        for (const app of data) {
          let project = await Project.find({ _id: app.project_id });
          app.project_id = project[0];
        }
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

  public getSelfProjectApplications(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    Application.find(
      {
        project_id: req.params.project_id,
      },
      async (error, data) => {
        for (let app of data) {
          let project = await Project.find({ _id: app.project_id });
          let owner = await Users.find({ uid: app.owner_id });
          console.log(owner);
          app.project_id = project[0];
          app.owner_id = owner[0];
        }
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
        answers: req.body.answers,
        owner_id: req.body.owner_id,
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
