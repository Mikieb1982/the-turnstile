import express from 'express';
import cors from 'cors';
import { z } from 'zod';

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

const app = express();
const PORT = Number(process.env.PORT ?? 3001);

app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.get('/health', (_, res) => {
  res.json({ status: 'ok' });
});

const generateCodeSchema = z.object({
  description: z.string().min(1),
  context: z.string().optional(),
  targets: z.array(z.string()).optional()
});

app.post('/api/devops/generate-code', async (req, res) => {
  try {
    const payload = generateCodeSchema.parse(req.body);
    const job = await runGenerateCodeJob(payload as GenerateCodeJobRequest);
    res.status(201).json(job);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.message, issues: error.issues });
    }
    const message = error instanceof Error ? error.message : 'Internal server error';
    const job = (error as { job?: unknown }).job;
    res.status(500).json({ error: message, job });
  }
});

const generateFeatureSchema = z.object({
  featureName: z.string().min(1),
  description: z.string().min(1),
  acceptanceCriteria: z.array(z.string()).optional(),
  context: z.string().optional(),
  targets: z.array(z.string()).optional()
});

app.post('/api/devops/generate-feature', async (req, res) => {
  try {
    const payload = generateFeatureSchema.parse(req.body);
    const job = await runGenerateFeatureJob(payload as GenerateFeatureJobRequest);
    res.status(201).json(job);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.message, issues: error.issues });
    }
    const message = error instanceof Error ? error.message : 'Internal server error';
    const job = (error as { job?: unknown }).job;
    const statusCode = job ? 500 : 502;
    res.status(statusCode).json({ error: message, job });
  }
});

const deploymentSchema = z.object({
  target: z.string().min(1),
  environment: z.string().min(1),
  notes: z.string().optional(),
  dryRun: z.boolean().optional()
});

app.post('/api/devops/deploy', async (req, res) => {
  try {
    const payload = deploymentSchema.parse(req.body);
    const job = await runDeploymentJob(payload as DeploymentJobRequest);
    res.status(201).json(job);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.message, issues: error.issues });
    }
    const message = error instanceof Error ? error.message : 'Internal server error';
    const job = (error as { job?: unknown }).job;
    const statusCode = job ? 500 : 502;
    res.status(statusCode).json({ error: message, job });
  }
});

app.get('/api/devops/jobs', (_, res) => {
  res.json(listJobs());
});

app.get('/api/devops/jobs/:jobId', (req, res) => {
  const job = getJob(req.params.jobId);
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }
  res.json(job);
});

export function startServer() {
  app.listen(PORT, () => {
    console.log(`Turnstile AI backend running on port ${PORT}`);
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  startServer();
}
