import { Router, Request, Response } from "express";
import { useDrizzleORM } from "../../postgresql/index";
import { temperature } from "../../postgresql/boatEnv";

const controller = Router();

controller.post("/temperature", async (req: Request, res: Response) => {
  await useDrizzleORM().insert(temperature).values({
    value: req.body.value,
    // timestamp: req.body.timestamp,
  });
  res.status(201).send("new temp inserted");
});

export default controller;
