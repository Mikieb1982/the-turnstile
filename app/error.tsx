
'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-lg mb-4">{error.message}</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Try again
      </button>
    </div>
  );
}
