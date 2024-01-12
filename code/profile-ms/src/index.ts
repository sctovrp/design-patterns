import express, { Express } from "express";
import 'dotenv/config';
import qs from "qs";

import UserRouter from "./routes/user.js";

const app: Express = express();

app.use(express.json());

app.use("/user", UserRouter);

// app.settings("query parser", (str: string) => qs.parse(str, { comma: true }));

// http://localhost:3000/user/get?id=12345678
// http://localhost:3000/user?page=1&limit=10

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

export default app;