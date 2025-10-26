import { useState, useRef } from 'react';
import Image from 'next/image';
import type { AttendedMatch } from '../types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (photoUrl: string) => void;
  match: AttendedMatch | null;
}

export function PhotoUploadModal({ isOpen, onClose, onSave, match }: PhotoUploadModalProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(match?.photoUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // In a real app, you would upload the file to a service (e.g., Firebase Storage)
    // and get back a URL.
    if (previewUrl) {
      onSave(previewUrl);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="w-full max-w-lg rounded-lg bg-background p-6 shadow-lg">
        <h2 className="text-xl font-bold">Upload Photo for Match</h2>
        <p className="text-muted-foreground mb-4">For {match?.match.homeTeam.name} vs {match?.match.awayTeam.name}</p>

        <div className="space-y-4">
          <Input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="cursor-pointer"
          />

          {previewUrl && (
            <div className="mt-4 w-full overflow-hidden rounded-lg">
                <Image
                    src={previewUrl}
                    alt="Preview"
                    layout="responsive"
                    width={500}
                    height={300}
                    objectFit="cover"
                />
            </div>
            )}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={!previewUrl}>Save Photo</Button>
        </div>
      </div>
    </div>
  );
}
