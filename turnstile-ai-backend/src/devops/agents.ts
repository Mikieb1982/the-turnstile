import { z } from 'zod';
import { ai } from '../genkit.conf.js';

const DEFAULT_MODEL = (process.env.GOOGLE_MODEL_ID ?? 'googleai/gemini-2.5-pro');

function safeJsonParse<T>(value: string, fallback: T): T {
  try {
    const cleaned = value.trim().replace(/^```json\n?|```$/g, '');
    return JSON.parse(cleaned) as T;
  } catch (error) {
    console.warn('Failed to parse JSON output from model:', error);
    return fallback;
  }
}

export const GeneratedFileSchema = z.object({
  path: z.string(),
  description: z.string(),
  content: z.string()
});

export type GeneratedFile = z.infer<typeof GeneratedFileSchema>;

export const CodeGenerationResultSchema = z.object({
  summary: z.string(),
  files: z.array(GeneratedFileSchema)
});

export type CodeGenerationResult = z.infer<typeof CodeGenerationResultSchema>;

export interface CodeGenerationRequest {
  mode: 'component' | 'feature';
  description: string;
  context?: string;
  targets?: string[];
}

export async function codeGeneratorAgent(request: CodeGenerationRequest): Promise<CodeGenerationResult> {
  const { description, context, targets, mode } = request;
  const prompt = [
    'You are CodeGeneratorAgent, a senior TypeScript engineer building Firebase-backed Express APIs for The Turnstile.',
    'Generate production-ready code using modern Node.js, Express, and Firestore patterns.',
    'Always respond with minified JSON containing {"summary": string, "files": Array<{"path": string, "description": string, "content": string}>}.',
    'All file content must be valid UTF-8 text. Never escape newlines; return the raw file content.',
    'Prefer TypeScript with ES modules. Include Jest tests when relevant.',
    `Task classification: ${mode}.`,
    `Task description: ${description}.`,
    targets?.length ? `Requested targets: ${targets.join(', ')}.` : undefined,
    context ? `Additional context: ${context}.` : undefined,
    'If the request references REST endpoints, include Express route handlers, validation middleware, and Firestore integration stubs.',
    'For feature generation return at least three files (model/schema, route/controller, and tests).'
  ]
    .filter(Boolean)
    .join('\n\n');

  const res = await ai.generate({
    model: DEFAULT_MODEL,
    prompt,
    config: { temperature: 0.2 }
  });

  const parsed = safeJsonParse(res.text ?? '', { summary: 'Model response missing.', files: [] });
  const result = CodeGenerationResultSchema.safeParse(parsed);
  if (!result.success) {
    throw new Error(`Model returned invalid generation payload: ${result.error.message}`);
  }
  return result.data;
}

export const CodeReviewReportSchema = z.object({
  status: z.enum(['approved', 'changes_requested']),
  summary: z.string(),
  checklist: z.array(z.string()),
  findings: z.array(
    z.object({
      title: z.string(),
      severity: z.enum(['info', 'warning', 'error']),
      detail: z.string()
    })
  )
});

export type CodeReviewReport = z.infer<typeof CodeReviewReportSchema>;

export interface CodeReviewRequest {
  files: GeneratedFile[];
  taskDescription: string;
}

export async function codeReviewerAgent(request: CodeReviewRequest): Promise<CodeReviewReport> {
  const prompt = [
    'You are CodeReviewerAgent, an automated reviewer for The Turnstile.',
    'Evaluate the provided files for correctness, security, style compliance, and test completeness.',
    'Respond strictly as compact JSON matching schema {"status":"approved"|"changes_requested","summary":string,"checklist":string[],"findings":[{"title":string,"severity":"info"|"warning"|"error","detail":string}]}.',
    'If issues are found, set status to "changes_requested" and describe them precisely with actionable guidance.',
    'If the submission is acceptable, set status to "approved" and note any optional improvements.',
    `Task: ${request.taskDescription}`,
    'Files:',
    ...request.files.map((file) => `- ${file.path}:\n${file.content}`)
  ].join('\n\n');

  const res = await ai.generate({
    model: DEFAULT_MODEL,
    prompt,
    config: { temperature: 0 }
  });

  const parsed = safeJsonParse(res.text ?? '', {
    status: 'changes_requested',
    summary: 'Model did not return structured review output.',
    checklist: [],
    findings: [
      {
        title: 'Review error',
        severity: 'error',
        detail: 'Unable to parse reviewer response.'
      }
    ]
  });

  const result = CodeReviewReportSchema.safeParse(parsed);
  if (!result.success) {
    throw new Error(`Model returned invalid review payload: ${result.error.message}`);
  }
  return result.data;
}

export const DeploymentResultSchema = z.object({
  status: z.enum(['scheduled', 'completed', 'failed']),
  summary: z.string(),
  steps: z.array(z.string())
});

export type DeploymentResult = z.infer<typeof DeploymentResultSchema>;

export interface DeploymentRequest {
  target: string;
  environment: string;
  notes?: string;
}

export async function deploymentManagerAgent(request: DeploymentRequest): Promise<DeploymentResult> {
  const prompt = [
    'You are DeploymentManagerAgent executing Firebase deployment tasks for The Turnstile.',
    'Generate a concise deployment plan including Firebase CLI commands and validation steps.',
    'Respond strictly as JSON matching {"status":"scheduled"|"completed"|"failed","summary":string,"steps":string[]}.',
    'Do not run commands; only outline them.',
    `Target: ${request.target}.`,
    `Environment: ${request.environment}.`,
    request.notes ? `Additional notes: ${request.notes}` : undefined
  ]
    .filter(Boolean)
    .join('\n');

  const res = await ai.generate({
    model: DEFAULT_MODEL,
    prompt,
    config: { temperature: 0.1 }
  });

  const parsed = safeJsonParse(res.text ?? '', {
    status: 'scheduled',
    summary: 'Model did not produce structured deployment output.',
    steps: []
  });

  const result = DeploymentResultSchema.safeParse(parsed);
  if (!result.success) {
    throw new Error(`Model returned invalid deployment payload: ${result.error.message}`);
  }
  return result.data;
}
