import { Router, Request, Response } from "express";
import { useDrizzleORM } from "../postgresql/index";
import { controlPanelSwitches, environment } from "../postgresql/myBoat";
import { desc, eq, sql } from "drizzle-orm";
import { validateTake } from "./utils";

const controller = Router();

var resetBilgeStatus = false;

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

controller.get("/switches", async (req: Request, res: Response) => {
  try {
    const result = await useDrizzleORM()
      .select({
        id: controlPanelSwitches.switchId,
        name: controlPanelSwitches.name,
        state: controlPanelSwitches.state,
      })
      .from(controlPanelSwitches)
      .orderBy(desc(controlPanelSwitches.switchId))

    if (result.length === 0) {
      return res.status(404).send("No records found");
    }

    res.status(200).send(result);
  } catch {
    res
      .status(500)
      .send("somthing went wrong, couldn't fetch data from /controlPanel");
  }
});

controller.put("/switch", async (req: Request, res: Response) => {
  try {
    const result = await useDrizzleORM()
      .update(controlPanelSwitches)
      .set({state: req.body.state, synced: false})
      .where(eq(controlPanelSwitches.switchId, req.body.id))
      .returning({
        name: controlPanelSwitches.name,
        state: controlPanelSwitches.state,
      });
    if (result.length === 0) {
      return res.status(404).send("No records found");
    }
    res.status(200).send("ok");
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong, couldn't update bilgeStatus");
  }
});

controller.get("/unSyncSwitches", async (req: Request, res: Response) => {
  try {
    const result = await useDrizzleORM()
      .select({
        id: controlPanelSwitches.switchId,
        name: controlPanelSwitches.name,
        state: controlPanelSwitches.state,
      })
      .from(controlPanelSwitches)
      .where(eq(controlPanelSwitches.synced, false))
      .orderBy(desc(controlPanelSwitches.switchId))

    if (result.length === 0) {
      return res.status(404).send("No records found");
    }
    
    for (let i = 0; i < result.length; i++) {
      await useDrizzleORM()
        .update(controlPanelSwitches)
        .set({synced: true})
        .where(eq(controlPanelSwitches.switchId, result[i].id)) 
    }

    res.status(200).send(result);
  } catch {
    res
      .status(500)
      .send("somthing went wrong, couldn't fetch data from /controlPanel");
  }
});

controller.put("/unSyncSwitches", async (req: Request, res: Response) => {
  try {
    const switches = req.body;
    if(!Array.isArray(switches)){
      return res.status(400).send("bad request: should be a array of switches");
    }

    for (let i = 0; i < switches.length; i++) {
      const result = await useDrizzleORM()
      .update(controlPanelSwitches)
      .set({state: switches[i].state, synced: true})
      .where(eq(controlPanelSwitches.switchId, switches[i].id))
      .returning({
        name: controlPanelSwitches.name,
        state: controlPanelSwitches.state,
      });
      if (result.length === 0) {
        await useDrizzleORM().insert(controlPanelSwitches).values({
          name: switches[i].name,
          state: switches[i].state,
          switchId: switches[i].id,
        });
      }
    }

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
