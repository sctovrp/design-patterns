import { Request, Response } from "express";
import { firestore } from "../client/init.js";

class User {
    async pong3 (_req: Request, res: Response) {
        res.send("pong3");
    }

    async create (req: Request, res: Response) {
        try {
            const { id, username } = req.body;

            const firestoreRef = firestore.collection("users").doc(id);
            const addUser = await firestoreRef.set({ id, username }, { merge: true });

            res.send(addUser);
        } catch (error) {
            console.log(error);
        }
        
    }

    async get (req: Request, res: Response) {
        try {
            const { id } = req.body;

            const firestoreRef = firestore.collection("users").doc(id);
            const getUser = await firestoreRef.get();

            res.send(getUser.data());
        } catch (error) {
            console.log(error);
        }
    }

    async update (req: Request, res: Response) {
        try {
            const { id, username } = req.body;

            const firestoreRef = firestore.collection("users").doc(id);
            const updateUser = await firestoreRef.set({ id, username });

            res.send(updateUser);
        } catch (error) {
            console.log(error);
        }
    }

    async patch (req: Request, res: Response) {
        try {

            // we really need to implement validation here
            const { id, username } = req.body;
            console.log(id, username)

            let userId: string = "";
            let userUsername: string = "";

            if (id != undefined) { userId = id } ;
            if (username != undefined) { userUsername = username };

            const firestoreRef = firestore.collection("users").doc(id);
            const patchUser = await firestoreRef.set({ id: userId, username: userUsername }, { merge: true });

            res.send(patchUser);
        } catch (error) {
            console.log(error);
        }
    }

    async delete (req: Request, res: Response) {
        try {
            const { id } = req.body;
            const firestoreRef = firestore.collection("users").doc(id);
            const deleteUser = await firestoreRef.delete();
            res.send(deleteUser);
        } catch (error) {
            console.log(error);
        }
    }
}

type user ={
    id: string,
    username: string
}

export default new User();