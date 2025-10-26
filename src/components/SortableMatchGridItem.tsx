import React from 'react';
import Image from 'next/image';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { AttendedMatch } from '../types';
import { MoreVertical, PencilIcon, TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SortableMatchGridItemProps {
    attendedMatch: AttendedMatch;
    onClick: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

export const SortableMatchGridItem: React.FC<SortableMatchGridItemProps> = ({
    attendedMatch,
    onClick,
    onEdit,
    onDelete,
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: attendedMatch.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="group relative aspect-square w-full overflow-hidden rounded-lg shadow-md"
        >
            {attendedMatch.photoUrl ? (
                <Image
                    src={attendedMatch.photoUrl}
                    alt={`Photo from the match`}
                    layout="fill"
                    objectFit="cover"
                    className="cursor-pointer transition-transform duration-300 group-hover:scale-105"
                    onClick={onClick}
                />
            ) : (
                <div className="flex h-full w-full cursor-pointer items-center justify-center bg-muted/50" onClick={onClick}>
                    <p className="text-sm text-muted-foreground">No photo</p>
                </div>
            )}

            <div className="absolute top-1 right-1 z-10 opacity-0 transition-opacity group-hover:opacity-100">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={onEdit}><PencilIcon className="mr-2 h-4 w-4" />Edit Details</DropdownMenuItem>
                        <DropdownMenuItem onClick={onDelete} className="text-red-500"><TrashIcon className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-white">
                <h3 className="text-xs font-bold">{attendedMatch.match.homeTeam.name} vs {attendedMatch.match.awayTeam.name}</h3>
            </div>
        </div>
    );
};
