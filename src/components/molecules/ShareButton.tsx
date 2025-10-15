import React from 'react';
import { Button } from '../atoms/Button';

interface ShareButtonProps {
  stats: {
    matchesAttended: number;
    stadiumsVisited: number;
    badgesEarned: number;
  };
}

export const ShareButton: React.FC<ShareButtonProps> = ({ stats }) => {
  const handleShare = async () => {
    const shareText = `I've attended ${stats.matchesAttended} matches, visited ${stats.stadiumsVisited} stadiums, and earned ${stats.badgesEarned} badges on The Turnstile! 🏉`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Rugby League Stats',
          text: shareText,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText);
      alert('Stats copied to clipboard!');
    }
  };

  return (
    <Button variant="secondary" onClick={handleShare} className="sm:w-auto">
      📤 Share My Stats
    </Button>
  );
};