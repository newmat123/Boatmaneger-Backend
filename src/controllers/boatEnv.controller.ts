import { Router, Request, Response } from "express";
import { useDrizzleORM } from "../postgresql/index";
import { environment } from "../postgresql/boatEnv";
import { desc } from "drizzle-orm";
import { validateTake } from "./utils";

const controller = Router();

controller.post("/environment", async (req: Request, res: Response) => {
  await useDrizzleORM().insert(environment).values({
    temperature: req.body.temperature,
    heat: req.body.heat,
    humidity: req.body.humidity,
    bilgeStatus: req.body.bilgeStatus,
  });
  res.status(201).send("new temp inserted");
});

controller.get("/environment", async (req: Request, res: Response) => {
  const take = validateTake(req);
  const result = await useDrizzleORM()
    .select()
    .from(environment)
    .orderBy(desc(environment.id))
    .limit(take);
  res.status(201).send(result);
});

controller.get("/temperature", async (req: Request, res: Response) => {
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
});

controller.get("/heat", async (req: Request, res: Response) => {
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
});

controller.get("/humidity", async (req: Request, res: Response) => {
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
});

controller.get("/bilgeStatus", async (req: Request, res: Response) => {
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
});

export default controller;
