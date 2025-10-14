import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import admin from 'firebase-admin';
import { runFlow } from 'genkit';
import { ai } from './genkit.conf';
import { dispatcherFlow } from '../tools/dispatcher';
import { codeGeneratorFlow } from '../tools/codeGenerator';

// Import service account (TypeScript way)
import * as serviceAccountJson from './serviceAccountKey.json';

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountJson as admin.ServiceAccount)
});

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Turnstile AI Backend is running' });
});

// Main endpoint to process commands
app.post('/api/command', async (req, res) => {
  try {
    const { command } = req.body;

    if (!command) {
      return res.status(400).json({ error: 'Command is required' });
    }

    // Step 1: Dispatch the command
    const workOrder = await runFlow(dispatcherFlow, command);

    let finalResult;
    
    // Step 2: If code generation is needed, generate it
    if (workOrder.details) {
      finalResult = await runFlow(codeGeneratorFlow, workOrder.details);
    } else {
      finalResult = workOrder;
    }

    res.json({ result: finalResult });
  } catch (error) {
    console.error('Error processing command:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});