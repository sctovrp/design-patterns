import express, {Request, Response} from "express";
import app from "../index.js";
import User from "../controlers/users.js";

const userRouter = express.Router();

// health check
userRouter.get("/ping3", User.pong3);
userRouter.post("/ping4", User.pong4);

// CRUD basic 
userRouter.post("/create", User.create);
userRouter.get("/get", User.get);
userRouter.put("/update", User.update);
userRouter.patch("/patch", User.patch);
userRouter.delete("/delete", User.delete);

// compound user query
userRouter.get("/getusers", User.getUsers);

export default userRouter;

// class UserRouter {
//     public router = express.Router();
//     constructor() {
//         this.routes();
//     }

//     public routes() {
//         return this.router.get("/ping3", User.pong3);
//     }
// }

// export default new UserRouter();