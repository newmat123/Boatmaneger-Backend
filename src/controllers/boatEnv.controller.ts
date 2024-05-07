import { Router, Request, Response } from "express";
import { useDrizzleORM } from "../postgresql/index";
import { controlPanel, environment } from "../postgresql/boatEnv";
import { desc, sql } from "drizzle-orm";
import { validateTake } from "./utils";

const controller = Router();

var resetBilgeStatus = false;

// var controlPanel = {
//   light: false,
//   heater: false,
// };

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

    if (result.length === 0) {
      return res.status(404).send("No records found");
    }

    res.status(200).send(result);
  } catch {
    res
      .status(500)
      .send("somthing went wrong, couldn't fetch data from /environment");
  }
});

controller.get("/temperature", async (req: Request, res: Response) => {
  try {
    const take = validateTake(req);
    const result = await useDrizzleORM()
      .select({
        temperature: environment.temperature,
        timestamp: environment.timestamp,
      })
      .from(environment)
      .orderBy(desc(environment.id))
      .limit(take);

    if (result.length === 0) {
      return res.status(404).send("No records found");
    }

    res.status(200).send(result);
  } catch {
    res
      .status(500)
      .send("somthing went wrong, couldn't fetch data from /temperature");
  }
});

controller.get("/heat", async (req: Request, res: Response) => {
  try {
    const take = validateTake(req);
    const result = await useDrizzleORM()
      .select({
        heat: environment.heat,
        timestamp: environment.timestamp,
      })
      .from(environment)
      .orderBy(desc(environment.id))
      .limit(take);

    if (result.length === 0) {
      return res.status(404).send("No records found");
    }

    res.status(200).send(result);
  } catch {
    res.status(500).send("somthing went wrong, couldn't fetch data from /heat");
  }
});

controller.get("/humidity", async (req: Request, res: Response) => {
  try {
    const take = validateTake(req);
    const result = await useDrizzleORM()
      .select({
        humidity: environment.humidity,
        timestamp: environment.timestamp,
      })
      .from(environment)
      .orderBy(desc(environment.id))
      .limit(take);

    if (result.length === 0) {
      return res.status(404).send("No records found");
    }

    res.status(200).send(result);
  } catch {
    res
      .status(500)
      .send("somthing went wrong, couldn't fetch data from /humidity");
  }
});

controller.get("/bilgeStatus", async (req: Request, res: Response) => {
  try {
    const take = validateTake(req);
    const result = await useDrizzleORM()
      .select({
        bilgeStatus: environment.bilgeStatus,
        timestamp: environment.timestamp,
      })
      .from(environment)
      .orderBy(desc(environment.id))
      .limit(take);

    if (result.length === 0) {
      return res.status(404).send("No records found");
    }

    res.status(200).send(result);
  } catch {
    res
      .status(500)
      .send("somthing went wrong, couldn't fetch data from /bilgeStatus");
  }
});

controller.put("/resetBilgeStatus", async (req: Request, res: Response) => {
  try {
    const result = await useDrizzleORM()
      .update(environment)
      .set({ bilgeStatus: false })
      .where(sql`id=(SELECT max(id) FROM environment)`)
      .returning({
        bilgeStatus: environment.bilgeStatus,
        timestamp: environment.timestamp,
      });

    if (result.length === 0) {
      return res.status(404).send("No records found");
    }
    resetBilgeStatus = true;
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong, couldn't update bilgeStatus");
  }
});

controller.put("/controlPanel", async (req: Request, res: Response) => {
  try {
    console.log("req.body.data");
    console.log(req.body.data);

    const result = await useDrizzleORM()
      .update(controlPanel)
      .set(req.body.data)
      .where(sql`id=(SELECT max(id) FROM environment)`)
      .returning({
        light: controlPanel.light,
        heater: controlPanel.heater,
      });
    if (result.length === 0) {
      await useDrizzleORM().insert(environment).values(req.body.data);
      res.status(201).send("new control panel inserted");
    }
    // controlPanel = req.body.data;
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong, couldn't update bilgeStatus");
  }
});

controller.get("/tasks", async (req: Request, res: Response) => {
  try {
    const tasks = resetBilgeStatus;
    resetBilgeStatus = false;
    res.status(200).send(tasks);
  } catch {
    res
      .status(500)
      .send("somthing went wrong, couldn't fetch data from /bilgeStatus");
  }
});

export default controller;
