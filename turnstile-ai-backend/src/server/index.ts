import { serve } from '@hono/node-server';
import { OpenAPIHono } from '@hono/zod-openapi';
import { cors } from 'hono/cors';
import { FlowsService } from '@modelfusion/hono-flows';
import { dispatcher } from '../flows/dispatcher';

const { ...rest } = new FlowsService({
    flows: [dispatcher],
});

const app = new OpenAPIHono();

app.use('/*', cors());

app.doc('/openapi.json', {
    openapi: '3.0.0',
    info: {
        title: 'Turnstile AI API',
        version: 'v1alpha',
    },
});

app.route('/', rest);

const port = 3001;
console.log(`Server is running on port ${port}`);

serve({
    fetch: app.fetch,
    port
});
