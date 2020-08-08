import Project from "../models/projects.model";
import { Request, Response, NextFunction } from "express";

export default class ProjectController {
  public getProjects(req: Request, res: Response, next: NextFunction) {
    Project.find({}, (error, data) => {
      if (error) {
        next(error);
        return;
      }
      res.json(data);
    });
  }

  public getProjectByID(req: Request, res: Response, next: NextFunction) {
    Project.find({ id: req.params.projectid }, (error, data) => {
      if (error) {
        next(error);
        return;
      }
      res.json(data);
    });
  }

  public addProject(req: Request, res: Response, next: NextFunction) {
    Project.insertMany(req.body, (error, data) => {
      if (error) {
        next(error);
        return;
      }
      res.json(data);
    });
  }

  public updateProject(req: Request, res: Response, next: NextFunction) {
    Project.findOneAndUpdate(
      { _id: req.params.projectid },
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

  public removeProject(req: Request, res: Response, next: NextFunction) {
    Project.remove({ _id: req.params.projectid }, (error, data) => {
      if (error) {
        next(error);
        return;
      }
      res.json({ message: "Successfully removed faculty member." });
    });
  }
}
