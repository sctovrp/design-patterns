import admin from "firebase-admin";

const adminConfig: admin.ServiceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY
};

admin.initializeApp({
    credential: admin.credential.cert(adminConfig)
});

export const firestore = admin.firestore();