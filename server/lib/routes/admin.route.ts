import * as express from "express";
import * as admin from "firebase-admin";

const adminRoute = express.Router();
adminRoute.use((req, res, next) => {
    next()
});

export default adminRoute;
