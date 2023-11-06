import cors from 'cors';
import express, { Express } from 'express';

const securitySetup = (app: Express) =>
    app
        .use(cors())
        .use(express.json())

export default securitySetup;

// The security.ts file will be used to store any security-related things, such as CORS, secure headers, rate-limiters, etc.