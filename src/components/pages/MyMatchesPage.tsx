import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAuth } from '@/contexts/AuthContext';
import { MatchList } from '@/components/organisms/MatchList';
import { MatchGrid } from '@/components/organisms/MatchGrid';
import { MatchFormModal } from '@/components/organisms/MatchFormModal';
import { PhotoViewerModal } from '@/components/organisms/PhotoViewerModal';
import { ShareModal } from '@/components/organisms/ShareModal';
import { Button } from '@/components/ui/button';
import { PlusIcon, LayoutGrid, RowsIcon } from 'lucide-react';
import { AttendedMatch, Match } from '@/types';

export const MyMatchesPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [matches, setMatches] = useState<AttendedMatch[]>(currentUser?.attendedMatches || []);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewerModalOpen, setIsViewerModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<AttendedMatch | null>(null);
  const [matchToShare, setMatchToShare] = useState<Match | null>(null);
  const [layout, setLayout] = useState<'list' | 'grid'>('grid');

  const handleAddClick = () => {
    setSelectedMatch(null);
    setIsFormModalOpen(true);
  };

  const handleEditClick = (match: AttendedMatch) => {
    setSelectedMatch(match);
    setIsFormModalOpen(true);
  };

  const handleDeleteMatch = (matchId: string) => {
    setMatches(matches.filter(m => m.id !== matchId));
  };

  const handleSaveMatch = (newMatchData: AttendedMatch) => {
    if (selectedMatch) {
      setMatches(matches.map(m => (m.id === selectedMatch.id ? newMatchData : m)));
    } else {
      setMatches([...matches, { ...newMatchData, id: String(Date.now()) }]);
    }
    setIsFormModalOpen(false);
  };

  const handlePhotoClick = (match: AttendedMatch) => {
    if(match.userPhoto) {
        setSelectedMatch(match);
        setIsViewerModalOpen(true);
    }
  };

  const handleShareClick = (match: Match) => {
    setMatchToShare(match);
    setIsShareModalOpen(true);
  };

  const moveMatch = (dragIndex: number, hoverIndex: number) => {
    const dragMatch = matches[dragIndex];
    const newMatches = [...matches];
    newMatches.splice(dragIndex, 1);
    newMatches.splice(hoverIndex, 0, dragMatch);
    setMatches(newMatches);
  };

  return (
    <DndProvider backend={HTML5Backend}>
        <div className="container mx-auto py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">My Matches</h1>
                    <p className="mt-3 text-xl text-muted-foreground">A personal record of every match you&apos;ve attended.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => setLayout(layout === 'list' ? 'grid' : 'list')}>
                        {layout === 'list' ? <LayoutGrid /> : <RowsIcon />}
                    </Button>
                    <Button onClick={handleAddClick} size="lg">
                        <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" />
                        Add Match
                    </Button>
                </div>
            </div>

            {layout === 'grid' ? (
                <MatchGrid 
                    matches={matches}
                    onPhotoClick={handlePhotoClick}
                    onEditClick={handleEditClick}
                    onShareClick={handleShareClick}
                    moveMatch={moveMatch}
                />
            ) : (
                <MatchList 
                    matches={matches}
                    onEditClick={handleEditClick}
                    onDeleteClick={handleDeleteMatch}
                />
            )}

            {isFormModalOpen && (
                <MatchFormModal
                    isOpen={isFormModalOpen}
                    onClose={() => setIsFormModalOpen(false)}
                    onSave={handleSaveMatch}
                    initialData={selectedMatch}
                />
            )}

            {isViewerModalOpen && selectedMatch && (
                <PhotoViewerModal
                    isOpen={isViewerModalOpen}
                    onClose={() => setIsViewerModalOpen(false)}
                    match={selectedMatch}
                />
            )}

            {isShareModalOpen && matchToShare && (
                <ShareModal
                    isOpen={isShareModalOpen}
                    onClose={() => setIsShareModalOpen(false)}
                    match={matchToShare}
                />
            )}
        </div>
    </DndProvider>
  );
};
