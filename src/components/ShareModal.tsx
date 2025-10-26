import { useState } from 'react';
import Image from 'next/image';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TeamLogo } from './Icons';
import type { Match } from '../types';
import { getAppShareUrl } from '../utils/share';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  match: Match;
}

export function ShareModal({ isOpen, onClose, match }: ShareModalProps) {
  const [isCopied, setIsCopied] = useState(false);
  const shareUrl = getAppShareUrl(match.id);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const nativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `I went to ${match.homeTeam.name} vs ${match.awayTeam.name}`,
        text: `I've added a new match to my Turnstile passport! Check it out:`,
        url: shareUrl,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
        <h2 className="text-xl font-bold">Share This Match</h2>
        <p className="text-muted-foreground mb-4">Let others know you were there!</p>

        <div className="relative my-4 rounded-lg border bg-card text-card-foreground shadow-sm p-4">
          <div className="flex items-center justify-center gap-4">
            <TeamLogo logo={match.homeTeam.logo} alt={match.homeTeam.name} size={48} />
            <div className="text-center">
              <p className="font-bold text-xl">{`${match.homeTeam.score} - ${match.awayTeam.score}`}</p>
              <p className="text-sm text-muted-foreground">{match.competition}</p>
            </div>
            <TeamLogo logo={match.awayTeam.logo} alt={match.awayTeam.name} size={48} />
          </div>
          <div className="text-center mt-2">
            <p className="font-semibold">{match.homeTeam.name} vs {match.awayTeam.name}</p>
            <p className="text-xs text-muted-foreground">{new Date(match.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="absolute -bottom-4 -right-4 rounded-full bg-primary p-2 text-primary-foreground">
            <Image src="/logo.png" alt="The Turnstile Logo" width={32} height={32} />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input type="text" value={shareUrl} readOnly className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
          <Button onClick={copyToClipboard} variant="outline" size="icon">
            {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>

        {navigator.share && (
          <Button onClick={nativeShare} className="w-full mt-4">Share via...</Button>
        )}

        <div className="mt-6 flex justify-end">
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
}
