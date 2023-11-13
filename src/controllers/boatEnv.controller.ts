import { Router, Request, Response } from "express";
import { useDrizzleORM } from "../postgresql/index";
import { environment } from "../postgresql/boatEnv";
import { desc } from "drizzle-orm";
import { validateTake } from "./utils";

const controller = Router();

controller.post("/environment", async (req: Request, res: Response) => {
  try {
    var date = undefined;
    if (typeof req.body.timestamp === "string") {
      date = new Date(req.body.timestamp);
    }
    await useDrizzleORM().insert(environment).values({
      temperature: req.body.temperature,
      heat: req.body.heat,
      humidity: req.body.humidity,
      bilgeStatus: req.body.bilgeStatus,
      timestamp: date,
    });
    res.status(201).send("new temp inserted");
  } catch {
    res
      .status(400)
      .send(
        "somthing went wrong, is the timestamp in this format: YYYY-MM-DDTHH:mm:ss.sssZ?"
      );
  }
});

controller.get("/environment", async (req: Request, res: Response) => {
  try {
    const take = validateTake(req);
    const result = await useDrizzleORM()
      .select()
      .from(environment)
      .orderBy(desc(environment.id))
      .limit(take);
    res.status(201).send(result);
  } catch {
    res
      .status(401)
      .send("somthing went wrong, couldn't fetch data from /environment");
  }
});

controller.get("/temperature", async (req: Request, res: Response) => {
  try {
    const take = validateTake(req);
    const result = await useDrizzleORM()
      .select({
        // id: environment.id,
        temperature: environment.temperature,
        timestamp: environment.timestamp,
      })
      .from(environment)
      .orderBy(desc(environment.id))
      .limit(take);
    res.status(201).send(result);
  } catch {
    res
      .status(402)
      .send("somthing went wrong, couldn't fetch data from /temperature");
  }
});

controller.get("/heat", async (req: Request, res: Response) => {
  try {
    const take = validateTake(req);
    const result = await useDrizzleORM()
      .select({
        // id: environment.id,
        heat: environment.heat,
        timestamp: environment.timestamp,
      })
      .from(environment)
      .orderBy(desc(environment.id))
      .limit(take);
    res.status(201).send(result);
  } catch {
    res.status(403).send("somthing went wrong, couldn't fetch data from /heat");
  }
});

controller.get("/humidity", async (req: Request, res: Response) => {
  try {
    const take = validateTake(req);
    const result = await useDrizzleORM()
      .select({
        // id: environment.id,
        humidity: environment.humidity,
        timestamp: environment.timestamp,
      })
      .from(environment)
      .orderBy(desc(environment.id))
      .limit(take);
    res.status(201).send(result);
  } catch {
    res
      .status(404)
      .send("somthing went wrong, couldn't fetch data from /humidity");
  }
});

controller.get("/bilgeStatus", async (req: Request, res: Response) => {
  try {
    const take = validateTake(req);
    const result = await useDrizzleORM()
      .select({
        // id: environment.id,
        bilgeStatus: environment.bilgeStatus,
        timestamp: environment.timestamp,
      })
      .from(environment)
      .orderBy(desc(environment.id))
      .limit(take);
    res.status(201).send(result);
  } catch {
    res
      .status(405)
      .send("somthing went wrong, couldn't fetch data from /bilgeStatus");
  }
});

export default controller;
