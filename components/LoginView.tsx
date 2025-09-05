import React, { useState } from 'react';
import type { Profile } from '../types';
import { UserCircleIcon, PlusCircleIcon, PencilIcon, TrashIcon, XMarkIcon, RugbyBallIcon } from './Icons';

interface LoginViewProps {
  profiles: Record<string, Profile>;
  onSelectProfile: (id: string) => void;
  onAddProfile: (name: string) => Promise<void>;
  onDeleteProfile: (id: string) => void;
}

const ProfileCard: React.FC<{ profile: Profile; onSelect: () => void }> = ({ profile, onSelect }) => {
  return (
    <button onClick={onSelect} className="flex flex-col items-center justify-center p-6 bg-surface rounded-xl shadow-card text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="w-24 h-24 mb-4">
        {profile.user.avatarUrl ? (
          <img src={profile.user.avatarUrl} alt="User avatar" className="w-full h-full rounded-full object-cover border-4 border-surface-alt" />
        ) : (
          <div className="w-full h-full bg-surface-alt rounded-full flex items-center justify-center border-4 border-border/50">
            <UserCircleIcon className="w-16 h-16 text-text-subtle" />
          </div>
        )}
      </div>
      <h3 className="text-xl font-bold text-text-strong">{profile.user.name}</h3>
      <p className="text-sm text-text-subtle">{profile.attendedMatches.length} matches attended</p>
    </button>
  );
};

const AddProfileCard: React.FC<{ onAdd: () => void }> = ({ onAdd }) => (
  <button onClick={onAdd} className="flex flex-col items-center justify-center p-6 bg-surface-alt border-2 border-dashed border-border rounded-xl text-center text-text-subtle hover:border-primary hover:text-primary transition-colors duration-300 aspect-square">
    <PlusCircleIcon className="w-16 h-16 mb-4" />
    <h3 className="text-xl font-bold">Add Profile</h3>
  </button>
);

const AddProfileModal: React.FC<{ onClose: () => void, onSave: (name: string) => void }> = ({ onClose, onSave }) => {
    const [name, setName] = useState('');

    const handleSave = () => {
        if (name.trim()) {
            onSave(name.trim());
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="add-profile-title">
            <div className="bg-surface rounded-xl shadow-lg w-full max-w-sm" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-border flex justify-between items-center">
                    <h2 id="add-profile-title" className="text-lg font-bold text-text-strong">Create New Profile</h2>
                     <button onClick={onClose} className="p-1 rounded-full text-text-subtle hover:bg-surface-alt" aria-label="Close">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    <label htmlFor="profileName" className="font-semibold text-text-strong">Profile Name</label>
                    <input
                        id="profileName"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="e.g., John Smith"
                        className="w-full bg-surface-alt text-text placeholder-text-subtle border border-border rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
                        autoFocus
                    />
                </div>
                <div className="p-4 bg-surface-alt border-t border-border">
                    <button onClick={handleSave} disabled={!name.trim()} className="w-full bg-primary text-white font-semibold py-2.5 px-4 rounded-md hover:bg-primary/90 transition-colors disabled:bg-primary/50">
                        Create and Log In
                    </button>
                </div>
            </div>
        </div>
    );
};

export const LoginView: React.FC<LoginViewProps> = ({ profiles, onSelectProfile, onAddProfile, onDeleteProfile }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const profileIds = Object.keys(profiles);
    
    const handleAdd = async (name: string) => {
        try {
            await onAddProfile(name);
            setIsAddModalOpen(false);
        } catch (error) {
            // Error is handled in the App component, so we just log it here
            // and keep the modal open for the user to try again if they wish.
            console.error("Failed to add profile:", error);
        }
    }
    
    return (
        <div className="container mx-auto p-4 md:p-6 min-h-screen flex flex-col items-center justify-center">
            <div className="text-center mb-8">
                <RugbyBallIcon className="w-16 h-16 mx-auto mb-4 text-primary" />
                <h1 className="text-4xl font-extrabold text-text-strong">Welcome to The Scrum Book</h1>
                <p className="text-lg text-text-subtle mt-2">Select a profile to continue</p>
            </div>

            {profileIds.length === 0 ? (
                 <div className="w-full max-w-xs">
                    <AddProfileCard onAdd={() => setIsAddModalOpen(true)} />
                 </div>
            ) : (
                <div className="w-full max-w-4xl">
                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {profileIds.map(id => (
                            <div key={id} className="relative group">
                                <ProfileCard profile={profiles[id]} onSelect={() => onSelectProfile(id)} />
                                {isEditMode && (
                                     <button
                                        onClick={() => window.confirm('Are you sure you want to delete this profile? This action cannot be undone.') && onDeleteProfile(id)}
                                        className="absolute -top-2 -right-2 bg-danger text-white rounded-full p-2 border-2 border-surface hover:scale-110 transition-transform"
                                        aria-label="Delete profile"
                                    >
                                        <TrashIcon className="w-4 h-4"/>
                                    </button>
                                )}
                            </div>
                        ))}
                        <AddProfileCard onAdd={() => setIsAddModalOpen(true)} />
                    </div>
                </div>
            )}
            
            {profileIds.length > 0 && (
                <div className="mt-8">
                    <button onClick={() => setIsEditMode(!isEditMode)} className="flex items-center gap-2 text-text-subtle hover:text-primary font-semibold py-2 px-4 rounded-md transition-colors">
                        <PencilIcon className="w-5 h-5"/>
                        {isEditMode ? 'Done' : 'Manage Profiles'}
                    </button>
                </div>
            )}
            
            {isAddModalOpen && <AddProfileModal onClose={() => setIsAddModalOpen(false)} onSave={handleAdd} />}
        </div>
    );
};