import { useMemo, useCallback, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Download, Share, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TeamLogo } from './Icons';
import type { AttendedMatch } from '../types';

interface PhotoViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  match: AttendedMatch | null;
}

export function PhotoViewerModal({
  isOpen,
  onClose,
  match,
}: PhotoViewerModalProps) {
  const [isUiVisible, setIsUiVisible] = useState(true);

  const photoUrl = useMemo(() => {
    if (!match?.photoUrl) return null;
    // This is a placeholder for a real image transformation service
    return match.photoUrl;
  }, [match]);

  const handleShare = useCallback(() => {
    if (navigator.share && photoUrl) {
      navigator.share({
        title: `A photo from ${match?.match.homeTeam.name} vs ${match?.match.awayTeam.name}`,
        text: `Check out my photo from the match!`,
        url: photoUrl,
      });
    }
  }, [photoUrl, match]);

  const handleDownload = useCallback(() => {
    if (photoUrl) {
      const link = document.createElement('a');
      link.href = photoUrl;
      link.download = `the-turnstile-match-photo.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [photoUrl]);

  const handleNext = () => console.log('Next photo');
  const handlePrev = () => console.log('Prev photo');

  const meta = useMemo(() => {
    if (!match) return null;
    return {
      homeTeam: match.match.homeTeam,
      awayTeam: match.match.awayTeam,
      score: `${match.match.homeTeam.score} - ${match.match.awayTeam.score}`,
      competition: match.match.competition,
      date: new Date(match.match.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    }
  }, [match]);

  if (!isOpen || !match || !photoUrl || !meta) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={() => setIsUiVisible(!isUiVisible)}
    >
      {/* Main Image */}
      <div className="relative h-full w-full">
        <Image
          src={photoUrl}
          alt={`Photo from ${meta.homeTeam.name} vs ${meta.awayTeam.name}`}
          layout="fill"
          objectFit="contain"
          className="cursor-pointer"
        />
      </div>

      {/* UI Elements - conditional rendering based on isUiVisible */}
      <div className={`absolute inset-0 transition-opacity ${isUiVisible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Header */}
        <header className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent">
          <div className="flex items-center gap-4">
            <TeamLogo logo={meta.homeTeam.logo} alt={meta.homeTeam.name} size={32} />
            <div>
              <p className="font-bold text-white">{meta.homeTeam.name} vs {meta.awayTeam.name}</p>
              <p className="text-sm text-gray-300">{meta.score} &bull; {meta.competition}</p>
            </div>
            <TeamLogo logo={meta.awayTeam.logo} alt={meta.awayTeam.name} size={32} />
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/10">
            <X />
          </Button>
        </header>

        {/* Navigation Arrows */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Button variant="ghost" size="icon" onClick={handlePrev} className="text-white hover:bg-white/10 rounded-full h-12 w-12">
            <ChevronLeft size={32} />
          </Button>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <Button variant="ghost" size="icon" onClick={handleNext} className="text-white hover:bg-white/10 rounded-full h-12 w-12">
            <ChevronRight size={32} />
          </Button>
        </div>

        {/* Footer */}
        <footer className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-4 bg-gradient-to-t from-black/50 to-transparent">
          <p className="text-sm text-gray-300">Photo added on {meta.date}</p>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={handleShare} className="text-white hover:bg-white/10">
              <Share />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleDownload} className="text-white hover:bg-white/10">
              <Download />
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
}
