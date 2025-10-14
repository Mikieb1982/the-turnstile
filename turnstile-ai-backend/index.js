// Import necessary libraries
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// --- Firebase Setup ---
// This line was missing. Make sure it's here!
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// --- Express App Setup ---
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// --- API Endpoints ---

app.get('/', (req, res) => {
  res.send('The Turnstile AI backend is running! 🚀');
});

app.get('/api/matches', async (req, res) => {
  try {
    const matchesSnapshot = await db.collection('matches').get();
    const matches = matchesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(matches);
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).send('Error fetching matches');
  }
});

app.get('/api/league-table', async (req, res) => {
  try {
    const leagueTableSnapshot = await db.collection('leagueTable').get();
    const leagueTable = leagueTableSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(leagueTable);
  } catch (error) {
    console.error("Error fetching league table:", error);
    res.status(500).send('Error fetching league table');
  }
});


// --- Start the Server ---
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});