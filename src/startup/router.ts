import { Express, Request, Response } from "express";
import drizzleEnvironmentRouter from "../controllers/drizzleorm/boatEnv.controller";

const routerSetup = (app: Express) =>
  app
    .get("/", async (req: Request, res: Response) => {
      res.send("hello world");
    })
    .get("/about", async (req: Request, res: Response) => {
      res.send("About route");
    })
    .use("/api/boatEnv", drizzleEnvironmentRouter);

export default routerSetup;
