import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

type ServiceAccountConfig = {
  projectId: string;
  clientEmail: string;
  privateKey: string;
};

const normalisePrivateKey = (key: string) => key.replace(/\\n/g, "\n");

const parseServiceAccountConfig = (): ServiceAccountConfig | null => {
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (serviceAccountJson) {
    try {
      const parsed = JSON.parse(serviceAccountJson) as {
        project_id: string;
        client_email: string;
        private_key: string;
      };

      if (!parsed.project_id || !parsed.client_email || !parsed.private_key) {
        throw new Error("FIREBASE_SERVICE_ACCOUNT is missing required fields");
      }

      return {
        projectId: parsed.project_id,
        clientEmail: parsed.client_email,
        privateKey: parsed.private_key,
      };
    } catch (error) {
      console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT:", error);
      throw new Error("Invalid FIREBASE_SERVICE_ACCOUNT environment variable");
    }
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (projectId && clientEmail && privateKey) {
    return {
      projectId,
      clientEmail,
      privateKey,
    };
  }

  return null;
};

let firestoreInstance: Firestore | null = null;

const initialiseFirebaseAdmin = () => {
  if (getApps().length) {
    return;
  }

  const config = parseServiceAccountConfig();

  if (config) {
    initializeApp({
      credential: cert({
        projectId: config.projectId,
        clientEmail: config.clientEmail,
        privateKey: normalisePrivateKey(config.privateKey),
      }),
    });
  } else {
    // Fall back to the default credentials resolution strategy used by firebase-admin.
    initializeApp();
  }
};

export const getServerFirestore = (): Firestore => {
  if (firestoreInstance) {
    return firestoreInstance;
  }

  initialiseFirebaseAdmin();

  firestoreInstance = getFirestore();
  return firestoreInstance;
};
