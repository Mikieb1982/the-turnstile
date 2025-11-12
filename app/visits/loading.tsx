// app/visits/loading.tsx
import { Loader } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Loader className="animate-spin text-cyan-400" size={48} />
    </div>
  );
}
