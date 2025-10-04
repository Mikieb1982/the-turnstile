const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const fs = require('fs');
const { z } = require('zod');

const { mockLeagueTable, mockMatches } = require('./mockData');
const clone = (value) => JSON.parse(JSON.stringify(value));
const getMockMatches = () => clone(mockMatches);
const getMockLeagueTable = () => clone(mockLeagueTable);

const app = express();

app.use(cors());
app.use(express.json());

const safeJsonParse = (value, description) => {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch (error) {
    console.warn(`Failed to parse ${description}:`, error.message);
    return null;
  }
};

let serviceAccountProjectId;

if (!admin.apps.length) {
  const serviceAccount = safeJsonParse(process.env.FIREBASE_SERVICE_ACCOUNT, 'FIREBASE_SERVICE_ACCOUNT');

  if (serviceAccount) {
    serviceAccountProjectId = serviceAccount.project_id;
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } else {
    admin.initializeApp();
  }
}

const db = admin.firestore();

const firebaseConfig = safeJsonParse(process.env.FIREBASE_CONFIG, 'FIREBASE_CONFIG');

const getProjectIdFromCredentialsFile = () => {
  const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

  if (!credentialsPath) {
    return null;
  }

  try {
    const fileContents = fs.readFileSync(credentialsPath, 'utf8');
    const parsed = JSON.parse(fileContents);

    return parsed.project_id || parsed.projectId || null;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`Failed to read GOOGLE_APPLICATION_CREDENTIALS: ${message}`);
    return null;
  }
};

const getProjectIdFromEnv = () =>
  serviceAccountProjectId ||
  firebaseConfig?.projectId ||
  firebaseConfig?.project_id ||
  process.env.GOOGLE_CLOUD_PROJECT ||
  process.env.GCLOUD_PROJECT ||
  getProjectIdFromCredentialsFile() ||
  admin.app().options.projectId;

const hasConfiguredProjectId = Boolean(process.env.FIRESTORE_EMULATOR_HOST || getProjectIdFromEnv());

if (!hasConfiguredProjectId) {
  console.warn(
    'Firestore project ID not detected from environment. Will attempt to query using application default credentials.'
  );
}

let firestoreAvailable = true;

const respondWithMockData = (res, collection, error) => {
  if (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`Falling back to mock ${collection} data: ${message}`);

    if (message.includes('Unable to detect a Project Id')) {
      firestoreAvailable = false;
    }
  } else {
    console.info(`Firestore not configured. Serving mock ${collection} data.`);
  }

  res.set('x-data-source', 'mock');
  const payload = collection === 'matches' ? getMockMatches() : getMockLeagueTable();
  res.status(200).json(payload);
};

const withFirestore = async (res, collectionName, handler, fallback) => {
  if (!firestoreAvailable) {
    return respondWithMockData(res, collectionName);
  }

  try {
    await handler();
  } catch (error) {
    fallback(error);
  }
};

const attendedMatchSchema = z.object({
  match: z.object({
    id: z
      .string({ required_error: 'match.id is required' })
      .trim()
      .min(1, 'match.id must be a non-empty string')
  })
});

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.get('/api/matches', async (req, res) => {
  await withFirestore(
    res,
    'matches',
    async () => {
      const snapshot = await db.collection('matches').get();
      const matches = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      res.set('x-data-source', 'firestore');
      res.json(matches);
    },
    (error) => respondWithMockData(res, 'matches', error)
  );
});

app.get('/api/league-table', async (req, res) => {
  await withFirestore(
    res,
    'league table',
    async () => {
      const snapshot = await db.collection('leagueTable').get();
      const leagueTable = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      res.set('x-data-source', 'firestore');
      res.json(leagueTable);
    },
    (error) => respondWithMockData(res, 'league table', error)
  );
});

app.get('/api/users/:userId/profile', async (req, res) => {
  if (!firestoreAvailable) {
    return res.status(503).json({ error: 'Firestore is not configured' });
  }

  const { userId } = req.params;

  try {
    const userDoc = await db.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ id: userDoc.id, ...userDoc.data() });
  } catch (error) {
    console.error(`Error fetching profile for user ${userId}:`, error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

app.post('/api/users/:userId/attended-matches', async (req, res) => {
  if (!firestoreAvailable) {
    return res.status(503).json({ error: 'Firestore is not configured' });
  }

  const { userId } = req.params;
  const result = attendedMatchSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: 'Invalid request body',
      details: result.error.issues.map((issue) => ({
        message: issue.message,
        path: issue.path
      }))
    });
  }

  const {
    match: { id: matchId }
  } = result.data;

  try {
    const userRef = db.collection('users').doc(userId);

    await userRef.set(
      {
        attendedMatches: admin.firestore.FieldValue.arrayUnion(matchId)
      },
      { merge: true }
    );

    res.status(200).json({ matchId });
  } catch (error) {
    console.error(`Error updating attended matches for user ${userId}:`, error);
    res.status(500).json({ error: 'Failed to update attended matches' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
