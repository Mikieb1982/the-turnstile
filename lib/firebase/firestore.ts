import { db } from '@/lib/firebase/config'; // Corrected import path

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

export { db };
