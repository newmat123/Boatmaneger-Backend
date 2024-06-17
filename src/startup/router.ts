import { Express } from "express";
import drizzleEnvironmentRouter from "../controllers/myBoat.controller";

const routerSetup = (app: Express) =>
  app.use("/api", drizzleEnvironmentRouter);

export default routerSetup;
