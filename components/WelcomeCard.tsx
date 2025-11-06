// components/WelcomeCard.tsx
export default function WelcomeCard({ userName }: { userName: string }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-navy via-navy to-crimson 
                    rounded-xl p-8 shadow-card-glow-gold animate-slide-in">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-crimson rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10">
        <h1 className="font-display text-display-lg text-gradient-gold uppercase tracking-wider mb-2">
          Welcome Back, {userName}
        </h1>
        <p className="text-cream text-lg mb-6">
          Ready for another matchday adventure?
        </p>
        
        <div className="flex gap-4">
          <button className="bg-crimson text-cream px-6 py-3 font-bold rounded-lg 
                           shadow-crimson-glow hover:scale-105 hover:shadow-xl 
                           transition-all duration-200 uppercase tracking-wide">
            Log Match
          </button>
          <button className="bg-gold text-navy px-6 py-3 font-bold rounded-lg 
                           hover:scale-105 hover:shadow-glow 
                           transition-all duration-200 uppercase tracking-wide">
            View Passport
          </button>
        </div>
      </div>
    </div>
  );
}
