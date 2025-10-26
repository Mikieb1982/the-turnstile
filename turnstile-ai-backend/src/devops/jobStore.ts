import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { randomUUID } from 'node:crypto';
import type { DevOpsJob, DevOpsJobType, DevOpsJobStatus } from './jobStore.js';

/**
 * Firestore-backed job store with in-memory caching.
 * Provides persistence across server restarts while maintaining fast reads.
 */
export class FirestoreJobStore {
  private db: Firestore;
  private collectionName = 'devops-jobs';
  private cache = new Map<string, DevOpsJob>();
  private cacheInitialized = false;

  constructor() {
    this.db = getFirestore();
  }

  /**
   * Initialize the cache by loading recent jobs from Firestore.
   * Called lazily on first use.
   */
  private async initializeCache(): Promise<void> {
    if (this.cacheInitialized) {
      return;
    }

    try {
      const snapshot = await this.db
        .collection(this.collectionName)
        .orderBy('createdAt', 'desc')
        .limit(100)
        .get();

      snapshot.docs.forEach((doc) => {
        const job = doc.data() as DevOpsJob;
        this.cache.set(job.id, job);
      });

      this.cacheInitialized = true;
      console.log(`Loaded ${this.cache.size} jobs into cache`);
    } catch (error) {
      console.error('Failed to initialize cache:', error);
      // Continue without cache - will fetch from Firestore as needed
      this.cacheInitialized = true;
    }
  }

