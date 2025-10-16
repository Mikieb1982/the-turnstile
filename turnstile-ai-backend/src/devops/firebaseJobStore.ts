import { getFirestore } from 'firebase-admin/firestore';
import { randomUUID } from 'node:crypto';
import type { DevOpsJob, DevOpsJobType } from './jobStore.js';

export class FirestoreJobStore {
  private db = getFirestore();
  private collection = this.db.collection('devops-jobs');
  private cache = new Map<string, DevOpsJob>();

  async create<Request>(
    type: DevOpsJobType,
    request: Request,
    metadata?: Record<string, unknown>
  ): Promise<DevOpsJob<Request>> {
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

    await this.collection.doc(id).set(job);
    this.cache.set(id, job);
    return job;
  }

  async update(id: string, updates: Partial<DevOpsJob>): Promise<DevOpsJob> {
    const existing = await this.get(id);
    if (!existing) {
      throw new Error(`Job with id ${id} was not found`);
    }

    const updated: DevOpsJob = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await this.collection.doc(id).update(updates);
    this.cache.set(id, updated);
    return updated;
  }

  async get(id: string): Promise<DevOpsJob | undefined> {
    // Check cache first
    if (this.cache.has(id)) {
      return this.cache.get(id);
    }

    const doc = await this.collection.doc(id).get();
    if (!doc.exists) {
      return undefined;
    }

    const job = doc.data() as DevOpsJob;
    this.cache.set(id, job);
    return job;
  }

  async list(limit = 50): Promise<DevOpsJob[]> {
    const snapshot = await this.collection
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .get();

    return snapshot.docs.map((doc) => doc.data() as DevOpsJob);
  }
}

export const firestoreJobStore = new FirestoreJobStore();
