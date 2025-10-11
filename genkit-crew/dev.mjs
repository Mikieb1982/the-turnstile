import { METER_PROVIDER_CONFIG_TOKEN } from '@genkit-ai/core';
import { runInDev } from 'genkit/dev';

runInDev({
  // Point this to the file where your flows are defined.
  source: 'index.ts',
  // You can optionally configure OpenTelemetry providers here.
  // For now, we'll leave it simple.
  metricProvider: {
    name: 'noop',
    opts: {},
  },
  traceProvider: {
    name: 'noop',
    opts: {},
  },
});