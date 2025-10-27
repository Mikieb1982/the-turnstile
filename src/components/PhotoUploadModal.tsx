<<<<<<< HEAD
import { useState, useRef } from 'react';
import Image from 'next/image';
import type { AttendedMatch } from '../types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
=======
import React, { useState, useRef, useEffect } from 'react';
import type { AttendedMatch } from '../types';
import { XMarkIcon, ArrowUpTrayIcon, CameraIcon, MiniSpinnerIcon } from './Icons';
>>>>>>> 27e8a865d1dcb8be48c266b1dfcaa1f03b83bcb9

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
<<<<<<< HEAD
  onSave: (photoUrl: string) => void;
  match: AttendedMatch | null;
}

export function PhotoUploadModal({ isOpen, onClose, onSave, match }: PhotoUploadModalProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(match?.photoUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
=======
  onUpload: (matchId: string, file: File) => Promise<void>;
  isUploading: boolean;
  match: AttendedMatch | null;
}

export const PhotoUploadModal: React.FC<PhotoUploadModalProps> = ({ isOpen, onClose, onUpload, isUploading, match }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (isOpen && match) {
      setPreviewUrl(match.photoUrl || null);
      setSelectedFile(null);
    }
  }, [isOpen, match]);

  if (!isOpen || !match) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
>>>>>>> 27e8a865d1dcb8be48c266b1dfcaa1f03b83bcb9
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
<<<<<<< HEAD

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
=======
  
  const handleSave = () => {
    if (selectedFile) {
      onUpload(match.match.id, selectedFile);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="photo-modal-title">
      <div className="bg-surface rounded-xl shadow-lg w-full max-w-md max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 id="photo-modal-title" className="text-xl font-bold text-text-strong">
            {match.photoUrl ? 'Change' : 'Add'} Photo
          </h2>
          <button onClick={onClose} className="p-1 rounded-full text-text-subtle hover:bg-surface-alt" aria-label="Close">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
            <p className="text-sm text-text-subtle text-center">
              {match.match.homeTeam.name} vs {match.match.awayTeam.name}
            </p>
            <div className="flex items-center justify-center w-full aspect-video mx-auto rounded-lg bg-surface-alt border-2 border-dashed border-border overflow-hidden">
                {previewUrl ? (
                    <img src={previewUrl} alt="Photo preview" className="w-full h-full object-cover" />
                ) : (
                    <div className="flex flex-col items-center gap-2 text-text-subtle">
                        <CameraIcon className="w-12 h-12" />
                        <span>Photo Preview</span>
                    </div>
                )}
            </div>
            
            <div>
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center justify-center gap-2 text-center bg-primary/10 text-primary font-semibold py-2.5 px-4 rounded-md hover:bg-primary/20 transition-colors"
                >
                    <ArrowUpTrayIcon className="w-5 h-5"/>
                    Choose an Image
                </button>
            </div>
        </div>

        <div className="p-4 bg-surface-alt border-t border-border mt-auto">
            <button 
                onClick={handleSave}
                disabled={!selectedFile || isUploading}
                className="w-full flex items-center justify-center gap-2 bg-secondary text-white font-semibold py-2.5 px-4 rounded-md hover:bg-secondary/90 transition-colors disabled:bg-secondary/50 disabled:cursor-not-allowed"
            >
                {isUploading ? (
                    <>
                        <MiniSpinnerIcon className="w-5 h-5" />
                        Uploading...
                    </>
                ) : 'Save Photo'}
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
