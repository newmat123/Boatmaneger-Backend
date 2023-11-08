import { Router, Request, Response } from "express";
import { useDrizzleORM } from "../../postgresql/index";
import { environment } from "../../postgresql/boatEnv";
import { desc } from "drizzle-orm";

const controller = Router();

controller.post("/environment", async (req: Request, res: Response) => {
  await useDrizzleORM().insert(environment).values({
    temperature: req.body.temperature,
    heat: req.body.heat,
    humidity: req.body.humidity,
    waterInBilge: req.body.waterInBilge,
  });
  res.status(201).send("new temp inserted");
});

controller.get("/environment", async (req: Request, res: Response) => {
  const isNum = (str: string) => {
    return /^\d+$/.test(str);
  };
  const take =
    typeof req.query.take === "string"
      ? isNum(req.query.take)
        ? +req.query.take
        : 10
      : 10;

  const result = await useDrizzleORM()
    .select()
    .from(environment)
    .orderBy(desc(environment.id))
    .limit(take);
  res.status(201).send(result);
});

export default controller;
