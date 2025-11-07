'use client';

import { 
  createContext, 
  useContext, 
  useEffect, 
  useState, 
  ReactNode 
} from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase'; // Import from your main firebase.ts

// Define the shape of the context
interface AuthContextType {
  user: User | null;
  loading: boolean;
}

// Create the context
const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  loading: true 
});

// Create the Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This is the central listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Create the custom hook to access the context
export const useAuth = () => {
  return useContext(AuthContext);
};
