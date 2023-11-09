import { Express } from "express";
import drizzleEnvironmentRouter from "../controllers/boatEnv.controller";

const routerSetup = (app: Express) =>
  app.use("/api/boatEnv", drizzleEnvironmentRouter);

export default routerSetup;
