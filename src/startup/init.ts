import { Express } from "express";
import drizzleORMConnect from "../postgresql/index";

const appSetup = async (app: Express) => {
  try {
    await Promise.all([drizzleORMConnect()]);

    console.log("Databases connected successfully!");
    const port = Number(process.env.PORT) || 3000;
    const ip = process.env.LOCAL_IP || "127.0.0.0";

    app.listen(port, ip, () => {
      console.log(`⚡️[server]: Server is running at http://${ip}:${port}`);
    });
  } catch (error: unknown) {
    console.log("Unable to start the app!");
    console.error(error);
  }
};

export default appSetup;
