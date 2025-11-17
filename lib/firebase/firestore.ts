import { getFirestore } from 'firebase/firestore';
import { app } from '@/lib/firebase/config';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  bio?: string;
  teamId?: string;
}

export interface Team {
  id: string;
  name: string;
  ownerId: string;
  members: string[];
}

// Initialize Firestore
const db = getFirestore(app);

export { db };