import * as express from "express";

const adminRoute = express.Router();
adminRoute.use((req, res, next) => {
  // middleware here
});

export default adminRoute;
