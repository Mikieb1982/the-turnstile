import { randomUUID } from 'node:crypto';

export type DevOpsJobType = 'generateCode' | 'generateFeature' | 'deploy';
export type DevOpsJobStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface DevOpsJob<Request = unknown, Result = unknown> {
  id: string;
  type: DevOpsJobType;
  status: DevOpsJobStatus;
  request: Request;
  result?: Result;
  error?: string;
  createdAt: string;
  updatedAt: string;
  metadata?: Record<string, unknown>;
}

class InMemoryJobStore {
  private jobs = new Map<string, DevOpsJob>();

  create<Request>(type: DevOpsJobType, request: Request, metadata?: Record<string, unknown>): DevOpsJob<Request> {
    const id = randomUUID();
    const timestamp = new Date().toISOString();
    const job: DevOpsJob<Request> = {
      id,
      type,
      status: 'processing',
      request,
      createdAt: timestamp,
      updatedAt: timestamp,
      metadata
    };
    this.jobs.set(id, job);
    return job;
  }

  update(id: string, updates: Partial<DevOpsJob>): DevOpsJob {
    const existing = this.jobs.get(id);
    if (!existing) {
      throw new Error(`Job with id ${id} was not found`);
    }

    const updated: DevOpsJob = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.jobs.set(id, updated);
    return updated;
  }

  get(id: string): DevOpsJob | undefined {
    return this.jobs.get(id);
  }

  list(): DevOpsJob[] {
    return Array.from(this.jobs.values()).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }
}

export const jobStore = new InMemoryJobStore();
