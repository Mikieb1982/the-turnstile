<<<<<<< HEAD
import { useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { AVATARS } from '../avatars';
=======
import React, { useState, useRef, useEffect } from 'react';
import { XMarkIcon, ArrowUpTrayIcon, UserCircleIcon } from './Icons';
>>>>>>> 27e8a865d1dcb8be48c266b1dfcaa1f03b83bcb9

interface AvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
<<<<<<< HEAD
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
=======
  onSave: (avatarUrl: string) => void;
  currentAvatar?: string;
}

export const AvatarModal: React.FC<AvatarModalProps> = ({ isOpen, onClose, onSave, currentAvatar }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (isOpen) {
        setPreviewUrl(currentAvatar || null);
    }
  }, [isOpen, currentAvatar]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
>>>>>>> 27e8a865d1dcb8be48c266b1dfcaa1f03b83bcb9
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
<<<<<<< HEAD

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
=======
  
  const handleSave = () => {
    if (previewUrl) {
      onSave(previewUrl);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="avatar-modal-title">
      <div className="bg-surface rounded-xl shadow-lg w-full max-w-md max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 id="avatar-modal-title" className="text-xl font-bold text-text-strong">Edit Avatar</h2>
          <button onClick={onClose} className="p-1 rounded-full text-text-subtle hover:bg-surface-alt" aria-label="Close">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
            <div className="flex items-center justify-center w-32 h-32 mx-auto rounded-full bg-surface-alt border-2 border-dashed border-border overflow-hidden">
                {previewUrl ? (
                    <img src={previewUrl} alt="Avatar preview" className="w-full h-full object-cover" />
                ) : (
                    <UserCircleIcon className="w-24 h-24 text-text-subtle/30" />
                )}
            </div>
            
            <div>
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center justify-center gap-2 text-center bg-primary/10 text-primary font-semibold py-2 px-4 rounded-md hover:bg-primary/20 transition-colors"
                >
                    <ArrowUpTrayIcon className="w-5 h-5"/>
                    Choose an Image
                </button>
            </div>
        </div>

        <div className="p-4 bg-surface-alt border-t border-border mt-auto">
            <button 
                onClick={handleSave}
                disabled={!previewUrl}
                className="w-full bg-secondary text-white font-semibold py-2.5 px-4 rounded-md hover:bg-secondary/90 transition-colors disabled:bg-secondary/50 disabled:cursor-not-allowed"
            >
                Save Avatar
            </button>
>>>>>>> 27e8a865d1dcb8be48c266b1dfcaa1f03b83bcb9
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
};
>>>>>>> 27e8a865d1dcb8be48c266b1dfcaa1f03b83bcb9
