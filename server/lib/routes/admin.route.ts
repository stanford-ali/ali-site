import * as express from "express";
import * as admin from "firebase-admin";
import User from "../models/users.model";

const adminRoute = express.Router();
adminRoute.use((req, res, next) => {
  const { token } = req.headers;
  admin
    .auth()
    .verifyIdToken(token as string)
    .then(decodedToken => {
      // check that the user exists in firebase
      admin
        .auth()
        .getUser(decodedToken.uid)
        .then(user => {
          // check that the user is an admin of the site
          User.find({uid: user.uid}, (error, data) => {
            if (data.length !== 0 && data[0].admin !== true) {
              res.status(401).send("The user with that ID does not have the proper credentials.");
            } else {
              res.locals.userid = user.uid;
              next();
            }
          })
        })
        .catch(() => {
          res.status(400).send("[oauth] The user with that ID does not exist.");
        });
    })
    .catch((error) => {
      res.status(401).send("Authentication failed.");
    });
});

export default adminRoute;
