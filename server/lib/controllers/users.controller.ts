import User from "../models/users.model";
import { Request, Response, NextFunction } from "express";

export default class UserController {
  public getUsers(req: Request, res: Response, next: NextFunction) {
    User.find({}, (error, data) => {
      if (error) {
        next(error);
        return;
      }
      res.json(data);
    });
  }

  public getUserByID(req: Request, res: Response, next: NextFunction) {
    User.find({ uid: req.params.user_id }, (error, data) => {
      if (error) {
        next(error);
        return;
      }
      res.json(data);
    });
  }

  public addUser(req: Request, res: Response, next: NextFunction) {
    User.create(
      {
        uid: req.params.user_id,
        ...req.body,
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

  public updateUser(req: Request, res: Response, next: NextFunction) {
    User.findOne(
      {
        uid: req.params.google_id,
      },
      (error, data) => {
        if (error) {
          next(error);
          return;
        }
        if (req.body._id) {
          delete req.body._id;
        }
        if (req.body.uid) {
          delete req.body.uid;
        }
        req.body.forEach((attr) => {
          if (attr !== "admin") {
            data[attr] = req.body[attr];
          }
        });
        data.save();
        res.json(data);
      }
    );
  }

  public removeUser(req: Request, res: Response, next: NextFunction) {
    User.remove(
      {
        uid: req.params.user_id,
      },
      (error, data) => {
        if (error) {
          next(error);
          return;
        }
        res.json({ message: "Successfully removed user." });
      }
    );
  }

  public followProject(req: Request, res: Response, next: NextFunction) {
    User.findOneAndUpdate(
      {
        uid: req.params.user_id,
      },
      {
        $push: {
          following: req.params.project_id,
        },
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

  public unfollowProject(req: Request, res: Response, next: NextFunction) {
    User.findOneAndUpdate(
      {
        uid: req.params.user_id,
      },
      {
        $pull: {
          following: req.params.project_id,
        },
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
