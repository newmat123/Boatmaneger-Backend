import dotenv from 'dotenv';
import { Express } from 'express';

const appSetup = (app: Express) => {
    // set database connections

    dotenv.config();
    const port = process.env.PORT;

    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });

};

export default appSetup;
