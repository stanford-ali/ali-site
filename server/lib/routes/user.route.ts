import * as admin from "firebase-admin";
import { Request, Response, NextFunction } from "express";

let userRoute = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.headers;
  admin
    .auth()
    .verifyIdToken(token as string)
    .then((decodedToken) => {
      // Check if user is authenticated in Firebase authentication
      admin
        .auth()
        .getUser(decodedToken.uid)
        .then((user) => {
          // check that the request and firebase IDs are the same
          if (req.params.user_id !== undefined && req.params.user_id !== user.uid) {
            res.status(401).send("The user in the header does not have access to the user passed in the request parameters.")
          } else {
            res.locals.userid = user.uid;
            next();
          }
        })
        .catch(() => {
          res.status(400).send("[oauth] The user with that ID does not exist.");
        });
    })
    .catch((error) => {
      res.status(401).send("Authentication failed.");
    });
};

export default userRoute;
