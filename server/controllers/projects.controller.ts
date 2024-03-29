import Project from "../models/projects.model";
import { Request, Response, NextFunction } from "express";

export default class ProjectController {
  public getProjects(req: Request, res: Response, next: NextFunction) {
    Project.find(
      {
        approved: true,
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

  public getProjectByID(req: Request, res: Response, next: NextFunction) {
    Project.find(
      {
        _id: req.params.project_id,
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

  public getProjectsByOwner(req: Request, res: Response, next: NextFunction) {
    Project.find(
      {
        owner: req.params.user_id,
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

  public addProject(req: Request, res: Response, next: NextFunction) {
    Project.create(req.body, (error, data) => {
      if (error) {
        next(error);
        return;
      }
      res.json(data);
    });
  }

  public getPendingProjects(req: Request, res: Response, next: NextFunction) {
    Project.find(
      {
        approved: false,
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

  public updateProject(req: Request, res: Response, next: NextFunction) {
    Project.findOne(
      {
        _id: req.params.project_id,
      },
      (error, data) => {
        if (error) {
          next(error);
          return;
        }
        for (const property in req.body) {
          data[property] = req.body[property];
        }
        console.log(data);
        data.save();
        res.json(data);
      }
    );
  }
}
