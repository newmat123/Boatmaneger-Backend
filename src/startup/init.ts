import { Express } from "express";
import drizzleORMConnect from "../postgresql/index";

const appSetup = async (app: Express) => {
  try {
    await Promise.all([drizzleORMConnect()]);

    console.log("Databases connected successfully!");
    const port = Number(process.env.PORT) || 3000;

    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error: unknown) {
    console.log("Unable to start the app!");
    console.error(error);
  }
};

export default appSetup;
