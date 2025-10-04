import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

type ServiceAccountConfig = {
  projectId: string;
  clientEmail: string;
  privateKey: string;
};

const normalisePrivateKey = (key: string) => key.replace(/\\n/g, "\n");

const readServiceAccountConfig = (): ServiceAccountConfig => {
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (serviceAccountJson) {
    const parsed = JSON.parse(serviceAccountJson) as {
      project_id: string;
      client_email: string;
      private_key: string;
    };

    return {
      projectId: parsed.project_id,
      clientEmail: parsed.client_email,
      privateKey: parsed.private_key,
    };
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Firestore configuration is missing. Provide FIREBASE_SERVICE_ACCOUNT or FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY environment variables."
    );
  }

  return {
    projectId,
    clientEmail,
    privateKey,
  };
};

let firestoreInstance: Firestore | null = null;

export const getServerFirestore = (): Firestore => {
  if (firestoreInstance) {
    return firestoreInstance;
  }

  const apps = getApps();
  if (!apps.length) {
    const config = readServiceAccountConfig();
    initializeApp({
      credential: cert({
        projectId: config.projectId,
        clientEmail: config.clientEmail,
        privateKey: normalisePrivateKey(config.privateKey),
      }),
    });
  }

  firestoreInstance = getFirestore();
  return firestoreInstance;
};
