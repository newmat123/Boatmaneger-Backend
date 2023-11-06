import { Express, Request, Response } from 'express';

const routerSetup = (app: Express) =>
    app

        .get("/", async (req: Request, res: Response) => {
            res.send("hello world");
        })
        .get("/about", async (req: Request, res: Response) => {
            res.send("About route");
        });

export default routerSetup;