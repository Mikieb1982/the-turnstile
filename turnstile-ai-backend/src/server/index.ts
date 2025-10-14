import express from 'express';
import cors from 'cors';
import { z } from 'zod';

import { dispatcherFlow } from '../flows/dispatcher.js';
import { codeGeneratorFlow } from '../flows/codeGenerator.js';
import { WorkOrderSchema } from '../flows/schemas.js';

const commandSchema = z.object({
  command: z.string()
});

const app = express();
const PORT = Number(process.env.PORT ?? 3001);

app.use(cors());
app.use(express.json());

app.get('/health', (_, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/dispatch', async (req, res) => {
  try {
    const { command } = commandSchema.parse(req.body);
    const trimmedCommand = command.trim();

    if (!trimmedCommand.length) {
      return res.status(400).json({ error: 'Command must not be empty.' });
    }

    const workOrder = await dispatcherFlow(trimmedCommand);
    const validatedWorkOrder = WorkOrderSchema.parse(workOrder);

    const generationResult = await codeGeneratorFlow(validatedWorkOrder.details);

    res.json({
      workOrder: validatedWorkOrder,
      result: generationResult
    });
  } catch (error) {
    console.error('Failed to process command:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.message, issues: error.issues });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

export function startServer() {
  app.listen(PORT, () => {
    console.log(`Turnstile AI backend running on port ${PORT}`);
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  startServer();
}
