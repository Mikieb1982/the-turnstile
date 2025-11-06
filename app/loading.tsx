// app/loading.tsx
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="relative flex justify-center items-center">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        {/* Logo in center */}
        <div className="absolute">
          <Image
            src="/logo.png"
            alt="Loading Logo"
            width={64}
            height={64}
            className="h-16 w-16"
          />
        </div>
      </div>
    </div>
  );
}
