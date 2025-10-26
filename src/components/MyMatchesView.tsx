import { useState, useMemo } from 'react';
import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { AttendedMatch, Match, MatchFilters } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { MatchList } from './MatchList';
import { MatchFormModal } from './MatchFormModal';
import { PhotoUploadModal } from './PhotoUploadModal';
import { PhotoViewerModal } from './PhotoViewerModal';
import { ShareModal } from './ShareModal';
import { Button } from '@/components/ui/button';
import { PlusIcon, LayoutGridIcon, LayoutListIcon } from './Icons';
import { SortableMatchGridItem } from './SortableMatchGridItem';

const initialFilters: MatchFilters = {
  sortBy: 'date_desc',
  year: null,
  competition: null,
};

export function MyMatchesView() {
  const { currentUser } = useAuth(); // Assuming this provides the user and their matches
  const [matches, setMatches] = useState<AttendedMatch[]>(currentUser?.attendedMatches || []);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isPhotoUploadModalOpen, setIsPhotoUploadModalOpen] = useState(false);
  const [isPhotoViewerModalOpen, setIsPhotoViewerModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<AttendedMatch | null>(null);
  const [matchToShare, setMatchToShare] = useState<Match | null>(null);
  const [filters, setFilters] = useState<MatchFilters>(initialFilters);
  const [layout, setLayout] = useState<'list' | 'grid'>('list');

  const handleAddMatch = () => {
    setSelectedMatch(null);
    setIsFormModalOpen(true);
  };

  const handleEditMatch = (match: AttendedMatch) => {
    setSelectedMatch(match);
    setIsFormModalOpen(true);
  };

  const handleDeleteMatch = (matchId: string) => {
    setMatches(matches.filter(m => m.id !== matchId));
  };

  const handleSaveMatch = (newMatchData: AttendedMatch) => {
    if (selectedMatch) {
      setMatches(matches.map(m => m.id === selectedMatch.id ? newMatchData : m));
    } else {
      setMatches([...matches, { ...newMatchData, id: String(Date.now()) }]);
    }
  };

  const handleShare = (match: Match) => {
    setMatchToShare(match);
    setIsShareModalOpen(true);
  }

  const handlePhotoUpload = (match: AttendedMatch) => {
    setSelectedMatch(match);
    setIsPhotoUploadModalOpen(true);
  };

  const handleSavePhoto = (photoUrl: string) => {
    if (selectedMatch) {
      const updatedMatch = { ...selectedMatch, photoUrl };
      setMatches(matches.map(m => m.id === selectedMatch.id ? updatedMatch : m));
    }
  };

  const handlePhotoDelete = (match: AttendedMatch) => {
    const updatedMatch = { ...match, photoUrl: undefined };
    setMatches(matches.map(m => m.id === match.id ? updatedMatch : m));
  };

  const handlePhotoClick = (match: AttendedMatch) => {
    setSelectedMatch(match);
    setIsPhotoViewerModalOpen(true);
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setMatches((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const filteredMatches = useMemo(() => {
    let sorted = [...matches];
    if (filters.sortBy === 'date_asc') {
      sorted.sort((a, b) => new Date(a.match.date).getTime() - new Date(b.match.date).getTime());
    } else {
      sorted.sort((a, b) => new Date(b.match.date).getTime() - new Date(a.match.date).getTime());
    }

    if (filters.year) {
      sorted = sorted.filter(m => new Date(m.match.date).getFullYear() === Number(filters.year));
    }
    if (filters.competition) {
      sorted = sorted.filter(m => m.match.competition === filters.competition);
    }
    return sorted;
  }, [matches, filters]);

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">My Matches</h2>
          <p className="text-muted-foreground">
            A record of every match you&apos;ve attended.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setLayout(layout === 'list' ? 'grid' : 'list')}>
            {layout === 'list' ? <LayoutGridIcon /> : <LayoutListIcon />}
          </Button>
          <Button onClick={handleAddMatch}>
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Match
          </Button>
        </div>
      </div>

      {layout === 'grid' ? (
        <DndContext sensors={[]} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
          <SortableContext items={filteredMatches} strategy={verticalListSortingStrategy}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMatches.map(match => (
                <SortableMatchGridItem
                  key={match.id}
                  attendedMatch={match}
                  onClick={() => handlePhotoClick(match)}
                  onEdit={() => handleEditMatch(match)}
                  onDelete={() => handleDeleteMatch(match.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <MatchList
          matches={filteredMatches}
          filters={filters}
          onFilterChange={setFilters}
          onEdit={handleEditMatch}
          onDelete={handleDeleteMatch}
          onShare={handleShare}
          onPhotoUpload={handlePhotoUpload}
          onPhotoDelete={handlePhotoDelete}
          onPhotoClick={handlePhotoClick}
        />
      )}

      <MatchFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSaveMatch}
        initialData={selectedMatch}
      />

      <PhotoUploadModal
        isOpen={isPhotoUploadModalOpen}
        onClose={() => setIsPhotoUploadModalOpen(false)}
        onSave={handleSavePhoto}
        match={selectedMatch}
      />

      <PhotoViewerModal
        isOpen={isPhotoViewerModalOpen}
        onClose={() => setIsPhotoViewerModalOpen(false)}
        match={selectedMatch}
      />

      {matchToShare && (
        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          match={matchToShare}
        />
      )}
    </div>
  );
}
