import express, { Express, Response } from "express";
import 'dotenv/config';

import UserRouter from "./routes/user.js";

const app: Express = express();

app.use(express.json());

app.use("/user", UserRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

export default app;