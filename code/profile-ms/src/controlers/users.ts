import { Request, Response } from "express";
import { firestore } from "../client/init.js";
import { UserDto, validate } from "./dto/user.dto.js";

class User {
    async pong3 (_req: Request, res: Response) {
        res.send("pong3");
    }

    async pong4 (req: Request, res: Response) {
        try {
            const user:UserDto = req.body;

            validate(user);
            
            res.send(user);
        } catch (error) {
            res.status(400).send(error.message);
            return;
        }
    }

    async create (req: Request, res: Response) {
        try {
            const user: UserDto = req.body;

            validate(user);

            const firestoreRef = firestore.collection("users").doc(user.id);
            const addUser = await firestoreRef.set( user, { merge: true });

            res.send(addUser);
        } catch (error) {
            res.status(400).send(error.message);
            return;
        }
        
    }

    async get (req: Request, res: Response) {
        try {
            const user: UserDto = req.body;

            validate(user);
            const firestoreRef = firestore.collection("users").doc(user.id);
            const getUser = await firestoreRef.get();

            res.send(getUser.data());
        } catch (error) {
            console.log(error);
        }
    }

    async update (req: Request, res: Response) {
        try {
            const user: UserDto = req.body;

            validate(user);

            const firestoreRef = firestore.collection("users").doc(user.id);
            const updateUser = await firestoreRef.set(user);

            res.send(updateUser);
        } catch (error) {
            console.log(error);
        }
    }

    async patch (req: Request, res: Response) {
        try {
            const user: UserDto = req.body;

            validate(user);

            const firestoreRef = firestore.collection("users").doc(user.id);
            const patchUser = await firestoreRef.set(user, { merge: true });

            res.send(patchUser);
        } catch (error) {
            console.log(error);
        }
    }

    async delete (req: Request, res: Response) {
        try {
            const user:UserDto = req.body;

            validate(user);

            const firestoreRef = firestore.collection("users").doc(user.id);
            const deleteUser = await firestoreRef.delete();
            res.send(deleteUser);
        } catch (error) {
            console.log(error);
        }
    }
}

export default new User();