declare module 'firebase/app' {
  export interface FirebaseApp {}
  export function initializeApp(config: Record<string, unknown>): FirebaseApp;
  export function getApps(): FirebaseApp[];
}

declare module 'firebase/firestore' {
  import type { FirebaseApp } from 'firebase/app';

  export interface Firestore {}

  export interface DocumentSnapshot<T = unknown> {
    id: string;
    data(): T;
    exists(): boolean;
  }

  export interface QuerySnapshot<T = unknown> {
    empty: boolean;
    forEach(callback: (doc: DocumentSnapshot<T>) => void): void;
  }

  export function getFirestore(app: FirebaseApp): Firestore;
  export function doc(db: Firestore, collectionPath: string, documentPath: string): unknown;
  export function getDoc<T = unknown>(reference: unknown): Promise<DocumentSnapshot<T>>;
  export function collection(db: Firestore, collectionPath: string): unknown;
  export function getDocs<T = unknown>(query: unknown): Promise<QuerySnapshot<T>>;
}
