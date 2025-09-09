import React, { useState } from 'react';
import { db } from '../firebase';
import { mockMatches, mockLeagueTable } from '../services/mockData';
import { LoadingSpinner } from './LoadingSpinner';
import { CheckCircleIcon, AlertTriangleIcon, ServerIcon } from './Icons';

export const DataUploader: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleUpload = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        if (!window.confirm('Are you sure you want to overwrite the Firestore data with local mock data? This action cannot be undone.')) {
            setLoading(false);
            return;
        }

        try {
            const batch = db.batch();

            // Upload matches
            mockMatches.forEach(match => {
                const docRef = db.collection('matches').doc(match.id);
                batch.set(docRef, match);
            });

            // Upload league table
            mockLeagueTable.forEach(standing => {
                const docRef = db.collection('leagueTable').doc(standing.teamId);
                batch.set(docRef, standing);
            });

            await batch.commit();
            setSuccess(`Successfully uploaded ${mockMatches.length} matches and ${mockLeagueTable.length} league table entries.`);

        } catch (err: any) {
            console.error("Failed to upload data to Firestore:", err);
            setError(`Upload failed: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="bg-surface p-6 md:p-8 rounded-md shadow-card max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-6 border-b border-border pb-4">
                 <ServerIcon className="w-10 h-10 text-primary" />
                <h1 id="data-uploader-title" className="text-3xl font-bold text-text-strong">Admin: Data Management</h1>
            </div>

            <p className="text-text-subtle mb-6">
                Use this tool to populate the Firestore database with the local mock data. This will overwrite any existing data in the 'matches' and 'leagueTable' collections.
            </p>

            <button
                onClick={handleUpload}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-danger text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-danger/90 transition-colors shadow-lg disabled:bg-danger/50 disabled:cursor-wait"
                aria-describedby="data-uploader-title"
            >
                {loading ? <LoadingSpinner /> : 'Upload Mock Data to Firestore'}
            </button>
            
            {success && (
                <div className="mt-6 p-4 rounded-md bg-success/10 border border-success/20 text-success flex items-center gap-3">
                    <CheckCircleIcon className="w-6 h-6" />
                    <p className="font-semibold">{success}</p>
                </div>
            )}

            {error && (
                <div className="mt-6 p-4 rounded-md bg-danger/10 border border-danger/20 text-danger flex items-center gap-3">
                    <AlertTriangleIcon className="w-6 h-6" />
                    <p className="font-semibold">{error}</p>
                </div>
            )}
        </div>
    );
};
