const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const { z } = require('zod');

const app = express();

app.use(cors());
app.use(express.json());

if (!admin.apps.length) {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } else {
    admin.initializeApp();
  }
}

const db = admin.firestore();

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
  try {
    const snapshot = await db.collection('matches').get();
    const matches = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(matches);
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

app.get('/api/league-table', async (req, res) => {
  try {
    const snapshot = await db.collection('leagueTable').get();
    const leagueTable = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(leagueTable);
  } catch (error) {
    console.error('Error fetching league table:', error);
    res.status(500).json({ error: 'Failed to fetch league table' });
  }
});

app.get('/api/users/:userId/profile', async (req, res) => {
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
