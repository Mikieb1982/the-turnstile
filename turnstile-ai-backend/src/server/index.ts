import express from 'express';
import cors from 'cors';
import { z } from 'zod';
import admin from 'firebase-admin';

import {
  getJob,
  listJobs,
  runDeploymentJob,
  runGenerateCodeJob,
  runGenerateFeatureJob,
  type DeploymentJobRequest,
  type GenerateCodeJobRequest,
  type GenerateFeatureJobRequest
} from '../devops/orchestrator.js';
import { jobStore } from '../devops/jobStore.js';

// Initialize Firebase Admin if using Firestore
if (process.env.USE_FIRESTORE === 'true') {
  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

  if (serviceAccountPath) {
    // Use service account file
    const serviceAccount = await import(serviceAccountPath, {
      assert: { type: 'json' }
    });

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount.default)
    });
  } else {
    // Use Application Default Credentials (for Cloud Run, etc.)
    admin.initializeApp({
      credential: admin.credential.applicationDefault()
    });
  }

  console.log('Firebase Admin initialized with Firestore support');
}

const app = express();
const PORT = Number(process.env.PORT ?? 3001);

app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.get('/health', (_, res) => {
  res.json({ status: 'ok' });
});

// ... existing endpoints ...

// New: Get job statistics
app.get('/api/devops/stats', async (_, res) => {
  try {
    if ('getStats' in jobStore && typeof jobStore.getStats === 'function') {
      const stats = await jobStore.getStats();
      res.json(stats);
    } else {
      // Fallback for in-memory store
      const jobs = listJobs();
      const stats = {
        total: jobs.length,
        byType: {} as Record<string, number>,
        byStatus: {} as Record<string, number>
      };

      jobs.forEach((job) => {
        stats.byType[job.type] = (stats.byType[job.type] ?? 0) + 1;
        stats.byStatus[job.status] = (stats.byStatus[job.status] ?? 0) + 1;
      });

      res.json(stats);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    res.status(500).json({ error: message });
  }
});

// New: Cleanup old jobs
app.post('/api/devops/cleanup', async (req, res) => {
  try {
    const { olderThanDays = 30 } = req.body;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - olderThanDays);

    if ('cleanup' in jobStore && typeof jobStore.cleanup === 'function') {
      const deleted = await jobStore.cleanup(cutoffDate);
      res.json({ deleted, cutoffDate: cutoffDate.toISOString() });
    } else {
      res.status(501).json({ error: 'Cleanup not supported with in-memory store' });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    res.status(500).json({ error: message });
  }
});

// New: List jobs with filtering
app.get('/api/devops/jobs', async (req, res) => {
  try {
    const { type, status, limit, startAfter } = req.query;

    if ('list' in jobStore && typeof jobStore.list === 'function') {
      const jobs = await jobStore.list({
        type: type as string | undefined,
        status: status as string | undefined,
        limit: limit ? Number(limit) : undefined,
        startAfter: startAfter as string | undefined
      });
      res.json(jobs);
    } else {
      // Fallback for in-memory store
      res.json(listJobs());
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    res.status(500).json({ error: message });
  }
});

export function startServer() {
  app.listen(PORT, () => {
    console.log(`Turnstile AI backend running on port ${PORT}`);
    console.log(`Job store: ${process.env.USE_FIRESTORE === 'true' ? 'Firestore' : 'In-Memory'}`);
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  startServer();
}
