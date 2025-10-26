
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { googleSignIn, signOut } from '@/lib/auth';

const Login = () => {
  const { user } = useAuth();

  return (
    <div>
      {user ? (
        <div className="flex items-center gap-4">
          <p className="text-sm">{user.displayName}</p>
          <button onClick={signOut} className="bg-primary text-white font-bold py-2 px-4 rounded-full hover:bg-primary-hover transition-colors">
            Sign Out
          </button>
        </div>
      ) : (
        <button onClick={googleSignIn} className="bg-accent text-white font-bold py-2 px-4 rounded-full hover:bg-accent-hover transition-colors">
          Sign In with Google
        </button>
      )}
    </div>
  );
};

export default Login;
