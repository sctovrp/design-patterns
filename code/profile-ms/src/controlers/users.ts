import { Request, Response } from "express";
import { firestore } from "../client/init.js";
import { UserDto, validateUser, validateId, ParamsDto, validateParamsQuery, QueryDto, SearchParamsDto } from "./dto/user.dto.js";
import { OrderByDirection } from "firebase-admin/firestore";

class User {
    async pong3 (_req: Request, res: Response) {
        res.send("pong3");
    }

    async pong4 (req: Request, res: Response) {
        try {
            const user:UserDto = req.body;

            validateUser(user);
            
            res.send(user);
        } catch (error) {
            res.status(400).send(error.message);
            return;
        }
    }

    async create (req: Request, res: Response) {
        try {
            const user: UserDto = req.body;

            validateUser(user);

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
            
            const userId: string = req.query.id as string;

            validateId(userId); 
            const firestoreRef = firestore.collection("users").doc(userId);
            const getUser = await firestoreRef.get();

            res.send(getUser.data());
        } catch (error) {
            console.log(error);
        }
    }

    async update (req: Request, res: Response) {
        try {
            const user: UserDto = req.body;

            validateUser(user);

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

            validateUser(user);

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

            validateUser(user);

            const firestoreRef = firestore.collection("users").doc(user.id);
            const deleteUser = await firestoreRef.delete();
            res.send(deleteUser);
        } catch (error) {
            console.log(error);
        }
    }


    // compound query
    async getUsers (req: Request, res: Response) {
        try {
            let params: ParamsDto = (req.query as unknown) as ParamsDto;

            validateParamsQuery(params);

            let query: QueryDto = { 
                page: params.page, 
                limit: params.limit,
                orderBy: params.orderBy,
                order: params.order,
            }

            delete params["orderBy"];
            delete params["order"];
            delete params["page"];
            delete params["limit"];

            const firestoreRef = firestore.collection("users");
            let userQuery: FirebaseFirestore.Query;
            
            Object.keys(params).forEach((key) => {
                if (userQuery === undefined) userQuery = firestoreRef.where(key, '==', params[key]);
                userQuery = userQuery.where(key, '==', params[key]);
            });

            const userDocs = await userQuery.orderBy(query.orderBy, query.order as OrderByDirection).limit(Number(query.limit)).get();

            userDocs.forEach(docs => console.log(docs.data()))

            res.send(userDocs);
        } catch (error) {
            console.log(error);
        }
    }
}

export default new User();