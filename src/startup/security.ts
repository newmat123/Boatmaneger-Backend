import cors from "cors";
import { Express } from "express";

const securitySetup = (app: Express, express: any) =>
  app.use(cors()).use(express.json());

export default securitySetup;

// The security.ts file will be used to store any security-related things, such as CORS, secure headers, rate-limiters, etc.
