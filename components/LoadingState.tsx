// components/LoadingState.tsx
export default function LoadingState({ message = 'Loading matchday data...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="relative w-16 h-16">
        {/* Spinning rugby ball or stadium icon */}
        <div className="absolute inset-0 border-4 border-surface rounded-full" />
        <div className="absolute inset-0 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
      
      <p className="font-display text-lg text-gold uppercase tracking-wider animate-pulse">
        {message}
      </p>
    </div>
  );
}
