import * as express from "express";
import * as admin from "firebase-admin";
import { URL } from "url";
const userRoute = express.Router();
userRoute.use((req, res, next) => {
  // User authentication middleware
  const { token } = req.headers;
  // const { pathname } = new URL(req.url);
  // console.log("hello");
  admin
    .auth()
    .verifyIdToken(token as string)
    .then((decodedToken) => {
      // Check if user is authenticated in Firebase authentication
      admin
        .auth()
        .getUser(decodedToken.uid)
        .then((user) => {
          res.locals.userid = user.uid;
          next();
        })
        .catch(() => {
          res
            .status(400)
            .send("[oauth] the user with the ID does not exist in firebase");
        });
    })
    .catch((error) => {
      res.status(401).send("authentication failed");
    });

  // admin
  //   .auth()
  //   .verifyIdToken(token as string)
  //   .then((decodedToken) => {
  //     console.log(decodedToken.uid);
  //     res.locals.userid = decodedToken.uid;
  //     next();
  //   })
  //   .catch(() => {
  //     res.status(401).send("authentication failed");
  //   });
});

export default userRoute;
