import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import type { AttendedMatch } from '../types';
import { TeamLogo, ShareIcon, TrophyIcon, CameraIcon, TrashIcon, PencilIcon } from './Icons';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';

interface MatchListItemProps {
  attendedMatch: AttendedMatch;
  onEdit: () => void;
  onDelete: () => void;
  onShare: () => void;
  onPhotoUpload: () => void;
  onPhotoDelete: () => void;
  onPhotoClick: () => void;
}

export const MatchListItem: React.FC<MatchListItemProps> = ({
  attendedMatch,
  onEdit,
  onDelete,
  onShare,
  onPhotoUpload,
  onPhotoDelete,
  onPhotoClick,
}) => {
  const { match, attendance, notes, isFavorite } = attendedMatch;
  const [shareOutcome, setShareOutcome] = useState<string | null>(null);

  const handleShare = async () => {
    onShare();
    setShareOutcome('Shared successfully!');
    setTimeout(() => setShareOutcome(null), 3000);
  };

  const MatchCard = (
    <div className="relative rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <TeamLogo logo={match.homeTeam.logo} alt={match.homeTeam.name} size={40} />
          <div className="text-center">
            <p className="text-xs text-muted-foreground">{match.competition}</p>
            <p className="font-bold text-lg">{`${match.homeTeam.score} - ${match.awayTeam.score}`}</p>
            <p className="text-xs text-muted-foreground">{format(parseISO(match.date), 'EEE, d MMM yyyy')}</p>
          </div>
          <TeamLogo logo={match.awayTeam.logo} alt={match.awayTeam.name} size={40} />
        </div>
        <div className="text-right">
          <p className="font-semibold">{match.homeTeam.name}</p>
          <p className="text-muted-foreground vs">vs</p>
          <p className="font-semibold">{match.awayTeam.name}</p>
        </div>
      </div>
      <div className="border-t p-4 text-sm text-muted-foreground">
        <p>{match.venue}</p>
        {attendance && <p>Attendance: {attendance}</p>}
        {notes && <p className="mt-2 italic">Notes: {notes}</p>}
      </div>
      {isFavorite && <TrophyIcon className="absolute top-2 right-2 h-5 w-5 text-yellow-500" />}
    </div>
  );

  return (
    <li className="group relative">
      <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEdit}><PencilIcon className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={handleShare}><ShareIcon className="mr-2 h-4 w-4" />Share</DropdownMenuItem>
            <DropdownMenuItem onClick={onPhotoUpload}><CameraIcon className="mr-2 h-4 w-4" />{attendedMatch.photoUrl ? 'Change Photo' : 'Add Photo'}</DropdownMenuItem>
            {attendedMatch.photoUrl && <DropdownMenuItem onClick={onPhotoDelete} className="text-red-500"><TrashIcon className="mr-2 h-4 w-4" />Delete Photo</DropdownMenuItem>}
            <DropdownMenuItem onClick={onDelete} className="text-red-500"><TrashIcon className="mr-2 h-4 w-4" />Delete Match</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {attendedMatch.photoUrl ? (
        <div onClick={onPhotoClick} className="cursor-pointer">
          {MatchCard}
        </div>
      ) : (
        <div>
          {MatchCard}
        </div>
      )}

      {shareOutcome && <Badge className="absolute bottom-2 right-2">{shareOutcome}</Badge>}
    </li>
  );
};
