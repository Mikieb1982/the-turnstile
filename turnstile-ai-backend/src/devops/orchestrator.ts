import { codeGeneratorAgent, codeReviewerAgent, deploymentManagerAgent, type CodeGenerationRequest, type CodeGenerationResult, type CodeReviewReport, type DeploymentRequest, type DeploymentResult } from './agents.js';
import { jobStore, type DevOpsJob } from './jobStore.js';

export interface GenerateCodeJobRequest extends Omit<CodeGenerationRequest, 'mode'> {
  mode?: CodeGenerationRequest['mode'];
}

export interface GenerateFeatureJobRequest extends Omit<CodeGenerationRequest, 'mode'> {
  featureName: string;
  acceptanceCriteria?: string[];
}

export interface DeploymentJobRequest extends DeploymentRequest {
  dryRun?: boolean;
}

export interface GenerateCodeJobResult {
  generation: CodeGenerationResult;
  review: CodeReviewReport;
}

export interface DeploymentJobResult {
  plan: DeploymentResult;
}

async function runGenerationPipeline<RequestType>(
  job: DevOpsJob<RequestType>,
  request: CodeGenerationRequest
): Promise<DevOpsJob<RequestType, GenerateCodeJobResult>> {
  try {
    const generation = await codeGeneratorAgent(request);
    const review = await codeReviewerAgent({
      files: generation.files,
      taskDescription: request.description
    });

    const final = jobStore.update(job.id, {
      status: 'completed',
      result: {
        generation,
        review
      }
    }) as DevOpsJob<RequestType, GenerateCodeJobResult>;

    return final;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    const failed = jobStore.update(job.id, {
      status: 'failed',
      error: message
    }) as DevOpsJob<RequestType, GenerateCodeJobResult>;
    throw Object.assign(new Error(message), { job: failed });
  }
}

export async function runGenerateCodeJob(
  request: GenerateCodeJobRequest
): Promise<DevOpsJob<GenerateCodeJobRequest, GenerateCodeJobResult>> {
  const job = jobStore.create('generateCode', request);
  return runGenerationPipeline(job, { ...request, mode: request.mode ?? 'component' });
}

export async function runGenerateFeatureJob(
  request: GenerateFeatureJobRequest
): Promise<DevOpsJob<GenerateFeatureJobRequest, GenerateCodeJobResult>> {
  const job = jobStore.create('generateFeature', request);
  const context = [
    `Feature name: ${request.featureName}`,
    request.acceptanceCriteria?.length
      ? `Acceptance criteria:\n- ${request.acceptanceCriteria.join('\n- ')}`
      : undefined,
    request.context
  ]
    .filter(Boolean)
    .join('\n\n');

  return runGenerationPipeline(job, {
    ...request,
    context,
    mode: 'feature'
  });
}

export async function runDeploymentJob(
  request: DeploymentJobRequest
): Promise<DevOpsJob<DeploymentJobRequest, DeploymentJobResult>> {
  const job = jobStore.create('deploy', request);
  try {
    const plan = await deploymentManagerAgent(request);
    const result = jobStore.update(job.id, {
      status: 'completed',
      result: { plan }
    }) as DevOpsJob<DeploymentJobRequest, DeploymentJobResult>;
    return result;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    const failed = jobStore.update(job.id, {
      status: 'failed',
      error: message
    }) as DevOpsJob<DeploymentJobRequest, DeploymentJobResult>;
    throw Object.assign(new Error(message), { job: failed });
  }
}

export function listJobs() {
  return jobStore.list();
}

export function getJob(jobId: string) {
  return jobStore.get(jobId);
}
