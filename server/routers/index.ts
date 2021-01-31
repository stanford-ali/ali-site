import {Router} from "express";
import userRouter from "./users.router";
import projectRouter from "./projects.router";
import applicationRouter from "./applications.router";

let backendRouter: Router = Router()
backendRouter.use("/users", userRouter);
backendRouter.use("/projects", projectRouter);
backendRouter.use("/applications", applicationRouter);

export default backendRouter;
