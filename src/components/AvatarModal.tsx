import { useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { AVATARS } from '../avatars';

interface AvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAvatarSelect: (avatarUrl: string) => void;
  currentAvatar: string | null;
}

export function AvatarModal({
  isOpen,
  onClose,
  onAvatarSelect,
  currentAvatar,
}: AvatarModalProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentAvatar);
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
    if (previewUrl) {
      onAvatarSelect(previewUrl);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
        <h2 className="text-xl font-bold">Choose Your Avatar</h2>
        <div className="mt-4 grid grid-cols-4 gap-4">
          {AVATARS.map((avatar) => (
            <button
              key={avatar.name}
              className={`rounded-full border-2 p-1 ${previewUrl === avatar.url ? 'border-primary' : 'border-transparent'}`}
              onClick={() => setPreviewUrl(avatar.url)}
            >
              <Image
                src={avatar.url}
                alt={avatar.name}
                width={64}
                height={64}
                className="h-16 w-16 rounded-full" 
              />
            </button>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
            Upload Custom
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
        </div>

        {previewUrl && (
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">Preview:</p>
            <Image
              src={previewUrl}
              alt="Avatar preview"
              width={96}
              height={96}
              className="mx-auto mt-2 h-24 w-24 rounded-full"/>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!previewUrl}>
            Save Avatar
          </Button>
        </div>
      </div>
    </div>
  );
}
