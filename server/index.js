const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const serviceAccountEnv = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountEnv) {
  throw new Error(
    'Missing required Firebase credentials. Set FIREBASE_SERVICE_ACCOUNT_KEY in the environment.',
  );
}

let serviceAccount;

try {
  const rawJson = serviceAccountEnv.trim().startsWith('{')
    ? serviceAccountEnv
    : Buffer.from(serviceAccountEnv, 'base64').toString('utf8');

  serviceAccount = JSON.parse(rawJson);
} catch (error) {
  throw new Error(
    `Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY. Ensure it contains valid JSON. ${(error && error.message) || error}`,
  );
}

if (serviceAccount.private_key) {
  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID || serviceAccount.project_id,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL || serviceAccount.client_email,
      privateKey: process.env.FIREBASE_PRIVATE_KEY
        ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
        : serviceAccount.private_key,
    }),
  });
}

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
