import React, { useState, useRef } from 'react';
import { XMarkIcon, ArrowUpTrayIcon, SparklesIcon, UserCircleIcon } from './Icons';
import { LoadingSpinner } from './LoadingSpinner';
// The geminiImageService is no longer imported as the generation feature is disabled.
// import { generateAvatar } from '../services/geminiImageService';

interface AvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (avatarUrl: string) => void;
}

type Mode = 'upload' | 'generate';

export const AvatarModal: React.FC<AvatarModalProps> = ({ isOpen, onClose, onSave }) => {
  // Mode is defaulted to 'upload' as the 'generate' feature is disabled.
  const [mode, setMode] = useState<Mode>('upload');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  /*
  // The AI avatar generation logic is commented out.
  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a description for your avatar.');
      return;
    }
    setLoading(true);
    setError(null);
    setPreviewUrl(null);
    try {
      const imageUrl = await generateAvatar(prompt);
      setPreviewUrl(imageUrl);
    } catch (e: any) {
      setError(e.message || 'An unknown error occurred during generation.');
    } finally {
      setLoading(false);
    }
  };
  */
  
  const handleSave = () => {
    if (previewUrl) {
      onSave(previewUrl);
    }
  };

  const TabButton: React.FC<{ currentMode: Mode; targetMode: Mode; children: React.ReactNode }> = ({ currentMode, targetMode, children }) => (
    <button
      onClick={() => setMode(targetMode)}
      className={`w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold border-b-2 transition-colors ${
        currentMode === targetMode
          ? 'text-primary border-primary'
          : 'text-text-subtle border-transparent hover:text-text hover:bg-surface-alt'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="avatar-modal-title">
      <div className="bg-surface rounded-xl shadow-lg w-full max-w-md max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 id="avatar-modal-title" className="text-xl font-bold text-text-strong">Edit Avatar</h2>
          <button onClick={onClose} className="p-1 rounded-full text-text-subtle hover:bg-surface-alt" aria-label="Close">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* The "Generate" tab button is commented out to disable the feature. */}
        <div className="flex border-b border-border">
          <TabButton currentMode={mode} targetMode="upload"><ArrowUpTrayIcon className="w-5 h-5"/> Upload</TabButton>
          {/* <TabButton currentMode={mode} targetMode="generate"><SparklesIcon className="w-5 h-5"/> Generate</TabButton> */}
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
            <div className="flex items-center justify-center w-32 h-32 mx-auto rounded-full bg-surface-alt border-2 border-dashed border-border overflow-hidden">
                {loading ? <LoadingSpinner/> : previewUrl ? (
                    <img src={previewUrl} alt="Avatar preview" className="w-full h-full object-cover" />
                ) : (
                    <UserCircleIcon className="w-24 h-24 text-text-subtle/30" />
                )}
            </div>
            {error && <p className="text-center text-sm text-danger">{error}</p>}
            
            {mode === 'upload' && (
                <div>
                    <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                    <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full text-center bg-primary/10 text-primary font-semibold py-2 px-4 rounded-md hover:bg-primary/20 transition-colors"
                    >
                        Choose an Image
                    </button>
                </div>
            )}

            {/* The UI for the 'generate' mode is commented out. */}
            {/*
            {mode === 'generate' && (
                <div className="space-y-3">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., a cartoon rugby ball with wings"
                        className="w-full bg-surface-alt text-text placeholder-text-subtle border border-border rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                        onClick={handleGenerate}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-primary/90 transition-colors disabled:bg-primary/50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Generating...' : <> <SparklesIcon className="w-5 h-5"/> Generate with AI </>}
                    </button>
                </div>
            )}
            */}
        </div>

        <div className="p-4 bg-surface-alt border-t border-border mt-auto">
            <button 
                onClick={handleSave}
                disabled={!previewUrl || loading}
                className="w-full bg-secondary text-white font-semibold py-2.5 px-4 rounded-md hover:bg-secondary/90 transition-colors disabled:bg-secondary/50 disabled:cursor-not-allowed"
            >
                Save Avatar
            </button>
        </div>
      </div>
    </div>
  );
};
