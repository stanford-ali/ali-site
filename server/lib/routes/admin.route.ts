import { Request, Response, NextFunction } from "express";
import User from "../models/users.model";

let adminRoute = (req: Request, res: Response, next: NextFunction) => {
  // check if the user is an admin of the site
  User.find({uid: res.locals.userid}, (error, data) => {
    if (data[0].admin !== true) {
      res.status(401).send("The user with that ID does not have the proper credentials.");
    } else {
      next();
    }
  });
};

export default adminRoute;
