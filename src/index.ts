import express, { Express } from "express";
import dotenv from "dotenv";
import appSetup from "./startup/init";
import routerSetup from "./startup/router";
import securitySetup from "./startup/security";

const app: Express = express();
dotenv.config();

void appSetup(app);
securitySetup(app, express);
routerSetup(app);