  /**
   * Create a new job and persist it to Firestore.
   */
  async create<Request>(
    type: DevOpsJobType,
    request: Request,
    metadata?: Record<string, unknown>
  ): Promise<DevOpsJob<Request>> {
    await this.initializeCache();

    const id = randomUUID();
    const timestamp = new Date().toISOString();
    const job: DevOpsJob<Request> = {
      id,
      type,
      status: 'processing' as DevOpsJobStatus,
      request,
      createdAt: timestamp,
      updatedAt: timestamp,
      metadata
    };

    try {
      // Write to Firestore
      await this.db.collection(this.collectionName).doc(id).set(job);

      // Update cache
      this.cache.set(id, job as DevOpsJob);

      return job;
    } catch (error) {
      console.error('Failed to create job in Firestore:', error);
      throw new Error(`Failed to create job: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Update an existing job and persist changes to Firestore.
   */
  async update(id: string, updates: Partial<DevOpsJob>): Promise<DevOpsJob> {
    await this.initializeCache();

    const existing = await this.get(id);
    if (!existing) {
      throw new Error(`Job with id ${id} was not found`);
    }

    const updated: DevOpsJob = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    try {
      // Write to Firestore (only update changed fields)
      await this.db
        .collection(this.collectionName)
        .doc(id)
        .update({
          ...updates,
          updatedAt: updated.updatedAt
        });

      // Update cache
      this.cache.set(id, updated);

      return updated;
    } catch (error) {
      console.error('Failed to update job in Firestore:', error);
      throw new Error(`Failed to update job: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get a job by ID. Checks cache first, then Firestore if not found.
   */
  async get(id: string): Promise<DevOpsJob | undefined> {
    await this.initializeCache();

    // Check cache first
    if (this.cache.has(id)) {
      return this.cache.get(id);
    }

    try {
      // Fetch from Firestore
      const doc = await this.db.collection(this.collectionName).doc(id).get();

      if (!doc.exists) {
        return undefined;
      }

      const job = doc.data() as DevOpsJob;

      // Update cache
      this.cache.set(id, job);

      return job;
    } catch (error) {
      console.error('Failed to fetch job from Firestore:', error);
      return undefined;
    }
  }

  /**
   * List jobs with optional filtering and pagination.
   */
  async list(options?: {
    limit?: number;
    type?: DevOpsJobType;
    status?: DevOpsJobStatus;
    startAfter?: string; // ISO timestamp for pagination
  }): Promise<DevOpsJob[]> {
    await this.initializeCache();

    const limit = options?.limit ?? 50;

    try {
      let query = this.db
        .collection(this.collectionName)
        .orderBy('createdAt', 'desc');

      // Apply filters
      if (options?.type) {
        query = query.where('type', '==', options.type);
      }

      if (options?.status) {
        query = query.where('status', '==', options.status);
      }

      // Pagination
      if (options?.startAfter) {
        query = query.startAfter(options.startAfter);
      }

      query = query.limit(limit);

      const snapshot = await query.get();
      const jobs = snapshot.docs.map((doc) => doc.data() as DevOpsJob);

      // Update cache with fetched jobs
      jobs.forEach((job) => {
        this.cache.set(job.id, job);
      });

      return jobs;
    } catch (error) {
      console.error('Failed to list jobs from Firestore:', error);

      // Fallback to cache if Firestore fails
      const cachedJobs = Array.from(this.cache.values())
        .filter((job) => {
          if (options?.type && job.type !== options.type) return false;
          if (options?.status && job.status !== options.status) return false;
          if (options?.startAfter && job.createdAt <= options.startAfter) return false;
          return true;
        })
        .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
        .slice(0, limit);

      return cachedJobs;
    }
  }

  /**
   * Delete a job from Firestore and cache.
   * Use with caution - typically jobs should be marked as completed/failed instead.
   */
  async delete(id: string): Promise<boolean> {
    await this.initializeCache();

    try {
      await this.db.collection(this.collectionName).doc(id).delete();
      this.cache.delete(id);
      return true;
    } catch (error) {
      console.error('Failed to delete job from Firestore:', error);
      return false;
    }
  }

  /**
   * Clear old completed/failed jobs older than the specified date.
   * Useful for periodic cleanup.
   */
  async cleanup(olderThan: Date): Promise<number> {
    await this.initializeCache();

    try {
      const cutoffTime = olderThan.toISOString();
      const snapshot = await this.db
        .collection(this.collectionName)
        .where('status', 'in', ['completed', 'failed'])
        .where('updatedAt', '<', cutoffTime)
        .limit(500) // Batch delete in chunks
        .get();

      const batch = this.db.batch();
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
        this.cache.delete(doc.id);
      });

      await batch.commit();
      return snapshot.size;
    } catch (error) {
      console.error('Failed to cleanup old jobs:', error);
      return 0;
    }
  }

  /**
   * Get job statistics.
   */
  async getStats(): Promise<{
    total: number;
    byType: Record<DevOpsJobType, number>;
    byStatus: Record<DevOpsJobStatus, number>;
  }> {
    await this.initializeCache();

    // Use cache for stats if available
    if (this.cache.size > 0) {
      const jobs = Array.from(this.cache.values());
      const stats = {
        total: jobs.length,
        byType: {} as Record<DevOpsJobType, number>,
        byStatus: {} as Record<DevOpsJobStatus, number>
      };

      jobs.forEach((job) => {
        stats.byType[job.type] = (stats.byType[job.type] ?? 0) + 1;
        stats.byStatus[job.status] = (stats.byStatus[job.status] ?? 0) + 1;
      });

      return stats;
    }

    // Fallback to Firestore aggregation
    try {
      const snapshot = await this.db.collection(this.collectionName).get();
      const jobs = snapshot.docs.map((doc) => doc.data() as DevOpsJob);

      const stats = {
        total: jobs.length,
        byType: {} as Record<DevOpsJobType, number>,
        byStatus: {} as Record<DevOpsJobStatus, number>
      };

      jobs.forEach((job) => {
        stats.byType[job.type] = (stats.byType[job.type] ?? 0) + 1;
        stats.byStatus[job.status] = (stats.byStatus[job.status] ?? 0) + 1;
      });

      return stats;
    } catch (error) {
      console.error('Failed to get job stats:', error);
      return {
        total: 0,
        byType: {} as Record<DevOpsJobType, number>,
        byStatus: {} as Record<DevOpsJobStatus, number>
      };
    }
  }
}

// Export singleton instance
export const firestoreJobStore = new FirestoreJobStore();
