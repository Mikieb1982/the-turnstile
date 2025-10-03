import React, { useCallback, useMemo, useState } from 'react';
import type { AttendedMatch } from '../types';
import { ShareIcon, XMarkIcon } from './Icons';
import { TeamLogo } from './TeamLogo';

interface PhotoViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  attendedMatch: AttendedMatch | null;
}

export const PhotoViewerModal: React.FC<PhotoViewerModalProps> = ({ isOpen, onClose, attendedMatch }) => {
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');

  if (!isOpen || !attendedMatch || !attendedMatch.photoUrl) return null;

  const { match, attendedOn, photoUrl } = attendedMatch;

  const shareDetails = useMemo(() => {
    const formattedDate = new Date(attendedOn).toLocaleDateString();
    const scoreLine = `${match.homeTeam.name} ${match.scores.home}-${match.scores.away} ${match.awayTeam.name}`;
    const text = `Matchday memory: ${scoreLine} at ${match.venue} on ${formattedDate}.`;

    return {
      shareUrl: photoUrl,
      shareText: text,
      shareTitle: `${match.homeTeam.name} vs ${match.awayTeam.name} matchday memory`,
      emailBody: `${text}\n\n${photoUrl}`,
    };
  }, [attendedOn, match, photoUrl]);

  const attemptNativeShare = async () => {
    if (typeof navigator === 'undefined' || !('share' in navigator)) {
      return false;
    }

    try {
      await (navigator as Navigator & { share: (data: ShareData) => Promise<void> }).share({
        title: shareDetails.shareTitle,
        text: shareDetails.shareText,
        url: shareDetails.shareUrl,
      });
      return true;
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        // User dismissed the native share sheet; treat as handled.
        return true;
      }
      return false;
    }
  };

  const handleShareClick = async () => {
    if (isShareMenuOpen) {
      setIsShareMenuOpen(false);
      return;
    }

    const wasShared = await attemptNativeShare();

    if (!wasShared) {
      setIsShareMenuOpen(true);
    }
  };

  const handleOpenShareTarget = useCallback((url: string) => {
    if (typeof window === 'undefined') return;
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  const handleCopyLink = async () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
      setCopyState('error');
      setTimeout(() => setCopyState('idle'), 2000);
      return;
    }

    try {
      await navigator.clipboard.writeText(shareDetails.shareUrl);
      setCopyState('copied');
    } catch {
      setCopyState('error');
    }

    setTimeout(() => setCopyState('idle'), 2000);
  };

  const shareTargets = useMemo(() => {
    const encodedMessage = encodeURIComponent(`${shareDetails.shareText} ${shareDetails.shareUrl}`);
    const encodedUrl = encodeURIComponent(shareDetails.shareUrl);
    const encodedQuote = encodeURIComponent(shareDetails.shareText);
    const encodedEmailBody = encodeURIComponent(shareDetails.emailBody);

    return [
      {
        label: 'WhatsApp',
        action: () => handleOpenShareTarget(`https://wa.me/?text=${encodedMessage}`),
      },
      {
        label: 'Instagram',
        action: () => handleOpenShareTarget(`https://www.instagram.com/direct/new/?text=${encodedMessage}`),
      },
      {
        label: 'Facebook',
        action: () => handleOpenShareTarget(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedQuote}`),
      },
      {
        label: 'Snapchat',
        action: () => handleOpenShareTarget(`https://www.snapchat.com/scan?attachmentUrl=${encodedUrl}`),
      },
      {
        label: 'Email',
        action: () => handleOpenShareTarget(`mailto:?subject=${encodeURIComponent(shareDetails.shareTitle)}&body=${encodedEmailBody}`),
      },
    ];
  }, [handleOpenShareTarget, shareDetails]);

  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm" 
      onClick={onClose} 
      role="dialog" 
      aria-modal="true"
    >
      <div 
        className="bg-surface rounded-xl shadow-lg w-full max-w-3xl max-h-[90vh] flex flex-col" 
        onClick={e => e.stopPropagation()}
      >
        <div className="relative">
          <img src={photoUrl} alt={`Photo from ${match.homeTeam.name} vs ${match.awayTeam.name}`} className="w-full h-auto max-h-[70vh] object-contain rounded-t-xl" />
          <button
            onClick={handleShareClick}
            className="absolute top-3 left-3 p-1.5 rounded-full text-white bg-black/50 hover:bg-black/70"
            aria-label="Share matchday memory"
          >
            <ShareIcon className="w-6 h-6" />
          </button>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full text-white bg-black/50 hover:bg-black/70"
            aria-label="Close"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 border-t border-border bg-surface-alt rounded-b-xl">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 truncate">
              <TeamLogo teamId={match.homeTeam.id} teamName={match.homeTeam.name} size="small" />
              <span className="font-semibold">{match.homeTeam.name}</span>
              <span className="text-primary font-bold">{match.scores.home}</span>
            </div>
            <span className="text-text-subtle font-bold">vs</span>
            <div className="flex items-center gap-2 truncate justify-end">
              <span className="text-primary font-bold">{match.scores.away}</span>
              <span className="font-semibold">{match.awayTeam.name}</span>
              <TeamLogo teamId={match.awayTeam.id} teamName={match.awayTeam.name} size="small" />
            </div>
          </div>
          <p className="text-xs text-text-subtle text-center mt-2">
            {match.venue} &bull; Attended on {new Date(attendedOn).toLocaleDateString()}
          </p>
          {(isShareMenuOpen || copyState === 'copied' || copyState === 'error') && (
            <div className="mt-4 border-t border-border pt-4">
              <p className="text-sm font-semibold text-text">Share this memory</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {shareTargets.map(target => (
                  <button
                    key={target.label}
                    onClick={target.action}
                    className="rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-text hover:border-primary/60 hover:text-primary transition-colors"
                  >
                    {target.label}
                  </button>
                ))}
                <button
                  onClick={handleCopyLink}
                  className="rounded-lg border border-dashed border-border px-3 py-2 text-sm font-medium text-text hover:border-primary/60 hover:text-primary transition-colors"
                >
                  {copyState === 'copied' ? 'Link copied!' : copyState === 'error' ? 'Copy failed' : 'Copy link'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};