import express, { Express } from 'express';
import appSetup from './startup/init';
import routerSetup from './startup/router';
import securitySetup from './startup/security';

const app: Express = express();

appSetup(app);
securitySetup(app);
routerSetup(app);